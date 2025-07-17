import React, { useState } from 'react';
import { supabase } from '../supabase-client';
import { Link, /*useNavigate*/ } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Upload, Instagram, QrCode, ArrowLeft } from 'lucide-react';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';

type CheckoutStep = 'shipping' | 'confirmation' | 'platform' | 'payment' | 'receipt' | 'success';


const paymentPlatforms = [
  {
    key: 'esewa',
    name: 'eSewa',
    qr: '/images/qr-esewa.png',
    info: 'Scan with eSewa app',
  },
  {
    key: 'khalti',
    name: 'Khalti',
    qr: '/images/qr-khalti.png',
    info: 'Scan with Khalti app',
  },
  {
    key: 'fonepay',
    name: 'Fonepay',
    qr: '/images/qr-fonepay.png',
    info: 'Scan with Fonepay app',
  },
];

const Checkout: React.FC = () => {
  const { cart, clearCart, getCartTotal, setMachineForItem } = useCart();
  // const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderId, setOrderId] = useState<string>('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');


  const machineOptions = [
    'French Press',
    'Mocha Pot',
    'Aeropress',
    'Espresso Machine',
    'Pour Over',
    'Drip Coffee Maker',
    'Other',
  ];
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
        price: item.product.price,
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


  const handleConfirmOrder = () => {
    // Generate order ID
    const newOrderId = `ALP${Date.now().toString().slice(-8)}`;
    setOrderId(newOrderId);
    setCurrentStep('platform');
  };

  const handlePlatformSelect = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentConfirm = () => {
    setCurrentStep('receipt');
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  // Save receipt URL to database
  const saveReceiptToDatabase = async (orderId: string, receiptUrl: string) => {
    const { error } = await supabase
      .from('details_user') // Change to your table name if needed
      .update({ receipt_url: receiptUrl })
      .eq('order_id', orderId);
    if (error) {
      console.error('Error saving receipt URL:', error);
      throw error;
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

  // PROMO CODE STATE REMOVED
  const subtotal = getCartTotal();
  // Updated shipping logic for Kathmandu Valley
  const isValley = ["kathmandu", "bhaktapur", "lalitpur"].includes(formData.city.trim().toLowerCase());
  let shipping = 0;
  if (subtotal === 0) {
    shipping = 0;
  } else if (isValley && subtotal > 1400) {
    shipping = 0;
  } else {
    shipping = 150;
  }
  const total = subtotal + shipping;

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
          <div className="flex items-center mb-4">
            {currentStep !== 'shipping' && (
              <button 
                onClick={() => {
                  if (currentStep === 'confirmation') setCurrentStep('shipping');
                  else if (currentStep === 'payment') setCurrentStep('confirmation');
                  else if (currentStep === 'receipt') setCurrentStep('payment');
                }}
                className="mr-4 text-blue-200 hover:text-white"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-2xl md:text-3xl font-serif font-bold">
              {currentStep === 'shipping' && 'Shipping Information'}
              {currentStep === 'confirmation' && 'Confirm Your Order'}
              {currentStep === 'payment' && 'Payment'}
              {currentStep === 'receipt' && 'Upload Receipt'}
              {currentStep === 'success' && 'Order Confirmed'}
            </h1>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['shipping', 'confirmation', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>1</div>
            <div className={`h-1 w-16 ${
              ['confirmation', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['confirmation', 'payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>2</div>
            <div className={`h-1 w-16 ${
              ['payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['payment', 'receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>3</div>
            <div className={`h-1 w-16 ${
              ['receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600' : 'bg-gray-600'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              ['receipt', 'success'].includes(currentStep) 
                ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>4</div>
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
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Brewing machine selection for coffee products */}
                  {cart.filter(item => ['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category)).map(item => (
                    <div key={item.product.id} className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select brewing machine for <span className="font-semibold">{item.product.name}</span>:
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        value={item.machine || ''}
                        required
                        onChange={e => setMachineForItem(item.product.id, e.target.value)}
                      >
                        <option value="" disabled>Select machine</option>
                        {machineOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
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
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
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
              <CartSummary showCheckoutButton={false} />
            </div>
          </div>
        )}

        {/* Step 2: Order Confirmation */}
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
                          {['light-roast', 'medium-roast', 'dark-roast'].includes(item.product.category) && item.machine && (
                            <p className="text-xs text-blue-700 mt-1">Machine: {item.machine}</p>
                          )}
                        </div>
                      </div>
                      <p className="font-medium">NPR {(item.product.price * item.quantity).toFixed(2)}</p>
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
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Select Payment Platform</h2>
              <form onSubmit={handlePlatformSelect}>
                <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                  {paymentPlatforms.map((platform) => (
                    <label key={platform.key} className={`cursor-pointer border rounded-lg p-4 flex-1 flex flex-col items-center transition-all duration-200 ${selectedPlatform === platform.key ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                      <input
                        type="radio"
                        name="paymentPlatform"
                        value={platform.key}
                        checked={selectedPlatform === platform.key}
                        onChange={() => setSelectedPlatform(platform.key)}
                        className="mb-2"
                      />
                      <img src={platform.qr} alt={platform.name + ' QR'} className="w-20 h-20 object-contain mb-2" />
                      <span className="font-bold text-lg">{platform.name}</span>
                      <span className="text-sm text-gray-500 mt-1">{platform.info}</span>
                    </label>
                  ))}
                </div>
                <Button type="submit" variant="primary" size="lg" disabled={!selectedPlatform}>
                  Continue to QR Payment
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: QR Code Payment */}
        {currentStep === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <QrCode size={48} className="mx-auto text-navy-900 mb-4" />
                <h2 className="text-2xl font-bold text-navy-900 mb-2">Scan QR Code to Pay</h2>
                <p className="text-gray-600">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
                <p className="text-2xl font-bold text-blue-800 mt-4">NPR {total.toFixed(2)}</p>
              </div>

              {/* Platform-specific QR Code */}
              <div className="bg-gray-100 p-8 rounded-lg mb-6 inline-block">
                <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  {selectedPlatform ? (
                    <img
                      src={paymentPlatforms.find(p => p.key === selectedPlatform)?.qr}
                      alt={selectedPlatform + ' QR'}
                      className="w-56 h-56 object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <QrCode size={120} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500">Select a payment platform</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-6">
                <p>• Scan the QR code with your {selectedPlatform ? paymentPlatforms.find(p => p.key === selectedPlatform)?.name : 'selected'} app</p>
                <p>• Complete the payment of NPR {total.toFixed(2)}</p>
                <p>• Take a screenshot of the payment confirmation</p>
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
        {currentStep === 'success' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Order Confirmed!</h2>
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <p className="text-lg font-medium text-green-800 mb-2">
                  Order ID: <span className="font-mono">{orderId}</span>
                </p>
                <p className="text-green-700">
                  Your order will be delivered soon. We'll send you tracking details via email.
                </p>
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
                    window.location.href = '/products';
                  }}
                >
                  Continue Shopping
                </Button>
                <button
                  onClick={async () => {
                    // Create a hidden printable div with all order details
                    const printable = document.createElement('div');
                    printable.style.width = '800px';
                    printable.style.margin = '0'; // Remove vertical centering
                    printable.style.background = '#fff';
                    printable.style.padding = '32px';
                    printable.style.fontFamily = 'sans-serif';
                    printable.style.boxSizing = 'border-box';
                    printable.innerHTML = `
                      <style>
                        html, body { margin: 0 !important; padding: 0 !important; }
                        @page { margin: 0; }
                        .alpico-pdf-container { width: 700px; margin: 0 auto; background: #fff; padding: 32px; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; box-sizing: border-box; }
                        .alpico-title { font-size: 2rem; font-weight: bold; color: #1e293b; margin-bottom: 1.2rem; }
                        .alpico-status { background: #e6fffa; padding: 1rem 2rem; border-radius: 8px; margin-bottom: 1.2rem; }
                        .alpico-status b { font-size: 1.1rem; }
                        .alpico-status span { font-family: monospace; }
                        .alpico-status .alpico-status-msg { color: #047857; margin-top: 0.3rem; display: block; }
                        .alpico-section-title { font-size: 1.1rem; font-weight: bold; margin: 1.5rem 0 0.5rem; }
                        .alpico-shipping { background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.2rem; font-size: 1rem; }
                        .alpico-shipping b { color: #0f172a; }
                        .alpico-items-table { width: 100%; border-collapse: collapse; margin-bottom: 1.2rem; }
                        .alpico-items-table th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #e5e7eb; font-size: 1rem; }
                        .alpico-items-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 1rem; }
                        .alpico-items-table td:last-child, .alpico-items-table th:last-child { text-align: right; }
                        .alpico-summary { background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.2rem; font-size: 1rem; }
                        .alpico-summary-row { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
                        .alpico-summary-row:last-child { font-weight: bold; font-size: 1.1rem; border-top: 1px solid #e5e7eb; padding-top: 0.5rem; margin-bottom: 0; }
                      </style>
                      <div class='alpico-pdf-container' style='margin-top:0;'>
                        <div class='alpico-title'>Order Confirmed!</div>
                        <div class='alpico-status'>
                          <b>Order ID:</b> <span>${orderId}</span>
                          <span class='alpico-status-msg'>Your order will be delivered soon. We'll send you tracking details via email.</span>
                        </div>
                        <div class='alpico-section-title'>Shipping Details</div>
                        <div class='alpico-shipping'>
                          <b>Name:</b> ${formData.firstName} ${formData.lastName}<br/>
                          <b>Address:</b> ${formData.address}<br/>
                          <b>City:</b> ${formData.city}<br/>
                          <b>State:</b> ${formData.state}<br/>
                          <b>Occupation:</b> ${formData.occupation}<br/>
                          <b>Email:</b> ${formData.email}<br/>
                          <b>Phone:</b> ${formData.phone}
                        </div>
                        <div class='alpico-section-title'>Order Items</div>
                        <table class='alpico-items-table'>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${cart && cart.length > 0 ? cart.map(item => `
                              <tr>
                                <td>${item.product.name}</td>
                                <td style='text-align:right;'>${item.quantity}</td>
                                <td style='text-align:right;'>NPR ${(item.product.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            `).join('') : `<tr><td colspan='3' style='text-align:center;color:#64748b;'>No items in order.</td></tr>`}
                          </tbody>
                        </table>
                        <div class='alpico-summary'>
                          <div class='alpico-summary-row'><span>Subtotal:</span><span>NPR ${subtotal.toFixed(2)}</span></div>
                          <div class='alpico-summary-row'><span>Shipping:</span><span>${shipping === 0 ? 'Free' : `NPR ${shipping.toFixed(2)}`}</span></div>
                          <div class='alpico-summary-row'><span>Total:</span><span>NPR ${total > 0 ? total.toFixed(2) : '0.00'}</span></div>
                        </div>
                      </div>
                      <h2 style='font-size:2rem;font-weight:bold;color:#1e293b;margin-bottom:1rem;'>Order Confirmed!</h2>
                      <div style='background:#e6fffa;padding:1rem 2rem;border-radius:8px;margin-bottom:1rem;'>
                        <div style='font-size:1.1rem;margin-bottom:0.5rem;'><b>Order ID:</b> <span style='font-family:monospace;'>${orderId}</span></div>
                        <div style='color:#047857;'>Your order will be delivered soon. We'll send you tracking details via email.</div>
                      </div>
                      <h3 style='font-size:1.2rem;font-weight:bold;margin:1.5rem 0 0.5rem;'>Shipping Details</h3>
                      <div style='background:#f0f9ff;padding:1rem;border-radius:8px;margin-bottom:1rem;'>
                        <div><b>Name:</b> ${formData.firstName} ${formData.lastName}</div>
                        <div><b>Address:</b> ${formData.address}</div>
                        <div><b>City:</b> ${formData.city}</div>
                        <div><b>State:</b> ${formData.state}</div>
                        <div><b>Occupation:</b> ${formData.occupation}</div>
                        <div><b>Email:</b> ${formData.email}</div>
                        <div><b>Phone:</b> ${formData.phone}</div>
                      </div>
                      <h3 style='font-size:1.2rem;font-weight:bold;margin:1.5rem 0 0.5rem;'>Order Items</h3>
                      <table style='width:100%;border-collapse:collapse;margin-bottom:1rem;'>
                        <thead>
                          <tr style='background:#f1f5f9;'>
                            <th style='text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;'>Product</th>
                            <th style='text-align:right;padding:8px;border-bottom:1px solid #e5e7eb;'>Qty</th>
                            <th style='text-align:right;padding:8px;border-bottom:1px solid #e5e7eb;'>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${cart.map(item => `
                            <tr>
                              <td style='padding:8px;border-bottom:1px solid #e5e7eb;'>${item.product.name}</td>
                              <td style='padding:8px;text-align:right;border-bottom:1px solid #e5e7eb;'>${item.quantity}</td>
                              <td style='padding:8px;text-align:right;border-bottom:1px solid #e5e7eb;'>NPR ${(item.product.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                      <div style='background:#f0f9ff;padding:1rem;border-radius:8px;margin-bottom:1rem;'>
                        <div style='display:flex;justify-content:space-between;'><span>Subtotal:</span><span>NPR ${subtotal.toFixed(2)}</span></div>
                        <div style='display:flex;justify-content:space-between;'><span>Shipping:</span><span>${shipping === 0 ? 'Free' : `NPR ${shipping.toFixed(2)}`}</span></div>
                        <div style='display:flex;justify-content:space-between;font-weight:bold;font-size:1.1rem;border-top:1px solid #e5e7eb;padding-top:0.5rem;'><span>Total:</span><span>NPR ${total > 0 ? total.toFixed(2) : '0.00'}</span></div>
                      </div>
                    `;
                    document.body.appendChild(printable);
                    const html2pdf = (window as any).html2pdf;
                    if (html2pdf) {
                      await html2pdf()
                        .set({
                          margin: 0.5,
                          filename: `Order_${orderId || 'details'}.pdf`,
                          image: { type: 'jpeg', quality: 0.98 },
                          html2canvas: { scale: 2 },
                          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                        })
                        .from(printable)
                        .save();
                      clearCart();
                    } else {
                      alert('PDF download is not available. Please contact support.');
                    }
                    document.body.removeChild(printable);
                  }}
                  className="w-full py-2 text-blue-700 hover:text-navy-900 border border-blue-700 rounded-lg"
                >
                  Download Order Details (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Dynamically load html2pdf.js if not present
if (typeof window !== 'undefined' && !(window as any).html2pdf) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  script.async = true;
  document.body.appendChild(script);
}

export default Checkout;