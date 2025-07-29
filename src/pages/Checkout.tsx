import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { supabase } from '../supabase-client';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Upload, Instagram, QrCode, ArrowLeft } from 'lucide-react';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import type { CheckoutStep, PaymentPlatformInfo, MachineType } from '../types';

const paymentPlatforms: readonly PaymentPlatformInfo[] = [
  {
    key: 'esewa',
    name: 'eSewa',
    qr: '/images/qr-esewa.png',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp',
    info: 'Scan with eSewa app',
  },
  {
    key: 'khalti',
    name: 'Khalti',
    qr: '/images/qr-khalti.png',
    logo: 'https://cdn.nayathegana.com/services.khalti.com/static/images/khalti-ime-logo.png',
    info: 'Scan with Khalti app',
  },
  {
    key: 'cashondelivery',
    name: 'Cash on Delivery',
    qr: '/images/cod-icon.png',
    logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
    info: 'Pay when you receive',
  },
] as const;

const machineOptions: readonly MachineType[] = [
  'French Press',
  'Mocha Pot',
  'Aeropress',
  'Espresso Machine',
  'Pour Over',
  'Drip Coffee Maker',
  'Other',
] as const;

const Checkout: React.FC = () => {
  const { cart, clearCart, getCartTotal, getCartCount, setMachineForItem, setVariantForItem } = useCart();
  const navigate = useNavigate();
  
  // Check if cart has items that need variant selection
  const hasItemsNeedingVariants = useMemo(() => {
    return cart.some(item => 
      !item.selectedVariant && 
      item.product.variants && 
      item.product.variants.length > 0
    );
  }, [cart]);
  
  // Set initial step based on whether variants are needed
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    hasItemsNeedingVariants ? 'variants' : 'shipping'
  );
  const [orderId, setOrderId] = useState<string>('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    occupation: ''
  });

  // Memoized calculations
  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  
  const { shipping, total, isValley } = useMemo(() => {
    const cityLower = formData.city.trim().toLowerCase();
    const valleyCheck = ["kathmandu", "bhaktapur", "lalitpur"].includes(cityLower);
    let shippingCost = 0;
    
    if (subtotal === 0) {
      shippingCost = 0;
    } else if (valleyCheck && subtotal > 1400) {
      shippingCost = 0;
    } else {
      shippingCost = 150;
    }
    
    return {
      shipping: shippingCost,
      total: subtotal + shippingCost,
      isValley: valleyCheck
    };
  }, [subtotal, formData.city]);

  // Auto-proceed when all variants are selected
  useEffect(() => {
    if (currentStep === 'variants' && !hasItemsNeedingVariants) {
      const timer = setTimeout(() => {
        setCurrentStep('shipping');
      }, 1000); // Reduced from 2 seconds to 1 second for faster flow
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, hasItemsNeedingVariants]);

  // Auto-select variants when only one available option exists
  useEffect(() => {
    if (currentStep === 'variants') {
      cart.forEach(item => {
        if (!item.selectedVariant && item.product.variants && item.product.variants.length > 0) {
          const availableVariants = item.product.variants.filter(v => v.inStock !== false);
          if (availableVariants.length === 1) {
            // Auto-select the only available variant
            setVariantForItem(item.product.id, availableVariants[0]);
          }
        }
      });
    }
  }, [currentStep, cart, setVariantForItem]);

  // Optimized handlers with useCallback
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleReceiptUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  }, []);

  const handleVariantSelectionComplete = useCallback(() => {
    setCurrentStep('shipping');
  }, []);

  const handleConfirmOrder = useCallback(() => {
    const newOrderId = `ALP${Date.now().toString().slice(-8)}`;
    setOrderId(newOrderId);
    setCurrentStep('platform');
  }, []);

  const handlePlatformSelect = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform) {
      if (selectedPlatform === 'cashondelivery') {
        // Generate orderId if not already set
        const currentOrderId = orderId || `ALP${Date.now().toString().slice(-8)}`;
        if (!orderId) {
          setOrderId(currentOrderId);
        }
        
        // Debug logging
        console.log('Cash on Delivery Debug:', {
          total,
          subtotal,
          shipping,
          currentOrderId
        });
        
        // Save order details to localStorage BEFORE clearing cart
        const orderDetails = {
          orderId: currentOrderId,
          total: total,
          subtotal: subtotal,
          shipping: shipping,
          paymentMethod: selectedPlatform,
          formData: formData,
          cart: cart.map(item => ({
            ...item,
            finalPrice: (item.selectedVariant?.price || item.product.price) * item.quantity
          }))
        };
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        
        console.log('Saved order details:', orderDetails);
        
        // For cash on delivery, skip payment steps and go directly to success
        clearCart();
        setCurrentStep('success');
      } else {
        setCurrentStep('payment');
      }
    }
  }, [selectedPlatform, clearCart, orderId, setOrderId, total, subtotal, shipping, formData, cart]);

  const handlePaymentConfirm = useCallback(() => {
    setCurrentStep('receipt');
  }, []);

  // PDF Generation Function
  const generateOrderPDF = useCallback(async () => {
    try {
      // Dynamic import of jsPDF to avoid build issues
      const { default: jsPDF } = await import('jspdf');
      
      // Get saved order details if available (for cash on delivery)
      const savedOrderDetails = localStorage.getItem('orderDetails');
      const orderDetails = savedOrderDetails ? JSON.parse(savedOrderDetails) : null;
      
      // Use saved details if available, otherwise use current state
      const displayCart = orderDetails?.cart || cart;
      const displaySubtotal = orderDetails?.subtotal || subtotal;
      const displayShipping = orderDetails?.shipping || shipping;
      const displayTotal = orderDetails?.total || total;
      const displayFormData = orderDetails?.formData || formData;
      
      // Debug logging for total calculation
      console.log('PDF Generation Debug:', {
        savedOrderDetails: !!savedOrderDetails,
        displaySubtotal,
        displayShipping,
        displayTotal,
        cartLength: displayCart?.length || 0
      });
      
      // Create new jsPDF instance
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = 30;
      
      // Helper function to add text with word wrap
      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * fontSize * 0.5);
      };
      
      // Header
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ALPICO COFFEE', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
      
      pdf.setFontSize(14);
      pdf.text('ORDER CONFIRMATION', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
      
      // Order Info
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Order Details:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Order ID: ${orderId}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Status: Order Confirmed`, margin, yPosition);
      yPosition += 15;
      
      // Customer Details
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Customer Information:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Name: ${displayFormData.firstName} ${displayFormData.lastName}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Email: ${displayFormData.email}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Phone: ${displayFormData.phone}`, margin, yPosition);
      yPosition += 6;
      yPosition = addWrappedText(`Address: ${displayFormData.address}`, margin, yPosition, pageWidth - 2 * margin);
      yPosition += 2;
      pdf.text(`City: ${displayFormData.city}, State: ${displayFormData.state}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Occupation: ${displayFormData.occupation}`, margin, yPosition);
      yPosition += 15;
      
      // Order Items
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Order Items:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      if (displayCart && displayCart.length > 0) {
        displayCart.forEach((item: any) => {
          // Calculate correct price for each item
          const itemPrice = item.selectedVariant?.price || item.product.price;
          const lineTotal = itemPrice * item.quantity;
          
          // Item name with variant
          const variant = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
          const machine = item.machine ? ` - Brewing: ${item.machine}` : '';
          const itemName = `${item.product.name}${variant}${machine}`;
          
          yPosition = addWrappedText(itemName, margin, yPosition, pageWidth - 100);
          pdf.text(`Qty: ${item.quantity} x NPR ${itemPrice.toFixed(2)} = NPR ${lineTotal.toFixed(2)}`, pageWidth - 80, yPosition - 6, { align: 'right' });
          yPosition += 8;
        });
      } else {
        pdf.text('No items in order.', margin, yPosition);
        yPosition += 10;
      }
      
      yPosition += 10;
      
      // Payment Information
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Payment Information:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const paymentMethodName = paymentPlatforms.find(p => p.key === selectedPlatform)?.name || 'Selected Payment Method';
      const paymentStatus = selectedPlatform === 'cashondelivery' ? 'Will be paid on delivery' : 'Completed online';
      
      pdf.text(`Payment Method: ${paymentMethodName}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Payment Status: ${paymentStatus}`, margin, yPosition);
      yPosition += 15;
      
      // Order Summary
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Order Summary:', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      // Create a box for the summary
      const summaryStartY = yPosition;
      const summaryHeight = 25;
      pdf.rect(margin, summaryStartY - 5, pageWidth - 2 * margin, summaryHeight);
      
      yPosition += 2;
      pdf.text(`Subtotal:`, margin + 5, yPosition);
      pdf.text(`NPR ${displaySubtotal.toFixed(2)}`, pageWidth - margin - 5, yPosition, { align: 'right' });
      yPosition += 6;
      
      pdf.text(`Shipping:`, margin + 5, yPosition);
      pdf.text(`${displayShipping === 0 ? 'Free' : `NPR ${displayShipping.toFixed(2)}`}`, pageWidth - margin - 5, yPosition, { align: 'right' });
      yPosition += 8;
      
      // Total with bold font
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`Total:`, margin + 5, yPosition);
      pdf.text(`NPR ${displayTotal.toFixed(2)}`, pageWidth - margin - 5, yPosition, { align: 'right' });
      
      // Footer
      yPosition += 20;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text('Thank you for your order!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;
      pdf.text('For queries, contact us on Instagram: @alpico.coffee', pageWidth / 2, yPosition, { align: 'center' });
      
      // Save the PDF
      pdf.save(`Alpico_Order_${orderId || 'details'}.pdf`);
      
      return true;
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
      return false;
    }
  }, [cart, subtotal, shipping, total, formData, orderId, selectedPlatform, paymentPlatforms]);

  // Save receipt URL to database
  const saveReceiptToDatabase = useCallback(async (orderId: string, receiptUrl: string) => {
    const { error } = await supabase
      .from('details_user')
      .update({ receipt_url: receiptUrl })
      .eq('order_id', orderId);
    if (error) {
      console.error('Error saving receipt URL:', error);
      throw error;
    }
  }, []);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare user/order data for Supabase (without receipt_url)
    const userDetails = {
      order_id: orderId || `ALP${Date.now().toString().slice(-8)}`,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      occupation: formData.occupation,
      total: total,
      shipping: shipping,
      platform: selectedPlatform,
      
      items: cart.map(item => ({
        product_id: item.product.id,
        name: item.product.name,
        price: item.selectedVariant?.price || item.product.price,
        quantity: item.quantity,
        machine: item.machine || null
      })),
      created_at: new Date().toISOString()
      
    };
    try {
      const { error } = await supabase.from('details_user').insert([userDetails]);
      if (error) {
        console.error('Supabase insert error:', error);
        alert('Failed to save user details.\n' + (error.message || 'Please try again.'));
        return;
      }
      setCurrentStep('confirmation');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  // Upload receipt to Supabase Storage bucket 'transaction' and save URL
  const handleFinalSubmit = async () => {
    if (!receiptFile) {
      alert('Please upload a receipt first');
      return;
    }
    try {
      // Generate unique filename using order ID
      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `receipts/${orderId}_${Date.now()}.${fileExt}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('transaction')
        .upload(fileName, receiptFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('transaction')
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        throw new Error('Could not get public URL for receipt');
      }

      // Save receipt URL to database
      await saveReceiptToDatabase(orderId, urlData.publicUrl);

      // Move to next step (success) without showing alert
      clearCart();
      setCurrentStep('success');
    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert('Error uploading receipt. Please try again.');
    }
  };

  if (cart.length === 0 && currentStep === 'shipping') {
    return (
      <div className="pt-20 md:pt-16">
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            You need to add some items to your cart before checking out.
          </p>
          <Link to="/products">
            <Button variant="primary">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-16">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {!(currentStep === 'shipping' && !hasItemsNeedingVariants) && !(currentStep === 'variants') && (
                <button 
                  onClick={() => {
                    const stepMap: Record<CheckoutStep, CheckoutStep> = {
                      shipping: hasItemsNeedingVariants ? 'variants' : 'shipping',
                      variants: 'variants',
                      confirmation: 'shipping',
                      platform: 'confirmation',
                      payment: 'platform',
                      receipt: 'payment',
                      success: 'success'
                    };
                    setCurrentStep(stepMap[currentStep]);
                  }}
                  className="mr-4 text-blue-200 hover:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h1 className="text-2xl md:text-3xl font-serif font-bold">
                {currentStep === 'shipping' && 'Shipping Information'}
                {currentStep === 'variants' && 'Select Product Options'}
                {currentStep === 'confirmation' && 'Confirm Your Order'}
                {currentStep === 'payment' && 'Payment'}
                {currentStep === 'receipt' && 'Upload Receipt'}
                {currentStep === 'platform' && 'Choose Payment Method'}
                {currentStep === 'success' && 'Order Complete'}
              </h1>
            </div>
            
            {/* Quick Cart Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3">
              <div className="text-sm text-blue-100">
                <span className="font-medium">{getCartCount()}</span> items
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="text-lg font-bold text-white">
                NPR {total.toFixed(2)}
              </div>
              {isValley && shipping === 0 && subtotal > 1400 && (
                <div className="text-xs text-green-300 font-medium">✓ Free Ship</div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            {/* Step 1: Variants (if needed) or Shipping */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['variants', 'shipping', 'confirmation', 'platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>1</div>
            
            {/* Show shipping as step 2 if variants step exists */}
            {hasItemsNeedingVariants && (
              <>
                <div className={`h-1 w-16 ${
                  ['shipping', 'confirmation', 'platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                    ? 'bg-blue-600' : 'bg-gray-600'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  ['shipping', 'confirmation', 'platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                    ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}>2</div>
              </>
            )}
            
            <div className={`h-1 w-16 ${
              ['confirmation', 'platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['confirmation', 'platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>{hasItemsNeedingVariants ? '3' : '2'}</div>
            <div className={`h-1 w-16 ${
              ['platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['platform', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>{hasItemsNeedingVariants ? '4' : '3'}</div>
            <div className={`h-1 w-16 ${
              ['payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>{hasItemsNeedingVariants ? '5' : '4'}</div>
            <div className={`h-1 w-16 ${
              ['receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>{hasItemsNeedingVariants ? '6' : '5'}</div>
            <div className={`h-1 w-16 ${
              currentStep === 'success' ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>✓</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Step 1: Shipping Information */}
        {currentStep === 'shipping' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Brewing Method Summary - Always Visible */}
                {cart.filter(item => 
                  ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && 
                  !item.product.name.toLowerCase().includes('drip coffee bags') &&
                  item.machine
                ).length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-900 mb-3">☕ Selected Brewing Methods</h3>
                    <div className="space-y-2">
                      {cart.filter(item => 
                        ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && 
                        !item.product.name.toLowerCase().includes('drip coffee bags') &&
                        item.machine
                      ).map(item => (
                        <div key={item.product.id} className="flex items-center justify-between">
                          <span className="text-sm text-blue-800">{item.product.name}</span>
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            ✓ {item.machine}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brewing machine selection for coffee products - Enhanced UX (excluding drip bags) */}
                  {cart.filter(item => 
                    ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && 
                    !item.product.name.toLowerCase().includes('drip coffee bags')
                  ).map(item => (
                    <div key={item.product.id} className={`md:col-span-2 p-4 rounded-lg border transition-all duration-200 ${
                      item.machine 
                        ? 'bg-gray-50 border-gray-300' 
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <label className="block text-sm font-semibold mb-3">
                        <span className="flex items-center gap-2">
                          {item.machine ? (
                            <>
                              <span className="text-green-600">✅</span>
                              <span className="text-gray-800">
                                Brewing Method Selected for <span className="font-bold">{item.product.name}</span>
                              </span>
                              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                {item.machine}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-600">🔧</span>
                              <span className="text-gray-800">
                                Choose Brewing Method for <span className="text-gray-900 font-bold">{item.product.name}</span>
                              </span>
                            </>
                          )}
                        </span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {machineOptions.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setMachineForItem(item.product.id, opt as MachineType, item.selectedVariant?.id)}
                            className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                              item.machine === opt
                                ? 'border-blue-600 bg-blue-600 text-white shadow-lg ring-2 ring-blue-200 ring-opacity-50 scale-105'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                            }`}
                          >
                            {item.machine === opt && (
                              <span className="inline-block mr-1">✓</span>
                            )}
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City* <span className="text-xs text-gray-500">(Free shipping in valley cities for orders above NPR 1400)</span>
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select City</option>
                        <optgroup label="📍 Kathmandu Valley (Free Shipping on NPR 1400+)">
                          <option value="Kathmandu">Kathmandu</option>
                          <option value="Lalitpur">Lalitpur</option>
                          <option value="Bhaktapur">Bhaktapur</option>
                        </optgroup>
                        <optgroup label="🏔️ Other Cities">
                          <option value="Pokhara">Pokhara</option>
                          <option value="Chitwan">Chitwan</option>
                          <option value="Butwal">Butwal</option>
                          <option value="Biratnagar">Biratnagar</option>
                          <option value="Birgunj">Birgunj</option>
                          <option value="Dharan">Dharan</option>
                          <option value="Hetauda">Hetauda</option>
                          <option value="Other">Other (Please specify in address)</option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                          Occupation*
                        </label>
                        <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Link to="/cart" className="text-blue-700 hover:text-navy-900">
                      Return to Cart
                    </Link>
                    <Button type="submit" variant="primary" size="lg">
                      Continue to Confirmation
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            <div>
              <CartSummary 
                showCheckoutButton={false} 
                overrideShipping={shipping}
                overrideTotal={total}
              />
            </div>
          </div>
        )}

        {/* Step 2: Variant Selection */}
        {currentStep === 'variants' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Select Product Options</h2>
              <p className="text-gray-600 mb-8">
                Please select the size/variant for products that have multiple options.
              </p>
              
              <div className="space-y-8">
                {cart
                  .filter(item => !item.selectedVariant && item.product.variants && item.product.variants.length > 0)
                  .length === 0 ? (
                    <div className="text-center py-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="text-green-800 font-medium mb-2">
                          ✓ All product options have been selected
                        </div>
                        <div className="text-green-600 text-sm">
                          Automatically proceeding to shipping details in 1 second...
                        </div>
                      </div>
                    </div>
                  ) : (
                    cart
                      .filter(item => !item.selectedVariant && item.product.variants && item.product.variants.length > 0)
                      .map(item => (
                        <div key={item.product.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start mb-4">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-bold text-navy-900">{item.product.name}</h3>
                              <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.product.variants?.map(variant => (
                              <button
                                key={variant.id}
                                onClick={() => setVariantForItem(item.product.id, variant)}
                                className={`p-5 border-2 rounded-xl transition-all duration-200 text-left hover:shadow-lg ${
                                  variant.inStock === false 
                                    ? 'opacity-40 cursor-not-allowed border-gray-200 bg-gray-50' 
                                    : 'cursor-pointer border-gray-200 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
                                }`}
                                disabled={variant.inStock === false}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-bold text-lg text-navy-900">{variant.name}</div>
                                  <div className="text-blue-800 font-bold text-lg">NPR {variant.price.toFixed(2)}</div>
                                </div>
                                <div className="text-sm text-gray-600 mb-1">{variant.details.volume}</div>
                                {variant.inStock === false && (
                                  <div className="text-red-500 text-sm font-medium">Sold Out</div>
                                )}
                                {variant.inStock !== false && (
                                  <div className="text-green-600 text-xs font-medium mt-2">✓ Available</div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                  )
                }
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleVariantSelectionComplete}
                  variant="primary"
                  size="lg"
                  disabled={cart.some(item => 
                    !item.selectedVariant && 
                    item.product.variants && 
                    item.product.variants.length > 0
                  )}
                >
                  Continue to Order Review
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {currentStep === 'confirmation' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Confirm Your Order Details</h2>
              
              {/* Shipping Details */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Shipping Address</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} - {formData.occupation}</p>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                          {item.selectedVariant && (
                            <p className="text-sm text-blue-700 mt-1">{item.selectedVariant.name}</p>
                          )}
                          {['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && item.machine && (
                            <p className="text-xs text-blue-700 mt-1">Machine: {item.machine}</p>
                          )}
                        </div>
                      </div>
                      <p className="font-medium">NPR {((item.selectedVariant?.price || item.product.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-blue-50 p-4 rounded-lg mb-8">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>NPR {subtotal.toFixed(2)}</span>
                </div>
                {/* Discount row removed, handled in CartSummary */}
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : `NPR ${shipping.toFixed(2)}`}</span>
                </div>
                {/* Only show free shipping message for valley cities and subtotal below 1400 */}
                {isValley && shipping > 0 && subtotal > 0 && subtotal < 1400 && (
                  <div className="text-sm text-blue-700 italic mb-2">
                    Add NPR {(1400 - subtotal).toFixed(2)} more for free shipping(inside valley)
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>NPR {total > 0 ? total.toFixed(2) : '0.00'}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleConfirmOrder} variant="primary" size="lg">
                  Confirm Order & Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Platform Selection */}
        {currentStep === 'platform' && (
          <div className="max-w-2xl mx-auto">
            {/* Brewing Method Summary in Platform Step */}
            {cart.filter(item => 
              ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && 
              !item.product.name.toLowerCase().includes('drip coffee bags') &&
              item.machine
            ).length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">☕ Your Brewing Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cart.filter(item => 
                    ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && 
                    !item.product.name.toLowerCase().includes('drip coffee bags') &&
                    item.machine
                  ).map(item => (
                    <div key={item.product.id} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-gray-700">{item.product.name}</span>
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        ✓ {item.machine}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Select Payment Platform</h2>
              <form onSubmit={handlePlatformSelect}>
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                  {paymentPlatforms.map((platform) => (
                    <label key={platform.key} className={`cursor-pointer border rounded-lg p-4 flex-1 flex flex-col items-center transition-all duration-200 hover:shadow-lg ${selectedPlatform === platform.key ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-300 bg-white'}`}>
                      <input
                        type="radio"
                        name="paymentPlatform"
                        value={platform.key}
                        checked={selectedPlatform === platform.key}
                        onChange={() => setSelectedPlatform(platform.key)}
                        className="mb-3"
                      />
                      <div className="w-24 h-24 flex items-center justify-center mb-3 bg-gray-50 rounded-lg p-2">
                        <img 
                          src={platform.logo || platform.qr} 
                          alt={platform.name + ' Logo'} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                      <span className="font-bold text-lg text-gray-800">{platform.name}</span>
                      <span className="text-sm text-gray-500 mt-1">{platform.info}</span>
                    </label>
                  ))}
                </div>
                <Button type="submit" variant="primary" size="lg" disabled={!selectedPlatform}>
                  Continue to Payment
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: QR Code Payment */}
        {currentStep === 'payment' && (
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 text-center">
              <div className="mb-6">
                <QrCode size={48} className="mx-auto text-navy-900 mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">
                  {selectedPlatform === 'cashondelivery' ? 'Cash on Delivery' : 'Scan QR Code to Pay'}
                </h2>
                <p className="text-gray-600">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
                <p className="text-xl sm:text-2xl font-bold text-blue-800 mt-4">NPR {total.toFixed(2)}</p>
              </div>

              {/* Platform-specific QR Code or COD Details */}
              <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg mb-6 mx-auto max-w-sm">
                {selectedPlatform === 'cashondelivery' ? (
                  <div className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="font-bold text-lg text-navy-900 mb-4">Cash on Delivery</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Pay NPR {total.toFixed(2)} when your order arrives</div>
                      <div className="text-blue-700 text-xs mt-3">
                        <strong>Note:</strong> Please keep exact change ready for delivery
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    {selectedPlatform ? (
                      <img
                        src={paymentPlatforms.find(p => p.key === selectedPlatform)?.qr}
                        alt={selectedPlatform + ' QR'}
                        className="w-[90%] h-[90%] object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <QrCode size={120} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-500">Select a payment platform</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-xs sm:text-sm text-gray-600 mb-6 space-y-1">
                {selectedPlatform === 'cashondelivery' ? (
                  <>
                    <p>• You will pay NPR {total.toFixed(2)} when your order is delivered</p>
                    <p>• Please keep exact change ready</p>
                    <p>• Your order will be confirmed and prepared for delivery</p>
                  </>
                ) : (
                  <>
                    <p>• Scan the QR code with your {selectedPlatform ? paymentPlatforms.find(p => p.key === selectedPlatform)?.name : 'selected'} app</p>
                    <p>• Complete the payment of NPR {total.toFixed(2)}</p>
                    <p>• Take a screenshot of the payment confirmation</p>
                  </>
                )}
              </div>

              <Button onClick={handlePaymentConfirm} variant="primary" size="lg">
                I have completed the payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Receipt Upload */}
        {currentStep === 'receipt' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">Upload Payment Receipt</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Please upload a screenshot or photo of your payment confirmation to complete your order.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <span className="text-blue-700 hover:text-navy-900 font-medium">
                      Click to upload receipt
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </label>
                  <input
                    id="receipt-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleReceiptUpload}
                    className="hidden"
                  />
                </div>

                {receiptFile && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-600 mr-2" size={20} />
                      <span className="text-green-800">File uploaded: {receiptFile.name}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Order ID:</strong> {orderId}<br />
                  <strong>Amount:</strong> NPR {total.toFixed(2)}
                </p>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleFinalSubmit} 
                  variant="primary" 
                  size="lg"
                  disabled={!receiptFile}
                >
                  Submit Order
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {currentStep === 'success' && (() => {
          // Get saved order details for display (in case cart was cleared)
          const savedOrderDetails = localStorage.getItem('orderDetails');
          const orderDetails = savedOrderDetails ? JSON.parse(savedOrderDetails) : null;
          const displayTotal = orderDetails?.total || total;
          
          // Debug logging
          console.log('Success Page Debug:', {
            savedOrderDetails: !!savedOrderDetails,
            orderDetails,
            displayTotal,
            currentTotal: total,
            selectedPlatform
          });
          
          return (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
                <h2 className="text-3xl font-bold text-navy-900 mb-4">Order Confirmed!</h2>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <p className="text-lg font-medium text-green-800 mb-2">
                    Order ID: <span className="font-mono">{orderId}</span>
                  </p>
                  <p className="text-green-700">
                    {selectedPlatform === 'cashondelivery' 
                      ? 'Your order will be delivered soon. Please keep NPR ' + displayTotal.toFixed(2) + ' ready for cash payment on delivery.'
                      : 'Your order will be delivered soon. We\'ll send you tracking details via email.'
                    }
                  </p>
                  {selectedPlatform === 'cashondelivery' && (
                    <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>💰 Cash on Delivery:</strong> Please have exact change ready - NPR {displayTotal.toFixed(2)}
                      </p>
                    </div>
                  )}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800 mb-2">
                  <strong>For any queries, contact us on Instagram:</strong>
                </p>
                <a 
                  href="https://instagram.com/alpicocoffee/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-700 hover:text-navy-900 font-medium"
                >
                  <Instagram size={20} className="mr-2" />
                  @alpico.coffee
                </a>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-yellow-900 text-left mb-2" role="alert">
                  <strong>Important:</strong> Please <b>download your order summary PDF</b> and show it to our delivery staff when your order arrives.
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    navigate('/products');
                  }}
                >
                  Continue Shopping
                </Button>
                <button
                  onClick={generateOrderPDF}
                  className="w-full py-3 text-white bg-red-600 hover:bg-red-700 border border-red-600 rounded-lg font-medium transition-colors duration-200"
                >
                  📄 Download Order Summary (PDF)
                </button>
              </div>
            </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Checkout;