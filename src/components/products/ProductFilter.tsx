import React from 'react';
import { categories } from '../../data/products';
import { Lightbulb } from 'lucide-react';

interface ProductFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-navy-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`block w-full text-left px-3 py-2 rounded transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-navy-900 font-medium transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {category.name}
                {category.id === 'light-roast' && (
                  <span className="ml-2">⭐</span>
                )}
              </button>
              {category.id === 'light-roast' && (
                <div className="text-emerald-600 text-xs font-medium mt-1 ml-3">
                  Beginner Choice
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Coffee Guide Tip */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="text-emerald-600 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <h4 className="font-semibold text-emerald-900 text-sm mb-1">
              New to Coffee?
            </h4>
            <p className="text-emerald-800 text-xs leading-relaxed mb-2">
              We recommend starting with <strong>Medium Light Roast</strong> - it's perfectly balanced and loved by most coffee drinkers!
            </p>
            <div className="text-xs text-emerald-700">
              <div className="font-medium mb-1">Best with:</div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">French Press</span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Moka Pot</span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">V60</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;