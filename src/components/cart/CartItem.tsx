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
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 sm:py-6 border-b border-gray-200 gap-4">
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
        <Link to={`/products/${product.id}`}>
          <img 
            src={currentImage} 
            alt={product.name} 
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      
      <div className="flex-grow min-w-0">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base sm:text-lg font-bold text-navy-900 hover:text-blue-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {selectedVariant && (
          <p className="text-xs sm:text-sm text-blue-600 font-medium mt-1">
            Size: {selectedVariant.name} ({selectedVariant.details.volume})
          </p>
        )}
        <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
          {(product.details as any).origin || (product.details as any).material || (product.details as any).fabric || 'Product'} • {(product.details as any).roastLevel || (product.details as any).capacity || (product.details as any).sizes || 'Details'}
        </p>
        <div>
          {/* Show discounted price logic */}
          {selectedVariant ? (
            // Variant pricing
            selectedVariant.originalPrice ? (
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-gray-500 line-through text-xs sm:text-sm">NPR {selectedVariant.originalPrice.toFixed(2)}</span>
                <span className="text-blue-800 font-bold text-sm sm:text-base">NPR {selectedVariant.price.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                  {Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}% OFF
                </span>
              </div>
            ) : (
              <p className="text-blue-800 font-medium text-sm sm:text-base">NPR {selectedVariant.price.toFixed(2)}</p>
            )
          ) : (
            // Product base pricing
            product.originalPrice ? (
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-gray-500 line-through text-xs sm:text-sm">NPR {product.originalPrice.toFixed(2)}</span>
                <span className="text-blue-800 font-bold text-sm sm:text-base">NPR {product.price.toFixed(2)}</span>
                <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            ) : (
              <p className="text-blue-800 font-medium text-sm sm:text-base">NPR {currentPrice.toFixed(2)}</p>
            )
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="flex items-center border border-gray-300 rounded">
          <button 
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-blue-700 touch-manipulation"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="px-3 sm:px-4 py-1 sm:py-2 text-gray-800 font-medium min-w-[2rem] text-center">
            {quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:text-blue-700 touch-manipulation"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors p-2 touch-manipulation"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;