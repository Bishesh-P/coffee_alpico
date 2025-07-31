// ===== DISCOUNT MANAGEMENT SYSTEM =====
// 🎯 SUPER EASY DISCOUNT CONFIGURATION
// 
// 📋 HOW TO USE:
// 1. Add product ID and discount percentage to PRODUCT_DISCOUNTS
// 2. Add variant ID and discount percentage to VARIANT_DISCOUNTS
// 3. Save file - discounts apply instantly!
//
// 🔍 EXAMPLES:
// - 20% off product: Add "1: 20" to PRODUCT_DISCOUNTS
// - 15% off variant: Add "whole-light-500g: 15" to VARIANT_DISCOUNTS
// - Remove discount: Delete the line or set to 0
//
// ⚡ BULK OPERATIONS:
// - Copy/paste multiple lines for similar discounts
// - Use find/replace to change discount percentages quickly
// - Comment out lines with // to temporarily disable discounts

import { Product, ProductVariant } from '../types';

// 🏷️ PRODUCT DISCOUNTS (Product ID: Discount Percentage)
// Add or remove product IDs here to control discounts
export const PRODUCT_DISCOUNTS: Record<number, number> = {
  // Coffee Products
  1: 16,    // Whole Coffee Beans - Light Roast: 16% off
  2: 12,    // Drip Coffee Bags - Light Roast: 12% off
  11: 20,   // Whole Coffee Beans - Medium Roast: 20% off
  21: 25,   // Whole Coffee Beans - Dark Roast: 25% off
  
  // Equipment
  103: 17,  // Pour Over V60 Dripper: 17% off
  101: 15,  // Classic Moka Pot: 15% off
  
  // Merchandise
  201: 18,  // Alpico Coffee Mug: 18% off
  202: 22,  // Alpico Travel Tumbler: 22% off
  
  // Bundles & Combos
  301: 30,  // Complete Coffee Starter Kit: 30% off
  302: 25,  // Pour Over Coffee Bundle: 25% off
};

// 🎨 VARIANT DISCOUNTS (Variant ID: Discount Percentage)
// Add or remove variant IDs here to control variant-specific discounts
export const VARIANT_DISCOUNTS: Record<string, number> = {
  // Light Roast Variants
  "whole-light-500g": 17,    // 500g Light Roast: 17% off
  "whole-light-1kg": 20,     // 1kg Light Roast: 20% off
  "ground-light-1kg": 18,    // 1kg Ground Light: 18% off
  
  // Medium Roast Variants
  "whole-medium-500g": 15,   // 500g Medium Roast: 15% off
  "drip-medium-30pcs": 10,   // 30pcs Drip Medium: 10% off
  
  // Mug Color Variants
  "mug-black": 15,           // Black Mug: 15% off
  "mug-navy": 20,            // Navy Mug: 20% off (out of stock special)
  
  // Equipment Variants
  "moka-350ml": 12,          // 350ml Moka Pot: 12% off
  "french-1l": 18,           // 1L French Press: 18% off
};

// 🎯 SEASONAL DISCOUNT CAMPAIGNS
// Easily apply discounts to multiple products at once
export const SEASONAL_CAMPAIGNS = {
  // Summer Sale - Apply to all coffee products
  summerSale: {
    productIds: [1, 2, 3, 11, 12, 13, 21, 22, 23],
    discount: 15
  },
  
  // Equipment Sale - Apply to all equipment
  equipmentSale: {
    productIds: [101, 102, 103, 104, 105],
    discount: 20
  },
  
  // New Customer Special - Featured products only
  newCustomerSpecial: {
    productIds: [1, 103, 201],
    discount: 25
  }
};

// 🛠️ UTILITY FUNCTIONS

/**
 * Calculate original price from current price and discount percentage
 */
export const calculateOriginalPrice = (currentPrice: number, discountPercent: number): number => {
  return Math.round((currentPrice / (1 - discountPercent / 100)) * 100) / 100;
};

/**
 * Calculate discounted price from original price and discount percentage
 */
