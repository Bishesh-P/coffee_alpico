import { Product } from '../types';
import { PRODUCT_LABELS } from '../utils/productLabels';
import { applyAllDiscounts } from '../utils/discountManager';

// ===== STOCK MANAGEMENT CONFIGURATION =====
// 🎯 SUPER EASY INVENTORY MANAGEMENT SYSTEM
// 
// 📋 HOW TO USE:
// 1. OUT OF STOCK: Change true → false
// 2. BACK IN STOCK: Change false → true
// 3. Save file - changes apply instantly!
//
// 🔍 QUICK FIND:
// - Use Ctrl+F to search for product names
// - Search by ID numbers (e.g. "12:" for Medium Roast Ground Coffee)
// - Search by variant codes (e.g. "mug-white" for White mug)
//
// 📚 EXAMPLES:
// - Whole line out: Set "12: false" (all Ground Coffee Medium Roast)
// - Single variant out: Set "ground-light-1kg": false (only 1kg size)
// - Color unavailable: Set "mug-white": false (only White mug)
//
// ⚡ BULK OPERATIONS:
// - Select multiple lines → Find/Replace true→false (mass out-of-stock)
// - Select multiple lines → Find/Replace false→true (mass restock)
// - Copy settings between similar products
//
// 🏷️ PRODUCT CATEGORIES FOR BULK MANAGEMENT:
// Coffee: IDs 1-3 (Medium Light), 11-13 (Medium), 21-23 (Dark), 31-33 (Light)
// Equipment: IDs 101-112
// Merchandise: IDs 201-210

