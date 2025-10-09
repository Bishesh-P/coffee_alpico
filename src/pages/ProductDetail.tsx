import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Coffee, PackageCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { generateProductSEO } from '../config/seo';
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import { discountedProducts as products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import { Product, ProductVariant } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const productId = parseInt(id || '0');
    const foundProduct = products.find(p => p.id === productId) || null;
    setProduct(foundProduct);
    
    // Set default variant if product has variants
    if (foundProduct?.variants && foundProduct.variants.length > 0) {
      setSelectedVariant(foundProduct.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
  }, [id]);

  // Get back URL with category parameter if it exists
  const getBackUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    return categoryParam ? `/products?category=${categoryParam}` : '/products';
  };

  // Function to get appropriate text based on product category
  const getProductBenefit = (category: string, type: 'quality' | 'source' | 'shipping') => {
    const isCoffee = category.includes('roast') || category.includes('coffee');
    
    switch (type) {
      case 'quality':
        if (category === 'equipment') return 'Quality assured';
        if (category === 'merch') return 'Premium quality';
        if (category === 'combo-offers') return 'Bundle savings';
        if (isCoffee) return 'Roasted to order';
        return 'Premium quality';
        
      case 'source':
        if (category === 'equipment') return 'Warranty included';
        if (category === 'merch') return 'Authentic design';
        if (category === 'combo-offers') return 'Complete package';
        if (isCoffee) return 'Sustainably sourced';
        return 'Quality materials';
        
      case 'shipping':
        return 'Fast shipping';
        
      default:
        return '';
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, undefined, selectedVariant);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  const isCoffeeCategory = product ? product.category.includes('roast') || product.category.includes('coffee') : false;
  const baseImages = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];
  const displayImages = baseImages.slice(0, 3);
  const sliderImages = product
    ? (isCoffeeCategory ? displayImages : selectedVariant ? [selectedVariant.image] : displayImages)
    : [];
  const sliderImagesLength = sliderImages.length;
  const hasMultipleImages = sliderImagesLength > 1;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product?.id, selectedVariant?.id, sliderImagesLength]);

  const currentImage = sliderImages[currentImageIndex] ?? sliderImages[0] ?? product?.image ?? '';
  const currentPrice = selectedVariant ? selectedVariant.price : product?.price ?? 0;
  const isOutOfStock = (product?.inStock === false) || (selectedVariant && selectedVariant.inStock === false);

  if (!product) {
    return (
      <div className="pt-20 md:pt-16">
        <div className="container mx-auto px-4 py-32 text-center">
          <SEOHead
            title="Product Not Found | Alpico Coffee"
            description="The product you're looking for could not be found."
            noIndex={true}
          />
          <p className="text-gray-600">Product not found.</p>
          <Link to="/products" className="text-blue-700 hover:text-navy-900 mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Generate SEO data
  const productSEO = generateProductSEO(product);
  const productSchema = generateProductSchema(product);
  
  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/products/${product.id}` }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [productSchema, breadcrumbSchema]
  };

  return (
    <div className="pt-20 md:pt-16">
      <SEOHead
        title={productSEO.title}
        description={productSEO.description}
        keywords={productSEO.keywords}
        url={`/products/${product.id}`}
        image={product.image}
        structuredData={combinedSchema}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Link 
          to={getBackUrl()} 
          className="inline-flex items-center text-blue-700 hover:text-navy-900 mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-auto rounded-lg transition-all duration-500 object-cover"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Show image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Product Name - First */}
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-3">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="mb-4">
              {/* Show discounted price logic */}
              {selectedVariant ? (
                // Variant pricing
                selectedVariant.originalPrice ? (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 line-through text-lg">NPR {selectedVariant.originalPrice.toFixed(2)}</span>
                    <span className="text-xl md:text-2xl text-blue-800 font-bold">NPR {selectedVariant.price.toFixed(2)}</span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="text-xl md:text-2xl text-blue-800 font-medium">NPR {selectedVariant.price.toFixed(2)}</p>
                )
              ) : (
                // Product base pricing
                product.originalPrice ? (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 line-through text-lg">NPR {product.originalPrice.toFixed(2)}</span>
                    <span className="text-xl md:text-2xl text-blue-800 font-bold">NPR {product.price.toFixed(2)}</span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="text-xl md:text-2xl text-blue-800 font-medium">NPR {currentPrice.toFixed(2)}</p>
                )
              )}
            </div>

            {/* Variant Selection - Second (Size Details) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-navy-900 mb-3 text-base">
                  {product.category === 'merch' ? 'Color Options:' : 'Size Options:'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      } ${
                        variant.inStock === false ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      disabled={variant.inStock === false}
                    >
                      <div className="font-medium text-navy-900 text-base">{variant.name}</div>
                      <div className="text-sm text-gray-600">{variant.details.volume}</div>
                      <div className="mt-2">
                        {variant.originalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through text-sm">NPR {variant.originalPrice.toFixed(2)}</span>
                            <span className="text-blue-800 font-bold text-base">NPR {variant.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <div className="text-blue-800 font-medium text-base">NPR {variant.price.toFixed(2)}</div>
                        )}
                      </div>
                      {variant.inStock === false && (
                        <div className="text-red-500 text-sm mt-1">Sold Out</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart and Quantity - Third (PROMINENT CTA) */}
            <div className="mb-4">
              <div className="flex items-center">
                <Button 
                  onClick={handleAddToCart}
                  variant="primary"
                  size="md"
                  className="flex items-center justify-center gap-2 py-2.5 px-6"
                  disabled={isOutOfStock}
                >
                  <ShoppingBag size={18} />
                  {isOutOfStock ? 'Sold Out' : (added ? 'Added to Cart!' : 'Add to Cart')}
                </Button>
                
                <div className="flex items-center gap-1 ml-2">
                  <label htmlFor="quantity" className="font-medium text-gray-700 text-sm">
                    Qty:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isOutOfStock}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Description - Fourth */}
            <div className="mb-3">
              <h3 className="font-semibold text-navy-900 mb-2">About This Product</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Product Specifications - Fifth (Vertical Layout) */}
            <div className="bg-blue-50 p-4 rounded-lg mb-3 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">
                {product.category === 'equipment' ? 'Specifications' : 
                 product.category === 'merch' ? 'Details' : 'Coffee Info'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="font-medium text-blue-800 w-28 flex-shrink-0">
                    {product.category === 'equipment' ? 'Material:' : 
                     (product.details as any).origin ? 'Origin:' :
                     (product.details as any).material ? 'Material:' :
                     (product.details as any).fabric ? 'Fabric:' : 'Material:'}
                  </span> 
                  <span className="text-gray-700">
                    {(product.details as any).origin || 
                     (product.details as any).material || 
                     (product.details as any).fabric || 'N/A'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-800 w-28 flex-shrink-0">
                    {product.category === 'equipment' ? 'Type:' : 
                     (product.details as any).roastLevel ? 'Roast Level:' :
                     (product.details as any).capacity ? 'Capacity:' :
                     (product.details as any).sizes ? 'Sizes:' : 'Type:'}
                  </span> 
                  <span className="text-gray-700">
                    {(product.details as any).roastLevel || 
                     (product.details as any).capacity || 
                     (product.details as any).sizes || 'N/A'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-800 w-28 flex-shrink-0">Weight:</span> 
                  <span className="text-gray-700">
                    {selectedVariant ? selectedVariant.details.weight : product.details.weight}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-800 w-28 flex-shrink-0">
                    {product.category === 'equipment' ? 'Features:' : 
                     (product.details as any).processing ? 'Processing:' :
                     (product.details as any).features ? 'Features:' : 'Features:'}
                  </span> 
                  <span className="text-gray-700">
                    {((product.details as any).processing 
                      ? (product.details as any).processing 
                      : Array.isArray((product.details as any).features) 
                        ? (product.details as any).features.join(', ') 
                        : (product.details as any).features || 'N/A')}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-800 w-28 flex-shrink-0">
                    {product.category.includes('roast') || product.category.includes('coffee') ? 'Altitude:' : 'Volume:'}
                  </span> 
                  <span className="text-gray-700">
                    {product.category.includes('roast') || product.category.includes('coffee')
                      ? (product.details as any).altitude || 'N/A'
                      : (selectedVariant ? selectedVariant.details.volume : (product as any).details?.volume) || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping & Quality Info - Sixth (Compact) */}
            <div className="border-t border-gray-200 pt-3">
              <h3 className="font-semibold text-navy-900 mb-3">Why Choose Alpico?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <Coffee className="text-blue-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-900">Premium Quality</h4>
                    <span className="text-sm text-gray-600">
                      {getProductBenefit(product.category, 'quality')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded mr-3">
                    <PackageCheck className="text-green-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-900">Authentic Source</h4>
                    <span className="text-sm text-gray-600">
                      {getProductBenefit(product.category, 'source')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded mr-3">
                    <Truck className="text-purple-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-900">Fast Delivery</h4>
                    <span className="text-sm text-gray-600">
                      {getProductBenefit(product.category, 'shipping')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;