export const calculateDiscountedPrice = (originalPrice: number, discountPercent: number): number => {
  return Math.round((originalPrice * (1 - discountPercent / 100)) * 100) / 100;
};

/**
 * Apply discount to a product based on PRODUCT_DISCOUNTS configuration
 */
export const applyProductDiscount = (product: Product): Product => {
  const discountPercent = PRODUCT_DISCOUNTS[product.id];
  
  if (discountPercent && discountPercent > 0) {
    const originalPrice = calculateOriginalPrice(product.price, discountPercent);
    return {
      ...product,
      originalPrice
    };
  }
  
  return product;
};

/**
 * Apply discount to a product variant based on VARIANT_DISCOUNTS configuration
 */
export const applyVariantDiscount = (variant: ProductVariant): ProductVariant => {
  const discountPercent = VARIANT_DISCOUNTS[variant.id];
  
  if (discountPercent && discountPercent > 0) {
    const originalPrice = calculateOriginalPrice(variant.price, discountPercent);
    return {
      ...variant,
      originalPrice
    };
  }
  
  return variant;
};

/**
 * Apply discounts to a complete product including all its variants
 */
export const applyAllDiscounts = (product: Product): Product => {
  // Apply product-level discount
  let discountedProduct = applyProductDiscount(product);
  
  // Apply variant-level discounts
  if (discountedProduct.variants) {
    discountedProduct = {
      ...discountedProduct,
      variants: discountedProduct.variants.map(applyVariantDiscount)
    };
  }
  
  return discountedProduct;
};

/**
 * Apply seasonal campaign discounts
 */
export const applyCampaignDiscount = (product: Product, campaignName: keyof typeof SEASONAL_CAMPAIGNS): Product => {
  const campaign = SEASONAL_CAMPAIGNS[campaignName];
  
  if (campaign.productIds.includes(product.id)) {
    const originalPrice = calculateOriginalPrice(product.price, campaign.discount);
    return {
      ...product,
      originalPrice
    };
  }
  
  return product;
};

/**
 * Bulk apply discounts to multiple products
 */
export const applyBulkDiscounts = (products: Product[]): Product[] => {
  return products.map(applyAllDiscounts);
};

// 🎨 DISCOUNT DISPLAY UTILITIES

/**
 * Get discount percentage for display
 */
export const getDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Check if product has any discount
 */
export const hasDiscount = (product: Product): boolean => {
  return !!product.originalPrice || (product.variants?.some(v => !!v.originalPrice) ?? false);
};

/**
 * Get the best discount percentage for a product (considering variants)
 */
export const getBestDiscountPercentage = (product: Product): number => {
  let maxDiscount = 0;
  
  // Check product-level discount
  if (product.originalPrice) {
    maxDiscount = Math.max(maxDiscount, getDiscountPercentage(product.originalPrice, product.price));
  }
  
  // Check variant-level discounts
  if (product.variants) {
    for (const variant of product.variants) {
      if (variant.originalPrice) {
        maxDiscount = Math.max(maxDiscount, getDiscountPercentage(variant.originalPrice, variant.price));
      }
    }
  }
  
  return maxDiscount;
};

// 🚀 QUICK DISCOUNT ACTIONS

/**
 * Quick function to add discount to specific products
 */
export const addQuickDiscount = (productIds: number[], discountPercent: number): void => {
  console.log(`Apply ${discountPercent}% discount to products: ${productIds.join(', ')}`);
  console.log('Add these lines to PRODUCT_DISCOUNTS:');
  productIds.forEach(id => {
    console.log(`${id}: ${discountPercent},`);
  });
};

/**
 * Quick function to add discount to specific variants
 */
export const addQuickVariantDiscount = (variantIds: string[], discountPercent: number): void => {
  console.log(`Apply ${discountPercent}% discount to variants: ${variantIds.join(', ')}`);
  console.log('Add these lines to VARIANT_DISCOUNTS:');
  variantIds.forEach(id => {
    console.log(`"${id}": ${discountPercent},`);
  });
};
