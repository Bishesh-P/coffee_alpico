import { ProductVariant } from '../types';

/**
 * Utility functions for extracting variant information like size and color
 */

/**
 * Extract size information from variant
 */
export const extractSize = (variant: ProductVariant): string => {
  const name = variant.name.toLowerCase();
  const volume = variant.details.volume.toLowerCase();
  
  // Check for specific size patterns
  if (name.includes('small') || volume.includes('small')) return 'Small';
  if (name.includes('medium') || volume.includes('medium')) return 'Medium';
  if (name.includes('large') || volume.includes('large')) return 'Large';
  if (name.includes('xl') || volume.includes('xl')) return 'XL';
  
  // For coffee sizes
  if (name.includes('250g') || volume.includes('250g')) return '250g';
  if (name.includes('500g') || volume.includes('500g')) return '500g';
  if (name.includes('1kg') || volume.includes('1kg')) return '1kg';
  
  // For equipment sizes
  if (name.includes('3-cup') || name.includes('3 cup')) return '3 Cup';
  if (name.includes('6-cup') || name.includes('6 cup')) return '6 Cup';
  if (name.includes('9-cup') || name.includes('9 cup')) return '9 Cup';
  if (name.includes('350ml')) return '350ml';
  if (name.includes('600ml')) return '600ml';
  if (name.includes('800ml')) return '800ml';
  if (name.includes('1000ml')) return '1000ml';
  
  // For drip bags
  if (name.includes('10pcs') || name.includes('10 pcs')) return '10 pcs';
  if (name.includes('20pcs') || name.includes('20 pcs')) return '20 pcs';
  if (name.includes('30pcs') || name.includes('30 pcs')) return '30 pcs';
  
  // Return empty string if no specific size found
  return '';
};

/**
 * Extract color information from variant
 */
export const extractColor = (variant: ProductVariant): string => {
  const name = variant.name.toLowerCase();
  
  // Common colors
  if (name.includes('black')) return 'Black';
  if (name.includes('white')) return 'White';
  if (name.includes('red')) return 'Red';
  if (name.includes('blue')) return 'Blue';
  if (name.includes('green')) return 'Green';
  if (name.includes('yellow')) return 'Yellow';
  if (name.includes('gray') || name.includes('grey')) return 'Gray';
  if (name.includes('brown')) return 'Brown';
  if (name.includes('silver')) return 'Silver';
  if (name.includes('gold')) return 'Gold';
  
  // Specific color variations
  if (name.includes('matte black')) return 'Matte Black';
  if (name.includes('classic white')) return 'Classic White';
  if (name.includes('ocean blue')) return 'Ocean Blue';
  if (name.includes('stainless steel') || name.includes('steel')) return 'Stainless Steel';
  
  // Material-based colors
  if (name.includes('aluminum')) return 'Aluminum';
  if (name.includes('ceramic')) return 'Ceramic';
  if (name.includes('glass')) return 'Glass';
  
  // Return empty string if no color is found
  return '';
};

/**
 * Extract material information from variant
 */
export const extractMaterial = (variant: ProductVariant): string => {
  const name = variant.name.toLowerCase();
  
  if (name.includes('cotton')) return 'Cotton';
  if (name.includes('ceramic')) return 'Ceramic';
  if (name.includes('stainless steel') || name.includes('steel')) return 'Stainless Steel';
  if (name.includes('aluminum')) return 'Aluminum';
  if (name.includes('glass')) return 'Glass';
  if (name.includes('plastic')) return 'Plastic';
  if (name.includes('metal')) return 'Metal';
  if (name.includes('vinyl')) return 'Vinyl';
  if (name.includes('paper')) return 'Paper';
  
  return '';
};

/**
 * Get comprehensive variant information for database storage
 */
export const getVariantInfo = (variant: ProductVariant) => {
  return {
    id: variant.id,
    name: variant.name,
    size: extractSize(variant),
    color: extractColor(variant),
    material: extractMaterial(variant),
    weight: variant.details.weight,
    volume: variant.details.volume,
    price: variant.price,
    originalPrice: variant.originalPrice
  };
};

/**
 * Create a display-friendly variant description
 */
export const getVariantDisplayName = (variant: ProductVariant): string => {
  const size = extractSize(variant);
  const color = extractColor(variant);
  
  if (color === '' && size === '') {
    return variant.name;
  }
  
  if (color === '') {
    return size;
  }
  
  if (size === '') {
    return color;
  }
  
  return `${color} - ${size}`;
};
