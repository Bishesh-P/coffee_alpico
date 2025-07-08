import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  showCheckoutButton = true 
}) => {
  const { getCartTotal, getCartCount } = useCart();
  // Promo code state removed

  // Calculate subtotal
  const subtotal = getCartTotal();
  // New shipping logic (moved to parent for accuracy, but keep fallback here)
  const shipping = subtotal < 1400 && subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  // Promo code logic removed

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-navy-900 mb-4">Order Summary</h2>

      {/* Promo code input removed */}

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
          <span className="font-medium">NPR {subtotal.toFixed(2)}</span>
        </div>
        {/* Discount row removed */}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `NPR ${shipping.toFixed(2)}`}
          </span>
        </div>
        {/* Free shipping message should be handled in Checkout for city logic. */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-navy-900">NPR {total > 0 ? total.toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <Link to="/checkout">
          <Button 
            variant="primary" 
            fullWidth
            disabled={getCartCount() === 0}
          >
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CartSummary;