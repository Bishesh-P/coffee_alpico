import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Coffee, Filter } from 'lucide-react';
import { Product } from '../../types';

interface SearchBarProps {
  products: Product[];
  onSearchResults: (results: Product[]) => void;
  onClearSearch: () => void;
}

interface SearchSuggestion {
  type: 'product' | 'category' | 'flavor' | 'origin';
  value: string;
  label: string;
  product?: Product;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({ products, onSearchResults, onClearSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create dynamic searchable index that adapts to any product structure
  const searchIndex = useMemo(() => {
    const index: SearchSuggestion[] = [];
    const uniqueValues = new Set<string>();
    
    products.forEach(product => {
      // Add product names
      const productKey = `product_${product.name.toLowerCase()}`;
      if (!uniqueValues.has(productKey)) {
        uniqueValues.add(productKey);
        index.push({
          type: 'product',
          value: product.name.toLowerCase(),
          label: product.name,
          product
        });
      }

      // Dynamically extract all searchable fields from product
      const extractSearchableFields = (obj: any, prefix = '', depth = 0) => {
        if (depth > 3) return; // Prevent infinite recursion
        
        Object.entries(obj).forEach(([key, value]) => {
          if (value && typeof value === 'string') {
            // Add string values as searchable content
            const searchValue = value.toLowerCase();
            const searchKey = `${prefix}${key}_${searchValue}`;
            
            if (!uniqueValues.has(searchKey) && searchValue.length > 1) {
              uniqueValues.add(searchKey);
              
              // Determine suggestion type based on field name
              let suggestionType: 'category' | 'flavor' | 'origin' | 'product' = 'product';
              let label = value;
              
              if (key.toLowerCase().includes('category') || key.toLowerCase().includes('type')) {
                suggestionType = 'category';
                label = `Category: ${value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
              } else if (key.toLowerCase().includes('flavor') || key.toLowerCase().includes('note') || key.toLowerCase().includes('taste')) {
                suggestionType = 'flavor';
                label = `Flavor: ${value}`;
              } else if (key.toLowerCase().includes('origin') || key.toLowerCase().includes('region') || key.toLowerCase().includes('location')) {
                suggestionType = 'origin';
                label = `Origin: ${value}`;
              }
              
              index.push({
                type: suggestionType,
                value: searchValue,
                label: label
              });
            }
          } else if (Array.isArray(value)) {
            // Handle arrays (like flavor notes, tags, etc.)
            value.forEach((item, idx) => {
              if (typeof item === 'string') {
                const searchValue = item.toLowerCase();
                const searchKey = `${prefix}${key}_${idx}_${searchValue}`;
                
                if (!uniqueValues.has(searchKey) && searchValue.length > 1) {
                  uniqueValues.add(searchKey);
                  
                  let suggestionType: 'category' | 'flavor' | 'origin' | 'product' = 'product';
                  let label = item;
                  
                  if (key.toLowerCase().includes('flavor') || key.toLowerCase().includes('note') || key.toLowerCase().includes('taste')) {
                    suggestionType = 'flavor';
                    label = `Flavor: ${item}`;
                  } else if (key.toLowerCase().includes('tag') || key.toLowerCase().includes('category')) {
                    suggestionType = 'category';
                    label = `Tag: ${item}`;
                  } else if (key.toLowerCase().includes('origin') || key.toLowerCase().includes('region')) {
                    suggestionType = 'origin';
                    label = `Origin: ${item}`;
                  }
                  
                  index.push({
                    type: suggestionType,
                    value: searchValue,
                    label: label
                  });
                }
              } else if (typeof item === 'object' && item !== null) {
                extractSearchableFields(item, `${prefix}${key}_${idx}_`, depth + 1);
              }
            });
          } else if (typeof value === 'object' && value !== null) {
            // Recursively extract from nested objects
            extractSearchableFields(value, `${prefix}${key}_`, depth + 1);
          }
        });
      };

      // Extract all searchable fields from the product
      extractSearchableFields(product);
    });

    return index;
  }, [products]);

  // Dynamic search function that works with any product structure
  const performSearch = (term: string): Product[] => {
    if (!term.trim()) return products;

    const normalizedTerm = term.toLowerCase().trim();
    const searchResults = new Map<number, { product: Product; score: number }>();

    products.forEach(product => {
      let score = 0;

      // Dynamic recursive search through all product fields
      const searchInObject = (obj: any, depth = 0, fieldPath = ''): number => {
        if (depth > 4) return 0; // Prevent infinite recursion
        let objectScore = 0;

        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = fieldPath ? `${fieldPath}.${key}` : key;
          
          if (value && typeof value === 'string') {
            const valueText = value.toLowerCase();
            
            if (valueText.includes(normalizedTerm)) {
              // Different scoring based on field importance and match type
              let fieldScore = 0;
              
              // Name fields get highest priority
              if (key.toLowerCase().includes('name') || key.toLowerCase().includes('title')) {
                fieldScore = valueText === normalizedTerm ? 100 : 80;
              }
              // Description fields
              else if (key.toLowerCase().includes('description') || key.toLowerCase().includes('summary')) {
                fieldScore = 50;
              }
              // Category and type fields
              else if (key.toLowerCase().includes('category') || key.toLowerCase().includes('type')) {
                fieldScore = 40;
              }
              // Origin and location fields
              else if (key.toLowerCase().includes('origin') || key.toLowerCase().includes('region') || key.toLowerCase().includes('location')) {
                fieldScore = 35;
              }
              // Flavor and taste related fields
              else if (key.toLowerCase().includes('flavor') || key.toLowerCase().includes('note') || key.toLowerCase().includes('taste')) {
                fieldScore = 30;
              }
              // Other descriptive fields
              else if (key.toLowerCase().includes('roast') || key.toLowerCase().includes('process') || key.toLowerCase().includes('method')) {
                fieldScore = 25;
              }
              // Brand and manufacturer fields
              else if (key.toLowerCase().includes('brand') || key.toLowerCase().includes('manufacturer')) {
                fieldScore = 20;
              }
              // Specifications (weight, size, etc.)
              else if (key.toLowerCase().includes('weight') || key.toLowerCase().includes('size') || key.toLowerCase().includes('dimension')) {
                fieldScore = 15;
              }
              // Any other string field
              else {
                fieldScore = 10;
              }
              
              // Bonus for exact matches
              if (valueText === normalizedTerm) {
                fieldScore *= 1.5;
              }
              // Bonus for starts with match
              else if (valueText.startsWith(normalizedTerm)) {
                fieldScore *= 1.2;
              }
              
              objectScore += fieldScore;
            }
            
            // Fuzzy matching for typos
            if (normalizedTerm.length >= 3) {
              const words = valueText.split(/\s+/);
              words.forEach(word => {
                if (word.length >= 3) {
                  // Simple fuzzy matching - check if words start similarly
                  if (word.startsWith(normalizedTerm.substring(0, 3)) || 
                      normalizedTerm.startsWith(word.substring(0, 3))) {
                    objectScore += 5;
                  }
                }
              });
            }
          } else if (Array.isArray(value)) {
            // Search through arrays
            value.forEach((item, index) => {
              if (typeof item === 'string') {
                const itemText = item.toLowerCase();
                if (itemText.includes(normalizedTerm)) {
                  // Array items get moderate scoring
                  objectScore += itemText === normalizedTerm ? 35 : 25;
                }
              } else if (typeof item === 'object' && item !== null) {
                objectScore += searchInObject(item, depth + 1, `${currentPath}[${index}]`);
              }
            });
          } else if (typeof value === 'object' && value !== null) {
            // Recursively search nested objects
            objectScore += searchInObject(value, depth + 1, currentPath);
          } else if (typeof value === 'number') {
            // Handle numeric searches (price, weight numbers, etc.)
            const valueStr = value.toString();
            if (valueStr.includes(normalizedTerm)) {
              objectScore += 15;
            }
          }
        });

        return objectScore;
      };

      score = searchInObject(product);

      if (score > 0) {
        searchResults.set(product.id, { product, score });
      }
    });

    // Sort by score and return products
    return Array.from(searchResults.values())
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  };

  // Generate suggestions
  const generateSuggestions = (term: string): SearchSuggestion[] => {
    if (!term.trim()) return [];

    const normalizedTerm = term.toLowerCase();
    const matchingSuggestions = searchIndex
      .filter(item => item.value.includes(normalizedTerm))
      .slice(0, 8);

    return matchingSuggestions;
  };

  // Handle search input
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim()) {
      const results = performSearch(value);
      onSearchResults(results);
      
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      onClearSearch();
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product' && suggestion.product) {
      setSearchTerm(suggestion.label);
      onSearchResults([suggestion.product]);
    } else {
      setSearchTerm(suggestion.value);
      const results = performSearch(suggestion.value);
      onSearchResults(results);
    }
    setShowSuggestions(false);
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm('');
    onClearSearch();
    setSuggestions([]);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  // Get icon for suggestion type
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product': return <Coffee size={16} className="text-blue-600" />;
      case 'category': return <Filter size={16} className="text-green-600" />;
      case 'flavor': return <span className="text-orange-600 text-sm">🫐</span>;
      case 'origin': return <span className="text-purple-600 text-sm">🌍</span>;
      default: return <Search size={16} className="text-gray-600" />;
    }
  };

  // Handle focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
        if (!searchTerm) setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsExpanded(true);
      }
      // Clear search on Escape
      if (e.key === 'Escape' && searchTerm) {
        setSearchTerm('');
        onClearSearch();
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, onClearSearch]);

  return (
    <div className="search-container relative w-full max-w-md mx-auto mb-8">
      <div className={`relative transition-all duration-300 ${isExpanded ? 'scale-105' : ''}`}>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              setIsExpanded(true);
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Search coffee, flavors, origins... (Ctrl+K)"
            className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-600 text-center">
            {products.length > 0 ? (
              <span>Found {products.length} product{products.length !== 1 ? 's' : ''}</span>
            ) : (
              <span className="text-orange-600">No products found for "{searchTerm}"</span>
            )}
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.value}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
              >
                <div className="flex-shrink-0">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-gray-800 group-hover:text-blue-800">
                    {suggestion.label}
                  </div>
                  {suggestion.type === 'product' && suggestion.product && (
                    <div className="text-xs text-gray-500">
                      NPR {suggestion.product.price} • {suggestion.product.details.weight}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips and Popular Searches */}
      {isExpanded && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
          <div className="space-y-4">
            {/* Popular Searches */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Coffee', 'Equipment', 'Gift Set', 'Medium Roast', 'Nepal', 'Premium'].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearchChange(term)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Tips */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Search Tips
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>🔍 Try: "coffee", "equipment", "gift set"</div>
                <div>🫐 Search by flavor: "fruity", "nutty", "bold"</div>
                <div>🌍 Search by origin: "Nepal", "mountain", "region"</div>
                <div>⚖️ Search by specs: "250g", "ceramic", "premium"</div>
                <div>🎁 Search by type: "bundle", "starter kit", "accessories"</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
