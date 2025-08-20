import React, { useState } from 'react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import { discountedProducts as allProducts, categories } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import ProductSearchBar from '../components/products/ProductSearchBar';
import { Product } from '../types';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('combo-offers');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
              <div className="bg-white p-4 rounded-lg shadow-md">
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
                    </option>
                  ))}
                </select>
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