const STOCK_CONFIG = {
  // 📦 MAIN PRODUCTS STOCK STATUS (true = In Stock, false = Out of Stock)
  // 🔍 Quick Find: Search product names below to locate instantly
  products: {
    // ☕ COFFEE PRODUCTS
    1: true,   // Whole Coffee Beans - Medium Light Roast ☕
    2: true,   // Drip Coffee Bags - Medium Light Roast ☕
    3: true,   // Ground Coffee - Medium Light Roast ☕
    11: true,  // Whole Coffee Beans - Medium Roast ☕
    12: true,  // Ground Coffee - Medium Roast ☕
    13: true,  // Drip Coffee Bags - Medium Roast ☕
    21: true,  // Whole Coffee Beans - Dark Roast ☕
    22: true,  // Ground Coffee - Dark Roast ☕
    23: true,  // Drip Coffee Bags - Dark Roast ☕
    31: true,  // Whole Coffee Beans - Light Roast ☕
    32: true,  // Drip Coffee Bags - Light Roast ☕
    33: true,  // Ground Coffee - Light Roast ☕
    
    // ⚙️ COFFEE EQUIPMENT
    101: true, // Classic Moka Pot ⚙️
    102: true, // French Press Coffee Maker ⚙️
    103: true, // Pour Over V60 Dripper ⚙️
    104: true, // Coffee Server Kettle ⚙️
    105: true, // Burr Coffee Grinder ⚙️
    106: true, // AeroPress Coffee Maker ⚙️
    107: true, // Chemex Classic Coffee Maker ⚙️
    108: true, // Digital Coffee Scale ⚙️
    109: true, // Cold Brew Coffee Maker ⚙️
    110: true, // Espresso Tamper ⚙️
    111: true, // Black Moka Pot ⚙️
    112: true, // Stainless Steel French Press ⚙️
    
    // 🎽 MERCHANDISE
    201: true, // Alpico Coffee Mug 🎽
    202: false, // Alpico Travel Tumbler ❌ OUT OF STOCK
    209: false, // Alpico Coffee Notebook ❌ OUT OF STOCK
    210: true, // Alpico Coffee Stickers Pack 🎽
    
    // 🎁 COMBO OFFERS
    301: true, // French Press + Coffee Combo 🎁
    302: true, // Coffee + Alpico Mug Combo 🎁
    303: true, // Complete Coffee Starter Kit 🎁
    304: true, // Pour Over + Coffee Bundle 🎁
    305: true, // Coffee Lover's Premium Pack 🎁
  } as Record<number, boolean>,
  
  // 🎨 INDIVIDUAL VARIANT STOCK STATUS (Sizes, Colors, etc.)
  // 🔍 Quick Find: Search by size (250g, 500g, 1kg) or color (black, white)
  variants: {
    // ☕ COFFEE VARIANTS - SIZES
    // 🌟 Medium Light Roast Variants (Original products)
    "whole-light-250g": true,     // 250g Whole Beans ☕
    "whole-light-500g": true,     // 500g Whole Beans ☕
    "whole-light-1kg": true,      // 1kg Whole Beans ☕
    "drip-light-5pcs": true,      // 5pc Drip Bags ☕
    "drip-light-10pcs": true,     // 10pc Drip Bags ☕
    "ground-light-250g": true,    // 250g Ground Coffee ☕
    "ground-light-500g": true,    // 500g Ground Coffee ☕
    "ground-light-1kg": false,    // 1kg Ground Coffee ❌ OUT OF STOCK
    
    // ☀️ Light Roast Variants (New products)
    "whole-pure-light-250g": true,  // 250g Whole Beans ☕
    "whole-pure-light-500g": true,  // 500g Whole Beans ☕
    "whole-pure-light-1kg": true,   // 1kg Whole Beans ☕
    "drip-pure-light-5pcs": true,   // 5pc Drip Bags ☕
    "drip-pure-light-10pcs": true,  // 10pc Drip Bags ☕
    "ground-pure-light-250g": true, // 250g Ground Coffee ☕
    "ground-pure-light-500g": true, // 500g Ground Coffee ☕
    "ground-pure-light-1kg": true,  // 1kg Ground Coffee ☕
    
    // 🔥 Medium Roast Variants  
    "whole-medium-250g": true,    // 250g Whole Beans ☕
    "whole-medium-500g": true,    // 500g Whole Beans ☕
    "whole-medium-1kg": true,     // 1kg Whole Beans ☕
    "ground-medium-250g": true,   // 250g Ground Coffee ☕
    "ground-medium-500g": true,   // 500g Ground Coffee ☕
    "ground-medium-1kg": true,    // 1kg Ground Coffee ☕
    "drip-medium-5pcs": true,     // 5pc Drip Bags ☕
    "drip-medium-10pcs": true,    // 10pc Drip Bags ☕
    
    // 🌑 Dark Roast Variants
    "whole-dark-250g": true,      // 250g Whole Beans ☕
    "whole-dark-500g": true,      // 500g Whole Beans ☕
    "whole-dark-1kg": true,       // 1kg Whole Beans ☕
    "ground-dark-250g": true,     // 250g Ground Coffee ☕
    "ground-dark-500g": true,     // 500g Ground Coffee ☕
    "ground-dark-1kg": true,      // 1kg Ground Coffee ☕
    "drip-dark-5pcs": true,       // 5pc Drip Bags ☕
    "drip-dark-10pcs": true,      // 10pc Drip Bags ☕
    
    // ⚙️ EQUIPMENT VARIANTS - SIZES & MATERIALS
    "moka-aluminum-3cup": true,   // Aluminum 3-Cup Moka ⚙️
    "moka-aluminum-6cup": true,   // Aluminum 6-Cup Moka ⚙️
    "moka-aluminum-9cup": false,  // Aluminum 9-Cup Moka ❌ OUT OF STOCK
    "moka-steel-2cup": true,      // Steel 2-Cup Moka ⚙️
    "moka-steel-4cup": true,      // Steel 4-Cup Moka ⚙️
    "moka-steel-6cup": false,     // Steel 6-Cup Moka ❌ OUT OF STOCK
    "fp-350ml": true,             // 350ml French Press ⚙️
    "fp-600ml": false,            // 600ml French Press ❌ OUT OF STOCK
    "fp-800ml": true,             // 800ml French Press ⚙️
    "fp-1000ml": true,            // 1000ml French Press ⚙️
    
    // � MERCHANDISE VARIANTS - COLORS
    "mug-white": true,            // White Mug 🎽
    "mug-black": true,            // Black Mug 🎽
    "tumbler-steel": true,        // Steel Tumbler 🎽
    "tumbler-black": true,        // Black Tumbler 🎽
    "tumbler-blue": true,         // Blue Tumbler 🎽
    "cap-navy": true,             // Navy Cap 🎽
    "cap-black": true,            // Black Cap 🎽
    "cap-khaki": false,           // Khaki Cap ❌ OUT OF STOCK
    
    // ⚫ Black Moka Pot Variants
    "moka-black-3cup": true,      // Black 3-Cup Moka ⚙️
    "moka-black-6cup": true,      // Black 6-Cup Moka ⚙️
    "moka-black-9cup": true,      // Black 9-Cup Moka ⚙️
    
    // 🔩 Stainless Steel French Press Variants
    "fpss-350ml": true,           // 350ml Steel French Press ⚙️
    "fpss-600ml": true,           // 600ml Steel French Press ⚙️
    "fpss-800ml": true,           // 800ml Steel French Press ⚙️
    "fpss-1000ml": true,          // 1000ml Steel French Press ⚙️
    
    // 🎁 COMBO VARIANTS
    "combo-light-mug": true,      // Light Roast + Free Mug 🎁
    "combo-medium-mug": true,     // Medium Roast + Free Mug 🎁
    "combo-dark-mug": true,       // Dark Roast + Free Mug 🎁
  } as Record<string, boolean>
};

