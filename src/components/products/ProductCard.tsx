import { memo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  delay?: number;
  currentCategory?: string;
}

const ProductCard = memo<ProductCardProps>(({ product, delay = 0, currentCategory }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Image slider functionality
  const images = product.images || [product.image];
  const displayImages = images.slice(0, 3);
  const hasMultipleImages = displayImages.length > 1;
  const isCoffeeCategory = product.category.includes('roast');
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  }, [displayImages.length]);
  
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [displayImages.length, product.id]);
  
  // Find the first available variant, or fallback to first variant if none are available
  const getDefaultVariant = useCallback(() => {
    if (!product.variants || product.variants.length === 0) return undefined;
    const availableVariant = product.variants.find(variant => variant.inStock !== false);
    return availableVariant || product.variants[0];
  }, [product.variants]);
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(getDefaultVariant());

  // For combo offers we want selection deferred to checkout, so clear any preselected variant
  useEffect(() => {
    if (product.category === 'combo-offers') {
      setSelectedVariant(undefined);
    }
  }, [product]);

  // Update selected variant when product changes to ensure we default to an available variant
  useEffect(() => {
    const defaultVariant = getDefaultVariant();
    setSelectedVariant(defaultVariant);
  }, [getDefaultVariant]);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentImage = selectedVariant && !isCoffeeCategory
    ? selectedVariant.image
    : displayImages[currentImageIndex] ?? images[0];
  const isOutOfStock = product.inStock === false || (selectedVariant && selectedVariant.inStock === false);

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    const variantToAdd = product.category === 'combo-offers' ? undefined : selectedVariant;
    addToCart(product, 1, undefined, variantToAdd);
    setTimeout(() => setIsAdding(false), 300);
  }, [addToCart, product, selectedVariant]);

  const handleVariantChange = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant);
  }, []);

  return (
    <div
      className="opacity-0 animate-fade-up bg-white rounded-2xl shadow-premium overflow-hidden transform transition-all duration-500 hover:shadow-premium-lg hover:scale-[1.02] group h-full flex flex-col premium-hover"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
      }}
    >
      <Link to={`/products/${product.id}${currentCategory ? `?category=${currentCategory}` : ''}`}>
        <div className="h-64 overflow-hidden relative group/img">
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale-[30%] group-hover:filter-none"
          />
          
          {/* Image slider controls - only show for coffee products with multiple images */}
          {hasMultipleImages && isCoffeeCategory && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-10"
              >
                <ChevronRight size={16} />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Product Label */}
          {product.label && (
            <div className={`absolute top-3 right-3 ${product.label.bgColor} ${product.label.color} px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-3 transition-transform duration-300 hover:rotate-0 border-2 ${product.label.borderColor || ''}`}>
              {product.label.text}
            </div>
          )}
          
          {/* Premium badge - moved to left to avoid conflicts */}
          {product.category === 'coffee' && !product.label && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-premium-gold-500 to-premium-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-premium">
              Premium Quality
            </div>
          )}
          {/* Removed combo-offers size selection badge per request */}
          <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-10 group-hover:opacity-0"></div>
        </div>
      </Link>
      <div className="p-6 pb-4 flex flex-col flex-grow">
        <div className="mb-3 sm:mb-4">
          <Link to={`/products/${product.id}${currentCategory ? `?category=${currentCategory}` : ''}`}>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 sm:mt-2">
            {/* Show discounted price logic */}
            {selectedVariant ? (
              // Variant pricing
              selectedVariant.originalPrice ? (
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <span className="text-gray-500 line-through text-xs sm:text-sm">NPR {selectedVariant.originalPrice.toFixed(2)}</span>
                  <span className="text-blue-800 font-bold text-sm sm:text-base">NPR {selectedVariant.price.toFixed(2)}</span>
                  <span className="bg-red-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-medium">
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
                  <span className="bg-red-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-blue-800 font-medium text-sm sm:text-base">NPR {currentPrice.toFixed(2)}</p>
              )
            )}
          </div>
        </div>
        
  {/* Variant Selection - Hidden for combo offers; selection moved to checkout */}
  {product.variants && product.variants.length > 0 && product.category !== 'combo-offers' ? (
          <div className="mb-4" style={{ minHeight: '80px' }}>
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
              {product.category === 'merch' ? 'Color:' : 'Size:'}
            </p>
            {/* Different layout for combo offers vs other products */}
            {product.category === 'equipment' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-xl border-2 transition-all duration-300 font-medium min-h-[48px] flex flex-col items-center justify-center ${
                      selectedVariant?.id === variant.id
                        ? 'bg-navy-900 text-white border-navy-900 shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-navy-600 hover:bg-blue-50 hover:shadow-md'
                    } ${
                      variant.inStock === false 
                        ? 'opacity-50 cursor-not-allowed line-through' 
                        : 'cursor-pointer hover:scale-105'
                    }`}
                  >
                    <span className="text-center leading-tight">
                      {/* Split variant name into adjective and size */}
                      {(() => {
                        const parts = variant.name.split(' ');
                        if (parts.length >= 2) {
                          // For names like "Black 3-Cup" or "350ml Steel"
                          if (parts[0].includes('ml')) {
                            // For French Press: "350ml Steel" -> "Steel" on first line, "350ml" on second
                            return (
                              <>
                                <span className="block text-xs">{parts[1]}</span>
                                <span className="block text-xs font-semibold">{parts[0]}</span>
                              </>
                            );
                          } else {
                            // For Moka Pot: "Black 3-Cup" -> "Black" on first line, "3-Cup" on second
                            return (
                              <>
                                <span className="block text-xs">{parts[0]}</span>
                                <span className="block text-xs font-semibold">{parts.slice(1).join(' ')}</span>
                              </>
                            );
                          }
                        } else {
                          // Fallback for single word names
                          return <span className="text-xs">{variant.name}</span>;
                        }
                      })()}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-xl border-2 transition-all duration-300 font-medium min-h-[36px] flex items-center justify-center ${
                      selectedVariant?.id === variant.id
                        ? 'bg-navy-900 text-white border-navy-900 shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-navy-600 hover:bg-blue-50 hover:shadow-md'
                    } ${
                      variant.inStock === false 
                        ? 'opacity-50 cursor-not-allowed line-through' 
                        : 'cursor-pointer hover:scale-105'
                    }`}
                    disabled={variant.inStock === false}
                  >
                    <span className="text-center leading-tight">
                      {variant.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className={`text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow ${
          product.variants && product.variants.length > 0 ? 'line-clamp-2' : 'line-clamp-3'
        }`}>
          {product.description}
        </div>
        
        {/* Action buttons - Add to Cart only, View Details moved outside */}
        <div className="flex flex-col mt-auto">
          <Button
            onClick={handleAddToCart}
            variant={isOutOfStock ? "outline" : "primary"}
            size="sm"
            className={`
              group/btn relative overflow-hidden
              transform transition-all duration-300 
              flex items-center justify-center gap-2 
              text-xs sm:text-sm w-full
              ${isOutOfStock 
                ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-xl active:scale-95'
              }
              ${isAdding ? 'animate-pulse scale-105' : ''}
              font-semibold rounded-xl px-4 py-3 sm:py-3.5
              ${!isOutOfStock && 'bg-gradient-to-r from-navy-900 via-navy-800 to-blue-800 hover:from-navy-800 hover:via-blue-800 hover:to-blue-700 text-white shadow-lg'}
            `}
            disabled={isOutOfStock}
          >
            {/* Background animation effect */}
            {!isOutOfStock && (
              <div className="absolute inset-0 bg-gradient-to-r from-navy-800 to-blue-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            )}
            
            {/* Button content */}
            <div className="relative z-10 flex items-center gap-2">
              <ShoppingBag 
                size={16} 
                className={`transition-all duration-300 flex-shrink-0 ${
                  isOutOfStock 
                    ? 'text-gray-400' 
                    : isAdding 
                      ? 'animate-bounce text-white' 
                      : 'group-hover/btn:rotate-12 group-hover/btn:scale-110 text-white'
                }`} 
              />
              <span className="font-medium">
                {isOutOfStock 
                  ? 'Sold Out'
                  : isAdding 
                    ? 'Adding...'
                    : 'Add to Cart'
                }
              </span>
            </div>
            
            {/* Success ripple effect */}
            {isAdding && !isOutOfStock && (
              <div className="absolute inset-0 bg-green-400 opacity-20 animate-ping rounded-xl" />
            )}
          </Button>
        </div>
      </div>
      
      {/* View Details button - Outside the main card content */}
      <div className="px-6 pb-6 -mt-2">
        <Link
          to={`/products/${product.id}${currentCategory ? `?category=${currentCategory}` : ''}`}
          className="
            group/link relative w-full
            text-navy-700 hover:text-white
            flex items-center justify-center 
            transition-all duration-300 
            text-xs sm:text-sm px-3 py-2
            rounded-lg
            bg-blue-50 hover:bg-navy-900
            border border-blue-200 hover:border-navy-900
            shadow-sm hover:shadow-lg
            font-medium
            transform hover:scale-105 active:scale-95
          "
        >
          <span className="relative z-10 mr-1">
            View Details
          </span>
          <ArrowRight
            size={14}
            className="transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110 flex-shrink-0 relative z-10"
          />
          {/* Hover background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-800 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-lg" />
        </Link>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;