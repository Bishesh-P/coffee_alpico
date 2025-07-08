import React from 'react';
import { categories } from '../../data/products';

interface ProductFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold text-navy-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`block w-full text-left px-3 py-2 rounded transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-blue-100 text-navy-900 font-medium transform scale-105'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;