// Helper functions to get stock status
const getProductStock = (productId: number): boolean => {
  return STOCK_CONFIG.products[productId] ?? true;
};

const getVariantStock = (variantId: string): boolean => {
  return STOCK_CONFIG.variants[variantId] ?? true;
};

// 🛠️ UTILITY FUNCTIONS FOR BULK OPERATIONS
// (Uncomment and modify as needed for bulk changes)

// Make all coffee products out of stock:
// const setAllCoffeeOutOfStock = () => {
//   [1,2,3,11,12,13,21,22,23].forEach(id => STOCK_CONFIG.products[id] = false);
// };

// Make all equipment in stock:
// const setAllEquipmentInStock = () => {
//   [101,102,103,104,105,106,107,108,109,110].forEach(id => STOCK_CONFIG.products[id] = true);
// };

// Make all merchandise in stock:
// const setAllMerchInStock = () => {
//   [201,202,203,204,205,206,207,208,209,210].forEach(id => STOCK_CONFIG.products[id] = true);
// };

// Make all variants of a specific size out of stock (e.g., all 1kg variants):
// const setAllSizeOutOfStock = (size: string) => {
//   Object.keys(STOCK_CONFIG.variants).forEach(key => {
//     if (key.includes(size)) STOCK_CONFIG.variants[key] = false;
//   });
// };

// ===== END STOCK MANAGEMENT =====

