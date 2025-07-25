import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity, selectedVariant } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentImage = selectedVariant ? selectedVariant.image : product.image;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity, selectedVariant?.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id, selectedVariant?.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-6">
        <Link to={`/products/${product.id}`}>
          <img 
            src={currentImage} 
            alt={product.name} 
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-navy-900 hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        {selectedVariant && (
          <p className="text-sm text-blue-600 font-medium">
            Size: {selectedVariant.name} ({selectedVariant.details.volume})
          </p>
        )}
        <p className="text-sm text-gray-600 mb-2">
          {product.details.origin} • {product.details.roastLevel}
        </p>
        <p className="text-blue-800 font-medium">
          NPR {currentPrice.toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded mr-4">
          <button 
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:text-blue-700"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 text-gray-800">
            {quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:text-blue-700"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;