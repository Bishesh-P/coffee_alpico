import React, { useState, useEffect } from 'react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import { discountedProducts as allProducts, categories } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import ProductSearchBar from '../components/products/ProductSearchBar';
import { Product } from '../types';
import { Coffee, Lightbulb, X } from 'lucide-react';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('combo-offers');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showBeginnerGuide, setShowBeginnerGuide] = useState(false);
  const [showRoastConfirmation, setShowRoastConfirmation] = useState(false);
  const [selectedRoastName, setSelectedRoastName] = useState('');

  // Handle closing beginner guide
  const handleCloseBeginnerGuide = () => {
    // User chose to skip the recommendation
    localStorage.setItem('skippedBeginnerGuide', 'true');
    setShowBeginnerGuide(false);
  };

  // Check if user is a first-time visitor for coffee recommendation
  useEffect(() => {
    const hasVisitedWebsite = localStorage.getItem('hasVisitedWebsite');
    
    // Show beginner guide only if it's their very first time visiting the entire website
    if (!hasVisitedWebsite) {
      setShowBeginnerGuide(true);
      // Mark that they've visited the website for the first time
      localStorage.setItem('hasVisitedWebsite', 'true');
    }
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showBeginnerGuide) {
        handleCloseBeginnerGuide();
      }
    };

    if (showBeginnerGuide) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showBeginnerGuide]);

  // Handle beginner roast selection
  const handleBeginnerRoastSelect = (roastType: string) => {
    localStorage.setItem('preferredRoast', roastType);
    setActiveCategory(roastType);
    setShowBeginnerGuide(false);
    
    // Show confirmation message
    const categoryName = categories.find(cat => cat.id === roastType)?.name || 'Coffee';
    setSelectedRoastName(categoryName);
    setShowRoastConfirmation(true);
    
    // Auto-hide confirmation after 4 seconds
    setTimeout(() => {
      setShowRoastConfirmation(false);
    }, 4000);
  };

  // Handle search results
  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
    setIsSearchActive(true);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearchActive(false);
  };

  // Get products to display
  const displayProducts = isSearchActive 
    ? searchResults 
    : allProducts.filter(product => product.category === activeCategory);

  // // Get SEO data for current category
  // const currentCategorySEO = activeCategory === 'all' 
  //   ? seoConfig.pages.products 
  //   : seoConfig.productCategories[] || seoConfig.pages.products;

        // ...existing code...
    // Get all valid category keys from seoConfig.productCategories
    const categoryKeys = Object.keys(seoConfig.productCategories);
    
    // Get SEO data for current category
    const currentCategorySEO = categoryKeys.includes(activeCategory)
      ? seoConfig.productCategories[activeCategory as keyof typeof seoConfig.productCategories]
      : seoConfig.pages.products;
    // ...existing code...

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' }
  ];

  const categoryName = categories.find(cat => cat.id === activeCategory)?.name || 'Category';
  breadcrumbItems.push({ name: categoryName, url: `/products?category=${activeCategory}` });

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="pt-20 md:pt-16">
      <SEOHead
        title={currentCategorySEO.title}
        description={currentCategorySEO.description}
        keywords={currentCategorySEO.keywords}
        url="/products"
        structuredData={breadcrumbSchema}
      />
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-down">
            Our Coffee & Equipment Collection
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 animate-fade-up mb-6">
            Browse our carefully curated collection of premium coffees and professional brewing equipment. From light to dark roasts and essential coffee gear.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto pb-4">
            <ProductSearchBar 
              products={allProducts}
              onSearchResults={handleSearchResults}
              onClearSearch={handleClearSearch}
            />
          </div>
        </div>
      </div>

      {/* Beginner Coffee Guide - Recommendation Modal */}
      {showBeginnerGuide && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-purple-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseBeginnerGuide}
        >
          <div 
            className="bg-gradient-to-br from-white via-blue-50/50 to-amber-50/50 backdrop-blur-md rounded-2xl max-w-lg w-full mx-4 p-4 md:p-6 relative animate-scale-up shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseBeginnerGuide}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-all duration-300 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-navy-900 via-blue-800 to-purple-700 bg-clip-text text-transparent mb-2">
                New to Coffee? ☕
              </h2>
              <p className="text-gray-600 text-sm">
                Let us guide you to the perfect starting point.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-l-4 border-amber-400 p-4 rounded-lg mb-4 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-lg"></div>
              <div className="relative flex items-start">
                <Coffee className="text-amber-600 mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2 text-sm flex items-center">
                    🌟 Perfect for Beginners
                    <span className="ml-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      RECOMMENDED
                    </span>
                  </h3>
                  <p className="text-amber-800 mb-2 text-sm">
                    We recommend <strong>Medium Light Roast</strong> - the perfect starting point!
                  </p>
                  <ul className="text-xs text-amber-700 space-y-1 mb-3">
                    <li>✓ Balanced - not too mild, not too strong</li>
                    <li>✓ Smooth with subtle complexity</li>
                    <li>✓ Great for all brewing methods</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mb-4">
              <button 
                onClick={() => handleBeginnerRoastSelect('light-roast')}
                className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white p-3 rounded-lg hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center relative z-10">
                  <div className="text-2xl mb-1">🌟</div>
                  <div className="font-bold text-lg">Start with Medium Light Roast!</div>
                  <div className="text-xs mt-1 bg-white/20 rounded-full px-2 py-1">Most Popular Choice</div>
                </div>
              </button>
            </div>

            <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3">
              <button 
                onClick={handleCloseBeginnerGuide}
                className="text-gray-600 hover:text-blue-700 text-sm font-medium transition-all duration-300 px-4 py-2 hover:bg-white/60 rounded-lg border border-gray-200 hover:border-blue-300"
              >
                I'll browse all categories myself
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roast Selection Confirmation Banner */}
      {showRoastConfirmation && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white py-4 px-4 animate-fade-down relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <Coffee size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                Perfect choice! You've selected <span className="bg-white/20 px-2 py-1 rounded-full">{selectedRoastName}</span> - great for beginners! 🎉
              </span>
            </div>
            <p className="text-sm text-emerald-100">
              Browse our {selectedRoastName.toLowerCase()} collection below, or explore other categories anytime.
            </p>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Show on desktop and hide during search */}
          {!isSearchActive && (
            <div className="md:w-1/4 hidden md:block animate-fade-right">
              <ProductFilter 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            </div>
          )}

          {/* Mobile Filter - Show on mobile and hide during search */}
          {!isSearchActive && (
            <div className="md:hidden mb-6 animate-fade-down">
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <label htmlFor="category-select" className="block text-sm font-medium text-navy-900 mb-2">
                  Filter by Category
                </label>
                <select 
                  id="category-select"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                      {category.id === 'light-roast' ? ' ⭐ Beginner Friendly' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Mobile Coffee Guide Tip */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-amber-800 text-xs leading-relaxed mb-1">
                      <strong>New to coffee?</strong> Try Medium Light Roast - it's perfectly balanced and beginner-friendly!
                    </p>
                    <p className="text-amber-700 text-xs">
                      Perfect with: French Press, Moka Pot, or V60
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={isSearchActive ? "w-full" : "md:w-3/4"}>
            {/* Search Results Header */}
            {isSearchActive && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      Search Results ({displayProducts.length})
                    </h3>
                    <p className="text-sm text-blue-700">
                      Showing products matching your search
                    </p>
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  delay={index * 100} 
                />
              ))}
            </div>

            {displayProducts.length === 0 && (
              <div className="text-center py-12 animate-fade-up">
                {isSearchActive ? (
                  <div>
                    <div className="mb-6">
                      <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        We couldn't find any products matching your search. Try different keywords or browse our categories.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={handleClearSearch}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View All Products
                      </button>
                      <button
                        onClick={() => setActiveCategory('all')}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Browse Categories
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products in this category</h3>
                      <p className="text-gray-600 mb-6">Try selecting a different category or view all products.</p>
                    </div>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View All Products
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;