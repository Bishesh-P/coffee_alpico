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
// - Search by variant codes (e.g. "mug-navy" for Navy Blue mug)
//
// 📚 EXAMPLES:
// - Whole line out: Set "12: false" (all Ground Coffee Medium Roast)
// - Single variant out: Set "ground-light-1kg": false (only 1kg size)
// - Color unavailable: Set "mug-navy": false (only Navy Blue mug)
//
// ⚡ BULK OPERATIONS:
// - Select multiple lines → Find/Replace true→false (mass out-of-stock)
// - Select multiple lines → Find/Replace false→true (mass restock)
// - Copy settings between similar products
//
// 🏷️ PRODUCT CATEGORIES FOR BULK MANAGEMENT:
// Coffee: IDs 1-3 (Light), 11-13 (Medium), 21-23 (Dark)
// Equipment: IDs 101-110
// Merchandise: IDs 201-210

const STOCK_CONFIG = {
  // 📦 MAIN PRODUCTS STOCK STATUS (true = In Stock, false = Out of Stock)
  // 🔍 Quick Find: Search product names below to locate instantly
  products: {
    // ☕ COFFEE PRODUCTS
    1: true,   // Whole Coffee Beans - Light Roast ☕
    2: true,   // Drip Coffee Bags - Light Roast ☕
    3: true,   // Ground Coffee - Light Roast ☕
    11: true,  // Whole Coffee Beans - Medium Roast ☕
    12: false, // Ground Coffee - Medium Roast ❌ OUT OF STOCK
    13: true,  // Drip Coffee Bags - Medium Roast ☕
    21: false, // Whole Coffee Beans - Dark Roast ❌ OUT OF STOCK
    22: true,  // Ground Coffee - Dark Roast ☕
    23: true,  // Drip Coffee Bags - Dark Roast ☕
    
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
    
    // 🎽 MERCHANDISE
    201: true, // Alpico Coffee Mug 🎽
    202: false, // Alpico Travel Tumbler ❌ OUT OF STOCK
    203: true, // Alpico Coffee T-Shirt 🎽
    204: false, // Alpico Bag ❌ REMOVING
    205: false, // Alpico Coffee Hoodie ❌ OUT OF STOCK
    206: false, // Alpico Coffee Beans Keychain ❌ REMOVING
    207: false, // Alpico Coffee Coasters Set ❌ REMOVING
    208: false, // Alpico Coffee Cap ❌ REMOVING
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
  // 🔍 Quick Find: Search by size (250g, 500g, 1kg) or color (navy, black, white)
  variants: {
    // ☕ COFFEE VARIANTS - SIZES
    // 🌟 Light Roast Variants
    "whole-light-250g": true,     // 250g Whole Beans ☕
    "whole-light-500g": true,     // 500g Whole Beans ☕
    "whole-light-1kg": true,      // 1kg Whole Beans ☕
    "drip-light-5pcs": true,      // 5pc Drip Bags ☕
    "drip-light-10pcs": true,     // 10pc Drip Bags ☕
    "ground-light-250g": true,    // 250g Ground Coffee ☕
    "ground-light-500g": true,    // 500g Ground Coffee ☕
    "ground-light-1kg": false,    // 1kg Ground Coffee ❌ OUT OF STOCK
    
    // 🔥 Medium Roast Variants  
    "whole-medium-250g": true,    // 250g Whole Beans ☕
    "whole-medium-500g": true,    // 500g Whole Beans ☕
    "whole-medium-1kg": true,     // 1kg Whole Beans ☕
    "ground-medium-250g": false,  // 250g Ground Coffee ❌ OUT OF STOCK
    "ground-medium-500g": false,  // 500g Ground Coffee ❌ OUT OF STOCK
    "ground-medium-1kg": false,   // 1kg Ground Coffee ❌ OUT OF STOCK
    "drip-medium-5pcs": true,     // 5pc Drip Bags ☕
    "drip-medium-10pcs": true,    // 10pc Drip Bags ☕
    
    // 🌑 Dark Roast Variants
    "whole-dark-250g": false,     // 250g Whole Beans ❌ OUT OF STOCK
    "whole-dark-500g": false,     // 500g Whole Beans ❌ OUT OF STOCK
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
    "mug-navy": false,            // Navy Blue Mug ❌ OUT OF STOCK
    "tumbler-steel": true,        // Steel Tumbler 🎽
    "tumbler-black": true,        // Black Tumbler 🎽
    "tumbler-blue": true,         // Blue Tumbler 🎽
    "tshirt-navy": true,          // Navy T-Shirt 🎽
    "tshirt-white": true,         // White T-Shirt 🎽
    "tshirt-black": false,        // Black T-Shirt ❌ OUT OF STOCK
    "bag-natural": false,        // Natural Canvas Bag ❌ REMOVED
    "bag-black": false,          // Black Canvas Bag ❌ REMOVED
    "hoodie-charcoal": false,     // Charcoal Hoodie ❌ OUT OF STOCK
    "hoodie-navy": false,         // Navy Hoodie ❌ OUT OF STOCK
    "hoodie-black": false,        // Black Hoodie ❌ OUT OF STOCK
    "cap-navy": true,             // Navy Cap 🎽
    "cap-black": true,            // Black Cap 🎽
    "cap-khaki": false,           // Khaki Cap ❌ OUT OF STOCK
    
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
    description: "Premium single-origin Nepal coffee with bright, complex flavors featuring floral aromatics and vibrant citrus notes. Our light roast Arabica beans are perfect for pour-over brewing methods. Available in multiple sizes for coffee enthusiasts.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
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
    category: "light-roast",
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
    category: "light-roast",
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

  // Coffee Equipment
  {
    id: 101,
    name: "Classic Moka Pot",
    price: 2999, // Base price for aluminum 3-cup
    description: "Traditional Italian moka pot for authentic espresso-style coffee at home. This stovetop coffee maker brews rich, concentrated coffee with distinctive flavor. Premium coffee brewing equipment available in aluminum and steel with various cup sizes for perfect home espresso.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      origin: "Made in Italy",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Multiple Materials", "Various Sizes", "Stovetop Compatible"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "moka-aluminum-3cup",
        name: "Aluminum 3-Cup",
        price: 2999,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "150ml",
          weight: "450g"
        },
        inStock: true
      },
      {
        id: "moka-aluminum-6cup",
        name: "Aluminum 6-Cup",
        price: 3599,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "300ml",
          weight: "550g"
        },
        inStock: true
      },
      {
        id: "moka-aluminum-9cup",
        name: "Aluminum 9-Cup",
        price: 4199,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "450ml",
          weight: "650g"
        },
        inStock: false
      },
      {
        id: "moka-steel-2cup",
        name: "Steel 2-Cup",
        price: 4599,
        image: "https://images.pexels.com/photos/4226801/pexels-photo-4226801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "100ml",
          weight: "380g"
        },
        inStock: true
      },
      {
        id: "moka-steel-4cup",
        name: "Steel 4-Cup",
        price: 5299,
        image: "https://images.pexels.com/photos/4226802/pexels-photo-4226802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "200ml",
          weight: "520g"
        },
        inStock: true
      },
      {
        id: "moka-steel-6cup",
        name: "Steel 6-Cup",
        price: 5999,
        image: "https://images.pexels.com/photos/4226803/pexels-photo-4226803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "300ml",
          weight: "680g"
        },
        inStock: false
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
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Heat Resistant", "Multiple Sizes", "Stainless Steel Filter"],
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
      origin: "Ceramic Construction",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Spiral Ridges", "Size 02", "Includes 40 Filters"],
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
      origin: "Stainless Steel",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Temperature Control", "1L Capacity", "Electric"],
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
      origin: "Conical Burr",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["40 Grind Settings", "250g Bean Hopper", "Timer Function"],
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
      origin: "BPA-Free Plastic",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Includes 350 Filters", "Travel Friendly", "1-4 Cup Capacity"],
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
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["6-Cup Capacity", "Wood Collar", "Leather Tie"],
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
      origin: "Digital Display",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["0.1g Precision", "Built-in Timer", "Auto-off Function"],
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
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["2L Capacity", "Fine Mesh Filter", "Airtight Lid"],
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
      origin: "Stainless Steel",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["58mm Base", "Ergonomic Handle", "Professional Grade"],
      weight: "450g"
    },
    variants: [],
    // promoCodes removed for global promo
  },

  // Merchandise
  {
    id: 201,
    name: "Alpico Coffee Mug - Classic White",
    price: 1149, // Base price for white
    description: "Premium ceramic coffee mug with the Alpico logo. Perfect for your daily coffee ritual. Dishwasher and microwave safe. Available in multiple colors.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    inStock: getProductStock(201),
    label: PRODUCT_LABELS.ECO_FRIENDLY,
    details: {
      origin: "Ceramic",
      roastLevel: "Merchandise",
      flavorNotes: ["350ml Capacity", "Dishwasher Safe", "Microwave Safe"],
      weight: "320g"
    },
    variants: [
      {
        id: "mug-white",
        name: "Classic White",
        price: 1149,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "320g",
          volume: "350ml"
        },
        inStock: true
      },
      {
        id: "mug-black",
        name: "Matte Black",
        price: 1149,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "320g",
          volume: "350ml"
        },
        inStock: true
      },
      {
        id: "mug-navy",
        name: "Navy Blue",
        price: 1149,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "320g",
          volume: "350ml"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 202,
    name: "Alpico Travel Tumbler",
    price: 2049, // Base price for stainless steel
    description: "Insulated stainless steel travel tumbler with Alpico branding. Keeps coffee hot for 6 hours and cold for 12 hours. Available in multiple colors.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    details: {
      origin: "Stainless Steel",
      roastLevel: "Merchandise",
      flavorNotes: ["500ml Capacity", "Double Wall Insulated", "Leak Proof Lid"],
      weight: "450g"
    },
    variants: [
      {
        id: "tumbler-steel",
        name: "Stainless Steel",
        price: 2049,
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
        price: 2049,
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
        price: 2149,
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
    id: 203,
    name: "Alpico Coffee T-Shirt",
    price: 1669, // Base price for navy blue
    description: "Comfortable 100% cotton t-shirt with vintage Alpico Coffee logo. Available in multiple colors and sizes S-XXL.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "100% Cotton",
      roastLevel: "Merchandise",
      flavorNotes: ["Vintage Logo", "Multiple Colors", "Sizes S-XXL"],
      weight: "180g"
    },
    variants: [
      {
        id: "tshirt-navy",
        name: "Navy Blue",
        price: 1669,
        image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "180g",
          volume: "Sizes S-XXL"
        },
        inStock: true
      },
      {
        id: "tshirt-white",
        name: "Classic White",
        price: 1669,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "180g",
          volume: "Sizes S-XXL"
        },
        inStock: true
      },
      {
        id: "tshirt-black",
        name: "Charcoal Black",
        price: 1669,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "180g",
          volume: "Sizes S-XXL"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 205,
    name: "Alpico Coffee Hoodie",
    price: 3199, // Base price for charcoal
    description: "Cozy fleece hoodie with embroidered Alpico logo. Perfect for chilly mornings with your favorite coffee. Available in multiple colors and sizes S-XXL.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    details: {
      origin: "Cotton Blend",
      roastLevel: "Merchandise",
      flavorNotes: ["Embroidered Logo", "Kangaroo Pocket", "Sizes S-XXL"],
      weight: "650g"
    },
    variants: [
      {
        id: "hoodie-charcoal",
        name: "Charcoal Grey",
        price: 3199,
        image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "650g",
          volume: "Sizes S-XXL"
        },
        inStock: true
      },
      {
        id: "hoodie-navy",
        name: "Navy Blue",
        price: 3199,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "650g",
          volume: "Sizes S-XXL"
        },
        inStock: true
      },
      {
        id: "hoodie-black",
        name: "Midnight Black",
        price: 3299,
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "650g",
          volume: "Sizes S-XXL"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 209,
    name: "Alpico Coffee Notebook",
    price: 769,
    description: "Premium A5-sized lined notebook with elegant Alpico Coffee branding, perfect for coffee tasting notes and brewing recipes. Features 80 pages of recycled paper with gold foil accents and elastic closure.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Recycled Paper",
      roastLevel: "Merchandise",
      flavorNotes: ["80 Pages", "A5 Size", "Elastic Band"],
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
      origin: "Vinyl Material",
      roastLevel: "Merchandise",
      flavorNotes: ["Pack of 10", "Waterproof", "Various Designs"],
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
      roastLevel: "Bundle Deal",
      flavorNotes: ["French Press", "500g Ground Coffee", "Perfect for Beginners"],
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
      roastLevel: "Bundle Deal",
      flavorNotes: ["500g Premium Coffee", "Free Ceramic Mug", "Perfect Gift"],
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
      roastLevel: "Starter Kit",
      flavorNotes: ["Pour Over Dripper", "1kg Coffee", "Mug", "Filters"],
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
      roastLevel: "Pour Over Optimized",
      flavorNotes: ["V60 Dripper", "Light Roast Coffee", "Perfect Extraction"],
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
      roastLevel: "Complete Experience",
      flavorNotes: ["Professional Equipment", "Premium Coffee", "Complete Setup"],
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
  { id: 'light-roast', name: 'Medium Light Roast' },
  { id: 'medium-roast', name: 'Medium Dark Roast' },
  { id: 'dark-roast', name: 'Dark Roast' },
  { id: 'equipment', name: 'Equipment' },
  { id: 'merch', name: 'Merchandise' },
];