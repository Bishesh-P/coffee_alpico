import React, { useState } from 'react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import { products, categories } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  // // Get SEO data for current category
  // const currentCategorySEO = activeCategory === 'all' 
  //   ? seoConfig.pages.products 
  //   : seoConfig.productCategories[] || seoConfig.pages.products;

        // ...existing code...
    // Get all valid category keys from seoConfig.productCategories
    const categoryKeys = Object.keys(seoConfig.productCategories);
    
    // Get SEO data for current category
    const currentCategorySEO =
      activeCategory === 'all'
        ? seoConfig.pages.products
        : categoryKeys.includes(activeCategory)
          ? seoConfig.productCategories[activeCategory as keyof typeof seoConfig.productCategories]
          : seoConfig.pages.products;
    // ...existing code...

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' }
  ];

  if (activeCategory !== 'all') {
    const categoryName = categories.find(cat => cat.id === activeCategory)?.name || 'Category';
    breadcrumbItems.push({ name: categoryName, url: `/products?category=${activeCategory}` });
  }

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
      <div className="bg-navy-900 text-white py-16 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-down">
            Our Coffee & Equipment Collection
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100 animate-fade-up">
            Browse our carefully curated collection of premium coffees and professional brewing equipment. From light to dark roasts and essential coffee gear.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Show on desktop */}
          <div className="md:w-1/4 hidden md:block animate-fade-right">
            <ProductFilter 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </div>

          {/* Mobile Filter - Show on mobile */}
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

          {/* Products Grid */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  delay={index * 100} 
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 animate-fade-up">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;