export const products: Product[] = [
  // Light Roast Coffee
  {
    id: 1,
    name: "Whole Coffee Beans - Medium Light Roast",
    price: 1050, // Base price for 250g
    description: "Premium single-origin Nepal coffee. Our Medium light roast Arabica beans are perfect for pour-over brewing methods. Available in multiple sizes for coffee enthusiasts.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-light-roast",
    featured: true,
    inStock: getProductStock(1),
    label: PRODUCT_LABELS.BESTSELLER,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Jasmine", "Lemon", "Bergamot"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-light-250g",
        name: "250g",
        price: 1050,
        image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: getVariantStock("whole-light-250g")
      },
      {
        id: "whole-light-500g",
        name: "500g",
        price: 1999,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("whole-light-500g")
      },
      {
        id: "whole-light-1kg",
        name: "1kg",
        price: 3699,
        image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: getVariantStock("whole-light-1kg")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 2,
    name: "Drip Coffee Bags",
    price: 1500, // Base price for 10pcs
    description: "Convenient single-serve drip coffee bags featuring Nepal's finest light roast with notes of citrus and honey. Perfect for morning brewing anywhere - ideal for office, travel, or home use. Premium quality instant drip coffee experience.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-light-roast",
    featured: false,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Citrus", "Honey", "Green Apple"],
      weight: "Varies by pack size"
    },
    variants: [
      {
        id: "drip-light-5pcs",
        name: "5 pieces",
        price: 799,
        image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "50g",
          volume: "5 servings"
        },
        inStock: true
      },
      {
        id: "drip-light-10pcs",
        name: "10 pieces",
        price: 1500,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "100g",
          volume: "10 servings"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 3,
    name: "Ground Coffee - Medium Light Roast",
    price: 850, // Base price for 250g
    description: "Pre-ground Nepal coffee beans featuring clean, bright light roast with notes of orange, vanilla, and honey from Nepal's renowned coffee growing regions. Ready-to-brew ground coffee for convenience and exceptional flavor.",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-light-roast",
    featured: false,
    details: {
      origin: "Palpa",
      roastLevel: "Medium light",
      flavorNotes: ["Orange", "Vanilla", "Honey"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-light-250g",
        name: "250g",
        price: 850,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: true
      },
      {
        id: "ground-light-500g",
        name: "500g",
        price: 1599,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      },
      {
        id: "ground-light-1kg",
        name: "1kg",
        price: 2999,
        image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },

  // Medium Roast Coffee
  {
    id: 11,
    name: "Whole Coffee Beans - Espresso Blend",
    price: 1799, // Base price for 250g
    description: "Our premium espresso blend coffee beans combine carefully selected Arabica from Ethiopia and Colombia for rich, balanced flavor with notes of chocolate and berry. Perfect for espresso machines and coffee enthusiasts. Available in multiple sizes.",
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: true,
    details: {
      origin: "Ethiopia, Colombia",
      roastLevel: "Medium Dark",
      flavorNotes: ["Chocolate", "Berry", "Caramel"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-medium-250g",
        name: "250g",
        price: 1799,
        image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: true
      },
      {
        id: "whole-medium-500g",
        name: "500g",
        price: 3399,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      },
      {
        id: "whole-medium-1kg",
        name: "1kg",
        price: 6299,
        image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 12,
    name: "Ground Coffee - Medium Dark Roast",
    price: 1899, // Base price for 250g
    description: "A smooth, complex medium roast with notes of chocolate, spice, and subtle fruit from the volcanic soils of Antigua. Pre-ground for convenience.",
    image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: false,
    inStock: false,
    details: {
      origin: "Guatemala",
      roastLevel: "Medium Dark",
      flavorNotes: ["Chocolate", "Spice", "Apple"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-medium-250g",
        name: "250g",
        price: 1899,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: false
      },
      {
        id: "ground-medium-500g",
        name: "500g",
        price: 3599,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: false
      },
      {
        id: "ground-medium-1kg",
        name: "1kg",
        price: 6699,
        image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 13,
    name: "Drip Coffee Bags",
    price: 1849, // Base price for 10pcs
    description: "Certified organic coffee with a balanced profile featuring notes of caramel, almond, and citrus. Convenient single-serve drip bags.",
    image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: false,
    details: {
      origin: "Peru",
      roastLevel: "Medium Dark",
      flavorNotes: ["Caramel", "Almond", "Citrus"],
      weight: "Varies by pack size"
    },
    variants: [
      {
        id: "drip-medium-5pcs",
        name: "5 pieces",
        price: 999,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "50g",
          volume: "5 servings"
        },
        inStock: true
      },
      {
        id: "drip-medium-10pcs",
        name: "10 pieces",
        price: 1849,
        image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "100g",
          volume: "10 servings"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },

  // Dark Roast Coffee
  {
    id: 21,
    name: "Whole Coffee Beans - Dark Roast",
    price: 1849, // Base price for 250g
    description: "A bold, earthy dark roast with low acidity and notes of cedar, spice, and dark chocolate. Available in multiple sizes.",
    image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: true,
    inStock: false,
    details: {
      origin: "Sumatra",
      roastLevel: "Dark",
      flavorNotes: ["Cedar", "Dark Chocolate", "Spice"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-dark-250g",
        name: "250g",
        price: 1849,
        image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: false
      },
      {
        id: "whole-dark-500g",
        name: "500g",
        price: 3499,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: false
      },
      {
        id: "whole-dark-1kg",
        name: "1kg",
        price: 6499,
        image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 22,
    name: "Ground Coffee - French Roast",
    price: 1649, // Base price for 250g
    description: "A bold, intense dark roast with smoky notes and rich body. Perfect for those who love strong coffee. Pre-ground for convenience.",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: false,
    details: {
      origin: "French Roast Blend",
      roastLevel: "Dark",
      flavorNotes: ["Smoky", "Bold", "Rich Body"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-dark-250g",
        name: "250g",
        price: 1649,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: true
      },
      {
        id: "ground-dark-500g",
        name: "500g",
        price: 3099,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      },
      {
        id: "ground-dark-1kg",
        name: "1kg",
        price: 5799,
        image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 23,
    name: "Drip Coffee Bags",
    price: 1699, // Base price for 10pcs
    description: "Traditional Italian-style dark roast with intense flavor and oily surface. Perfect for espresso-style brewing. Convenient single-serve drip bags.",
    image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: false,
    details: {
      origin: "Italian Roast Blend",
      roastLevel: "Dark",
      flavorNotes: ["Intense", "Oily", "Espresso Perfect"],
      weight: "Varies by pack size"
    },
    variants: [
      {
        id: "drip-dark-5pcs",
        name: "5 pieces",
        price: 899,
        image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "50g",
          volume: "5 servings"
        },
        inStock: true
      },
      {
        id: "drip-dark-10pcs",
        name: "10 pieces",
        price: 1699,
        image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "100g",
          volume: "10 servings"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },

  // Light Roast Coffee (Pure Light Roast - Lighter than Medium Light)
  {
    id: 31,
    name: "Whole Coffee Beans - Light Roast",
    price: 999, // Base price for 250g
    description: "Premium single-origin Nepal coffee with delicate, bright flavors featuring subtle floral notes and crisp acidity. Our pure light roast preserves the coffee's origin characteristics with minimal roasting for maximum brightness. Perfect for pour-over and filter brewing methods.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: true,
    inStock: getProductStock(31),
    label: PRODUCT_LABELS.NEW_ARRIVAL,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Floral", "Bright Acidity", "Citrus Zest"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-pure-light-250g",
        name: "250g",
        price: 999,
        image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: getVariantStock("whole-pure-light-250g")
      },
      {
        id: "whole-pure-light-500g",
        name: "500g",
        price: 1899,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("whole-pure-light-500g")
      },
      {
        id: "whole-pure-light-1kg",
        name: "1kg",
        price: 3499,
        image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: getVariantStock("whole-pure-light-1kg")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 32,
    name: "Drip Coffee Bags - Light Roast",
    price: 1399, // Base price for 10pcs
    description: "Convenient single-serve drip coffee bags featuring Nepal's purest light roast with delicate floral notes and bright acidity. Perfect for those who appreciate subtle, nuanced coffee flavors. Ideal for office, travel, or home brewing.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: false,
    inStock: getProductStock(32),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Floral", "Bright Acidity", "Tea-like"],
      weight: "Varies by pack size"
    },
    variants: [
      {
        id: "drip-pure-light-5pcs",
        name: "5 pieces",
        price: 749,
        image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "50g",
          volume: "5 servings"
        },
        inStock: getVariantStock("drip-pure-light-5pcs")
      },
      {
        id: "drip-pure-light-10pcs",
        name: "10 pieces",
        price: 1399,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "100g",
          volume: "10 servings"
        },
        inStock: getVariantStock("drip-pure-light-10pcs")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 33,
    name: "Ground Coffee - Light Roast",
    price: 799, // Base price for 250g
    description: "Pre-ground Nepal coffee beans featuring delicate light roast with bright acidity and floral characteristics. Our lightest roast level preserves the coffee's natural brightness and origin flavors. Ready-to-brew ground coffee for filter and pour-over methods.",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: false,
    inStock: getProductStock(33),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Bright Acidity", "Floral", "Clean Finish"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-pure-light-250g",
        name: "250g",
        price: 799,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: getVariantStock("ground-pure-light-250g")
      },
      {
        id: "ground-pure-light-500g",
        name: "500g",
        price: 1499,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("ground-pure-light-500g")
      },
      {
        id: "ground-pure-light-1kg",
        name: "1kg",
        price: 2799,
        image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "1kg",
          volume: "50-60 cups"
        },
        inStock: getVariantStock("ground-pure-light-1kg")
      }
    ],
    // promoCodes removed for global promo
  },

  // Coffee Equipment
  {
    id: 111,
    name: "Black Moka Pot",
    price: 3299, // Base price for black 3-cup
    description: "Sleek black aluminum moka pot with premium matte finish for authentic Italian espresso at home. This sophisticated stovetop coffee maker combines traditional brewing with modern aesthetics. Available in multiple sizes for different household needs.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    inStock: getProductStock(111),
    label: PRODUCT_LABELS.NEW_ARRIVAL,
    details: {
      material: "Black Aluminum",
      capacity: "Multiple sizes",
      features: ["Matte Black Finish", "Made in Italy", "Stovetop Compatible"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "moka-black-3cup",
        name: "Black 3-Cup",
        price: 3299,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "150ml",
          weight: "400g"
        },
        inStock: true
      },
      {
        id: "moka-black-6cup",
        name: "Black 6-Cup",
        price: 3899,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "300ml",
          weight: "550g"
        },
        inStock: true
      },
      {
        id: "moka-black-9cup",
        name: "Black 9-Cup",
        price: 4499,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "450ml",
          weight: "650g"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 101,
    name: "Classic Moka Pot",
    price: 2999, // Base price for aluminum 3-cup
    description: "Traditional Italian moka pot for authentic espresso-style coffee at home. This stovetop coffee maker brews rich, concentrated coffee with distinctive flavor. Premium coffee brewing equipment available in aluminum and steel with various cup sizes for perfect home espresso.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      material: "Aluminum/Steel",
      capacity: "Various sizes",
      features: ["Made in Italy", "Stovetop Compatible", "Multiple Material Options"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "moka-aluminum-3cup",
        name: "Aluminum 3-Cup",
        price: 2999,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: '-'
        },
        inStock: true
      },
      {
        id: "moka-aluminum-6cup",
        name: "Aluminum 6-Cup",
        price: 3599,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: true
      },
      {
        id: "moka-aluminum-9cup",
        name: "Aluminum 9-Cup",
        price: 4199,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: true
      },
      {
        id: "moka-steel-2cup",
        name: "Steel 2-Cup",
        price: 4599,
        image: "https://images.pexels.com/photos/4226801/pexels-photo-4226801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: true
      },
      {
        id: "moka-steel-4cup",
        name: "Steel 4-Cup",
        price: 5299,
        image: "https://images.pexels.com/photos/4226802/pexels-photo-4226802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: true
      },
      {
        id: "moka-steel-6cup",
        name: "Steel 6-Cup",
        price: 5999,
        image: "https://images.pexels.com/photos/4226803/pexels-photo-4226803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 102,
    name: "French Press Coffee Maker",
    price: 2899, // Base price for 350ml
    description: "Premium borosilicate glass French press coffee maker with stainless steel filter system. Perfect for brewing full-bodied, rich coffee extraction at home. Professional coffee brewing equipment available in multiple sizes for coffee enthusiasts.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    label: PRODUCT_LABELS.STAFF_PICK,
    details: {
      material: "Borosilicate Glass",
      capacity: "Multiple sizes",
      features: ["Heat Resistant", "Stainless Steel Filter", "Easy to Clean"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "fp-350ml",
        name: "350ml",
        price: 2899,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "350ml",
          weight: "650g"
        },
        inStock: true
      },
      {
        id: "fp-600ml",
        name: "600ml",
        price: 3599,
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "600ml",
          weight: "750g"
        },
        inStock: false
      },
      {
        id: "fp-800ml",
        name: "800ml",
        price: 4199,
        image: "https://images.pexels.com/photos/4226838/pexels-photo-4226838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "800ml",
          weight: "850g"
        },
        inStock: true
      },
      {
        id: "fp-1000ml",
        name: "1000ml",
        price: 4899,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "1000ml",
          weight: "950g"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 112,
    name: "Stainless Steel French Press",
    price: 3499, // Base price for 350ml steel
    description: "Premium double-wall stainless steel French press with superior heat retention and durability. Features professional-grade mesh filter and ergonomic handle. Perfect for camping, office, or home use with unbreakable construction.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    inStock: getProductStock(112),
    label: PRODUCT_LABELS.PREMIUM,
    details: {
      material: "Stainless Steel",
      capacity: "Multiple sizes",
      features: ["Double-Wall Insulation", "Unbreakable", "Premium Filter"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "fpss-350ml",
        name: "350ml Steel",
        price: 3499,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "350ml",
          weight: "750g"
        },
        inStock: true
      },
      {
        id: "fpss-600ml",
        name: "600ml Steel",
        price: 4199,
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "600ml",
          weight: "850g"
        },
        inStock: true
      },
      {
        id: "fpss-800ml",
        name: "800ml Steel",
        price: 4799,
        image: "https://images.pexels.com/photos/4226838/pexels-photo-4226838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "800ml",
          weight: "950g"
        },
        inStock: true
      },
      {
        id: "fpss-1000ml",
        name: "1000ml Steel",
        price: 5499,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "1000ml",
          weight: "1050g"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 103,
    name: "Pour Over V60 Dripper",
    price: 2999,
    description: "Premium ceramic V60 dripper with signature spiral ridges for optimal water flow and consistent extraction. Made from high-quality ceramic that retains heat during brewing. Includes 40 premium paper filters to get you started.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    inStock: getProductStock(103),
    label: PRODUCT_LABELS.NEW_ARRIVAL,
    details: {
      material: "Ceramic",
      capacity: "Size 02",
      features: ["Spiral Ridges Design", "Includes 40 Filters", "Heat Retention"],
      weight: "360g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 104,
    name: "Coffee Server Kettle",
    price: 9199,
    description: "Professional precision pour kettle with digital temperature control and elegant gooseneck spout. Features adjustable temperature settings with ±1°C accuracy and built-in timer function.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Stainless Steel",
      capacity: "1L",
      features: ["Temperature Control", "Digital Display", "Gooseneck Spout"],
      weight: "1.45kg"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 105,
    name: "Burr Coffee Grinder",
    price: 15399,
    description: "Professional conical burr grinder with 40 precise grind settings for every brewing method. Features large 250g bean hopper with UV-protective lid and built-in timer for consistent grinding.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      material: "Conical Burr Steel",
      capacity: "250g Bean Hopper",
      features: ["40 Grind Settings", "UV-Protective Lid", "Timer Function"],
      weight: "3.85kg"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 106,
    name: "AeroPress Coffee Maker",
    price: 4099,
    description: "Revolutionary brewing device that combines immersion and pressure for exceptionally smooth coffee in under a minute. Includes 350 micro-filters, measuring scoop, and stirrer. Perfect for travel, office, or home use.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "BPA-Free Plastic",
      capacity: "1-4 Cups",
      features: ["Includes 350 Filters", "Travel Friendly", "Fast Brewing"],
      weight: "500g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 107,
    name: "Chemex Classic Coffee Maker",
    price: 5599,
    description: "Iconic hourglass-shaped pour-over brewer made from non-porous borosilicate glass. Features wood collar and leather tie for comfortable handling. Thick proprietary filters produce remarkably clean and bright coffee.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Borosilicate Glass",
      capacity: "6-Cup",
      features: ["Wood Collar", "Leather Tie", "Thick Filters"],
      weight: "815g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 108,
    name: "Digital Coffee Scale",
    price: 3399,
    description: "High-precision digital scale with built-in timer for perfect coffee-to-water ratios. Features 0.1g accuracy with 2kg capacity and large LCD display. Essential tool for consistent brewing results.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Digital Display",
      capacity: "2kg",
      features: ["0.1g Precision", "Built-in Timer", "Auto-off Function"],
      weight: "1kg"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 109,
    name: "Cold Brew Coffee Maker",
    price: 4699,
    description: "Large capacity cold brew maker with ultra-fine mesh filter for smooth, low-acid coffee concentrate. The 2-liter borosilicate glass carafe allows for 12-24 hour steeping to reduce acidity by up to 70%.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Borosilicate Glass",
      capacity: "2L",
      features: ["Fine Mesh Filter", "Airtight Lid", "12-24 Hour Steeping"],
      weight: "1.27kg"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 110,
    name: "Espresso Tamper",
    price: 2599,
    description: "Professional-grade stainless steel tamper with ergonomic wooden handle for comfortable, consistent tamping. Features precision-machined 58mm base and weighted design for optimal pressure distribution.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Stainless Steel",
      capacity: "58mm Base",
      features: ["Ergonomic Handle", "Professional Grade", "Weighted Design"],
      weight: "450g"
    },
    variants: [],
    // promoCodes removed for global promo
  },

  // Merchandise
  {
    id: 201,
    name: "Alpico Coffee Mug - Classic White",
    price: 350, // Base price for white
    description: "Premium ceramic coffee mug with the Alpico logo. Perfect for your daily coffee ritual. Dishwasher and microwave safe. Available in multiple colors.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    inStock: getProductStock(201),
    label: PRODUCT_LABELS.MUST_HAVE,
    details: {
      material: "Premium Ceramic",
      capacity: "200ml",
      features: ["High quality", "Easy to carry", "Alpico Logo Design"],
      weight: "320g"
    },
    variants: [
      {
        id: "mug-white",
        name: "Classic White",
        price: 350,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "320g",
          volume: "200ml"
        },
        inStock: true
      },
      {
        id: "mug-black",
        name: "Matte Black",
        price: 350,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "320g",
          volume: "200ml"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 202,
    name: "Alpico Travel Tumbler",
    price: 1299, // Discounted price
    originalPrice: 1599, // Original price to show discount
    description: "Insulated stainless steel travel tumbler with Alpico branding. Keeps coffee hot for 6 hours and cold for 12 hours. Available in multiple colors.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    label: PRODUCT_LABELS.SALE,
    details: {
      material: "Stainless Steel",
      capacity: "500ml",
      features: ["Double Wall Insulated", "Leak Proof Lid", "6hrs Hot/12hrs Cold"],
      weight: "450g"
    },
    variants: [
      {
        id: "tumbler-steel",
        name: "Stainless Steel",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "450g",
          volume: "500ml"
        },
        inStock: true
      },
      {
        id: "tumbler-black",
        name: "Matte Black",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "450g",
          volume: "500ml"
        },
        inStock: true
      },
      {
        id: "tumbler-blue",
        name: "Ocean Blue",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "450g",
          volume: "500ml"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 209,
    name: "Alpico Coffee Notebook",
    price: 500,
    description: "Premium A5-sized lined notebook with elegant Alpico Coffee branding, perfect for notes taking. Features 80 pages of recycled paper and elastic closure.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      material: "Recycled Paper",
      capacity: "A5 Size",
      features: ["80 Pages Lined", "Elastic Band Closure"],
      weight: "200g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 210,
    name: "Alpico Coffee Stickers Pack",
    price: 389,
    description: "Vibrant pack of 10 waterproof vinyl stickers featuring exclusive Alpico Coffee artwork. Made from fade-resistant, weatherproof vinyl perfect for laptops, water bottles, and more. Easy to apply and remove without residue.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      material: "Vinyl Material",
      capacity: "Pack of 10",
      features: ["Waterproof Design", "Fade Resistant", "Various Designs"],
      weight: "25g"
    },
    variants: [],
    // promoCodes removed for global promo
  },

  // 🎁 COMBO OFFERS - Special Bundle Deals
  {
    id: 301,
    name: "French Press + Coffee Combo",
    price: 4200, // Discounted combo price
    description: "Perfect coffee brewing starter kit! Includes our premium French Press Coffee Maker paired with 500g of your choice medium roast ground coffee. Everything you need for the perfect coffee experience at home. Save NPR 350 compared to buying separately!",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(301),
    label: PRODUCT_LABELS.HOT_DEAL,
    details: {
      origin: "Combo Bundle",
      roastLevel: "Complete Kit",
      flavorNotes: ["French Press Included", "500g Ground Coffee", "Perfect for Beginners"],
      weight: "French Press + 500g Coffee"
    },
    variants: []
  },
  {
    id: 302,
    name: "Coffee + Free Alpico Mug",
    price: 1050, // Same as coffee price, mug is free
    description: "Get our signature Alpico Coffee Mug absolutely FREE with any 500g coffee purchase! Choose from our premium light, medium, or dark roast coffee and receive our beautiful ceramic mug as a complimentary gift. Limited time offer!",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(302),
    label: PRODUCT_LABELS.LIMITED_EDITION,
    details: {
      origin: "Combo Bundle",
      roastLevel: "Free Mug Included",
      flavorNotes: ["500g Premium Coffee", "Free Ceramic Mug", "Perfect Gift Set"],
      weight: "500g Coffee + Mug"
    },
    variants: [
      {
        id: "combo-light-mug",
        name: "Light Roast + Free Mug",
        price: 1050,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g + Mug",
          volume: "20-25 cups + Mug"
        },
        inStock: getVariantStock("combo-light-mug")
      },
      {
        id: "combo-medium-mug",
        name: "Medium Roast + Free Mug",
        price: 1050,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g + Mug",
          volume: "20-25 cups + Mug"
        },
        inStock: getVariantStock("combo-medium-mug")
      },
      {
        id: "combo-dark-mug",
        name: "Dark Roast + Free Mug",
        price: 1050,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g + Mug",
          volume: "20-25 cups + Mug"
        },
        inStock: getVariantStock("combo-dark-mug")
      }
    ]
  },
  {
    id: 303,
    name: "Complete Coffee Starter Kit",
    price: 6500, // Great value bundle
    description: "Everything a coffee enthusiast needs! This comprehensive starter kit includes Pour Over V60 Dripper, 1kg premium coffee beans, Alpico mug, and coffee filters. Perfect for gifting or starting your coffee journey. Save NPR 500!",
    image: "https://images.pexels.com/photos/4226764/pexels-photo-4226764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(303),
    label: PRODUCT_LABELS.MUST_HAVE,
    details: {
      origin: "Complete Bundle",
      roastLevel: "Everything Included",
      flavorNotes: ["Pour Over Dripper", "1kg Coffee Beans", "Mug & Filters"],
      weight: "Complete Kit"
    },
    variants: []
  },
  {
    id: 304,
    name: "Pour Over Coffee Bundle",
    price: 3800, // Discounted bundle price
    description: "Master the art of pour over coffee! Includes our precision Pour Over V60 Dripper with 500g of specially selected light roast coffee, perfect for pour over brewing. Ideal for coffee purists who appreciate nuanced flavors.",
    image: "https://images.pexels.com/photos/4226903/pexels-photo-4226903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(304),
    details: {
      origin: "Specialty Bundle",
      roastLevel: "Light Roast Optimized",
      flavorNotes: ["V60 Dripper Included", "Light Roast Coffee", "Perfect for Pour Over"],
      weight: "Pour Over Kit + 500g"
    },
    variants: []
  },
  {
    id: 305,
    name: "Coffee Lover's Premium Pack",
    price: 8900, // Premium bundle with significant savings
    description: "The ultimate coffee experience! Includes Burr Coffee Grinder, French Press, 1kg whole beans, Alpico mug, travel tumbler, and coffee scale. Everything you need for cafe-quality coffee at home. Save NPR 800!",
    image: "https://images.pexels.com/photos/4226856/pexels-photo-4226856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(305),
    label: PRODUCT_LABELS.PREMIUM,
    details: {
      origin: "Premium Bundle",
      roastLevel: "Professional Grade",
      flavorNotes: ["Burr Grinder", "French Press", "Whole Bean Coffee"],
      weight: "Full Kit + 1kg Coffee"
    },
    variants: []
  }
];

// 🎯 APPLY DISCOUNTS AUTOMATICALLY
// This applies all discounts from discountManager.ts to the products
export const discountedProducts = products.map(applyAllDiscounts);

export const categories = [
  { id: 'combo-offers', name: 'Combo Offers' },
  { id: 'light-roast', name: 'Light Roast' },
  { id: 'medium-light-roast', name: 'Medium Light Roast' },
  { id: 'medium-roast', name: 'Medium Dark Roast' },
  { id: 'dark-roast', name: 'Dark Roast' },
  { id: 'equipment', name: 'Equipment' },
  { id: 'merch', name: 'Merchandise' },
];