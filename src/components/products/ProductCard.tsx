import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

const ProductCard = memo<ProductCardProps>(({ product, delay = 0 }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants ? product.variants[0] : undefined
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentImage = selectedVariant ? selectedVariant.image : product.image;
  const isOutOfStock = product.inStock === false || (selectedVariant && selectedVariant.inStock === false);

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    addToCart(product, 1, undefined, selectedVariant);
    setTimeout(() => setIsAdding(false), 300);
  }, [addToCart, product, selectedVariant]);

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant);
  }, []);

  return (
    <div
      className="opacity-0 animate-fade-up bg-white rounded-2xl shadow-premium overflow-hidden transform transition-all duration-500 hover:shadow-premium-lg hover:scale-[1.03] group h-full flex flex-col premium-hover"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
      }}
    >
      <Link to={`/products/${product.id}`}>
        <div className="h-64 overflow-hidden relative">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale-[30%] group-hover:filter-none"
          />
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Premium badge */}
          {product.category === 'coffee' && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-premium-gold-500 to-premium-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-premium">
              Premium Quality
            </div>
          )}
          <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-10 group-hover:opacity-0"></div>
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-blue-800 font-medium mt-1">NPR {currentPrice.toFixed(2)}</p>
        </div>
        
        {/* Variant Selection - Conditional space allocation */}
        {product.variants && product.variants.length > 0 ? (
          <div className="mb-4" style={{ minHeight: '80px' }}>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {product.category === 'merch' ? 'Color:' : 'Size:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                    selectedVariant?.id === variant.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  } ${
                    variant.inStock === false ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  disabled={variant.inStock === false}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className={`text-gray-600 mb-4 text-sm flex-grow ${
          product.variants && product.variants.length > 0 ? 'line-clamp-2' : 'line-clamp-4'
        }`}>
          {product.description}
        </div>
        
        {/* Action buttons - Always at bottom */}
        <div className="flex justify-between items-center mt-auto">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            className={`transform transition-all duration-300 flex items-center gap-2 ${
              isAdding ? 'animate-wiggle' : ''
            }`}
            disabled={isOutOfStock}
          >
            <ShoppingBag size={16} className="transition-transform duration-300 group-hover:rotate-12" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Link
            to={`/products/${product.id}`}
            className="text-blue-700 hover:text-navy-900 flex items-center transition-all duration-300 hover:gap-3 group/link"
          >
            Details
            <ArrowRight
              size={16}
              className="ml-1 transition-transform duration-300 group-hover/link:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;