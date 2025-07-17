import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
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

  const handleAddToCart = useCallback(() => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  }, [addToCart, product]);

  return (
    <div
      className="opacity-0 animate-fade-up bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
      }}
    >
      <Link to={`/products/${product.id}`}>
        <div className="h-64 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:filter-none"
          />
          <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-10 group-hover:opacity-0"></div>
        </div>
      </Link>
      <div className="p-6">
        <div className="mb-4">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-blue-800 font-medium mt-1">NPR {product.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            className={`transform transition-all duration-300 flex items-center gap-2 ${
              isAdding ? 'animate-wiggle' : ''
            }`}
            disabled={product.inStock === false}
          >
            <ShoppingBag size={16} className="transition-transform duration-300 group-hover:rotate-12" />
            {(product.inStock === false) ? 'Out of Stock' : 'Add to Cart'}
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