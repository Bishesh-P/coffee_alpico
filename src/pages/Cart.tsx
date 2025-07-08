import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';

const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="pt-20 md:pt-16">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Your Shopping Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <ShoppingBag size={32} className="text-navy-700" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any coffee to your cart yet. Explore our products to find your perfect brew.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-6">
                  Cart Items ({cart.length})
                </h2>
                
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <Link to="/products" className="text-blue-700 hover:text-navy-900">
                    Continue Shopping
                  </Link>
                  <Link to="/checkout">
                    <Button variant="primary">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;