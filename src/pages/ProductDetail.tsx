import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Coffee, PackageCheck, Truck } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { generateProductSEO } from '../config/seo';
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import { Product, ProductVariant } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

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

  const currentPrice = selectedVariant ? selectedVariant.price : product?.price || 0;
  const currentImage = selectedVariant ? selectedVariant.image : product?.image || '';
  const isOutOfStock = product?.inStock === false || (selectedVariant && selectedVariant.inStock === false);

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
          to="/products" 
          className="inline-flex items-center text-blue-700 hover:text-navy-900 mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={currentImage} 
              alt={product.name} 
              className="w-full h-auto rounded"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-2">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-800 font-medium mb-4">
              NPR {currentPrice.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-navy-900 mb-3">
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
                      <div className="font-medium text-navy-900">{variant.name}</div>
                      <div className="text-sm text-gray-600">{variant.details.volume}</div>
                      <div className="text-blue-800 font-medium mt-1">NPR {variant.price.toFixed(2)}</div>
                      {variant.inStock === false && (
                        <div className="text-red-500 text-xs mt-1">Out of Stock</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Product Specs */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-navy-900 mb-3">
                {product.category === 'equipment' ? 'Equipment Details:' : 'Coffee Details:'}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-medium text-blue-800 w-32">
                    {product.category === 'equipment' ? 'Material:' : 'Origin:'}
                  </span> 
                  <span>{product.details.origin}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-blue-800 w-32">
                    {product.category === 'equipment' ? 'Type:' : 'Roast Level:'}
                  </span> 
                  <span>{product.details.roastLevel}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-blue-800 w-32">
                    {product.category === 'equipment' ? 'Features:' : 'Flavor Notes:'}
                  </span> 
                  <span>{product.details.flavorNotes.join(', ')}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium text-blue-800 w-32">Weight:</span> 
                  <span>
                    {selectedVariant ? selectedVariant.details.weight : product.details.weight}
                  </span>
                </li>
                {selectedVariant && (
                  <li className="flex items-start">
                    <span className="font-medium text-blue-800 w-32">Volume:</span> 
                    <span>{selectedVariant.details.volume}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 font-medium text-gray-700">
                  Quantity:
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

              <Button 
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="w-full md:w-auto flex items-center justify-center gap-2"
                disabled={isOutOfStock}
              >
                <ShoppingBag size={18} />
                {isOutOfStock ? 'Out of Stock' : (added ? 'Added to Cart!' : 'Add to Cart')}
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Coffee className="text-navy-700 mr-2" size={20} />
                  <span className="text-sm">
                    {product.category === 'equipment' ? 'Quality assured' : 'Roasted to order'}
                  </span>
                </div>
                <div className="flex items-center">
                  <PackageCheck className="text-navy-700 mr-2" size={20} />
                  <span className="text-sm">
                    {product.category === 'equipment' ? 'Warranty included' : 'Sustainably sourced'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Truck className="text-navy-700 mr-2" size={20} />
                  <span className="text-sm">Fast shipping</span>
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