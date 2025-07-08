import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const CheckoutSuccess: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Order Confirmation - Alpico Coffee';
    
    return () => {
      // Reset title when unmounting
      document.title = 'Alpico Coffee';
    };
  }, []);

  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-navy-900 mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-gray-700 mb-6">
            Your order #{orderNumber} has been placed successfully. We'll send you a confirmation email shortly with your order details.
          </p>
          
          <div className="bg-blue-50 p-4 rounded mb-6 text-left">
            <h3 className="font-bold text-blue-800 mb-2">Order Summary:</h3>
            <p className="text-gray-700 text-sm">
              Your freshly roasted coffee will be shipped within 1-2 business days. You'll receive tracking information via email once your order ships.
            </p>
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