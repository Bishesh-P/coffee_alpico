import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    total: 0,
    paymentMethod: '',
    isCOD: false
  });

  useEffect(() => {
    // Set page title
    document.title = 'Order Confirmation - Alpico Coffee';
    
    // Ensure page starts at top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Get order details from URL parameters or localStorage
    const orderId = searchParams.get('orderId') || '';
    const total = parseFloat(searchParams.get('total') || '0');
    const paymentMethod = searchParams.get('payment') || '';
    const isCOD = paymentMethod === 'cashondelivery';
    
    // Fallback to localStorage if URL params are not available
    const savedOrderDetails = localStorage.getItem('lastOrderDetails');
    if (savedOrderDetails) {
      try {
        const parsed = JSON.parse(savedOrderDetails);
        setOrderDetails({
          orderId: orderId || parsed.orderId || `ALP${Math.floor(100000 + Math.random() * 900000)}`,
          total: total || parsed.total || 0,
          paymentMethod: paymentMethod || parsed.paymentMethod || '',
          isCOD: (paymentMethod || parsed.paymentMethod) === 'cashondelivery'
        });
        
        // Clear localStorage after using it to prevent stale data
        if (!orderId && !total && !paymentMethod) {
          localStorage.removeItem('lastOrderDetails');
        }
      } catch (error) {
        console.error('Error parsing order details from localStorage:', error);
        setOrderDetails({
          orderId: orderId || `ALP${Math.floor(100000 + Math.random() * 900000)}`,
          total,
          paymentMethod,
          isCOD
        });
      }
    } else {
      setOrderDetails({
        orderId: orderId || `ALP${Math.floor(100000 + Math.random() * 900000)}`,
        total,
        paymentMethod,
        isCOD
      });
    }
    
    return () => {
      // Reset title when unmounting
      document.title = 'Alpico Coffee';
    };
  }, [searchParams]);
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-navy-900 mb-4">
            Order Confirmed!
          </h1>
          
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <p className="text-lg font-medium text-green-800 mb-2">
              Order ID: <span className="font-mono">{orderDetails.orderId}</span>
            </p>
            <p className="text-green-700">
              {orderDetails.isCOD 
                ? `Your order will be delivered soon. Please keep NPR ${orderDetails.total.toFixed(2)} ready for cash payment on delivery.`
                : 'Your order will be delivered soon. We\'ll send you tracking details via email.'
              }
            </p>
            {orderDetails.isCOD && orderDetails.total > 0 && (
              <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>💰 Cash on Delivery:</strong> Please have exact change ready - NPR {orderDetails.total.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded mb-6 text-left">
            <h3 className="font-bold text-blue-800 mb-2">Order Summary:</h3>
            <p className="text-gray-700 text-sm">
              Your freshly roasted coffee will be {orderDetails.isCOD ? 'delivered with cash payment option' : 'shipped'} within 1-2 business days. 
              {!orderDetails.isCOD && ' You\'ll receive tracking information via email once your order ships.'}
            </p>
            {orderDetails.total > 0 && (
              <p className="text-gray-700 text-sm mt-2">
                <strong>Total Amount:</strong> NPR {orderDetails.total.toFixed(2)}
                {orderDetails.isCOD && ' (Pay on Delivery)'}
              </p>
            )}
          </div>
          
          <Link to="/">
            <Button variant="primary">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;