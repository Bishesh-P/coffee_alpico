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
    103: true, // Professional Filtercone Pour Over Dripper ⚙️
    104: true, // V60 Coffee Server ⚙️
    105: true, // Ceramic Burr Hand Coffee Grinder ⚙️
    106: true, // AeroPress Coffee and Espresso Maker ⚙️
    108: true, // Digital Coffee Scale with Timer ⚙️
    111: true, // Black Moka Pot ⚙️
    112: true, // Stainless Steel French Press ⚙️
    113: false, // Electric Handheld Milk Frother ❌ OUT OF STOCK
    114: true, // Stainless Steel Frothing Pitcher ⚙️
    115: true, // V60 Coffee Filter (2-4 cups) ⚙️
    116: true, // Drip Coffee Maker Machine ⚙️
    117: true, // Gooseneck Kettle with Thermometer ⚙️
    
    // 🎽 MERCHANDISE
    201: true, // Alpico Coffee Mug 🎽
    202: false, // Temperature Display Coffee Cup ❌ OUT OF STOCK
    209: false, // Alpico Coffee Notebook ❌ OUT OF STOCK
    210: true, // Alpico Coffee Stickers Pack 🎽
    211: false, // Alpico Coffee T-Shirt ❌ OUT OF STOCK
    212: true, // Alpico Coffee Keychain 🎽
    
    // 🎁 COMBO OFFERS
    301: true, // French Press + Coffee Combo 🎁
    302: true, // Coffee + Alpico Mug Combo 🎁
    303: true, // Complete Coffee Starter Kit 🎁
    304: true, // Pour Over + Coffee Bundle 🎁
    305: true, // Coffee Lover's Premium Pack 🎁
    306: true, // Moka Pot + Coffee Combo 🎁
  } as Record<number, boolean>,
  
  // 🎨 INDIVIDUAL VARIANT STOCK STATUS (Sizes, Colors, etc.)
  // 🔍 Quick Find: Search by size (250g, 500g, 1kg) or color (black, white)
  variants: {
    // ☕ COFFEE VARIANTS - SIZES
    // 🌟 Medium Light Roast Variants (Original products)
    "whole-light-250g": true,     // 250g Whole Beans ☕
    "whole-light-500g": true,     // 500g Whole Beans ☕
    "drip-light-5pcs": true,      // 5pc Drip Bags ☕
    "drip-light-10pcs": true,     // 10pc Drip Bags ☕
    "ground-light-250g": true,    // 250g Ground Coffee ☕
    "ground-light-500g": true,    // 500g Ground Coffee ☕
    
    // ☀️ Light Roast Variants (New products)
    "whole-pure-light-250g": true,  // 250g Whole Beans ☕
    "whole-pure-light-500g": true,  // 500g Whole Beans ☕
    "drip-pure-light-5pcs": true,   // 5pc Drip Bags ☕
    "drip-pure-light-10pcs": true,  // 10pc Drip Bags ☕
    "ground-pure-light-250g": true, // 250g Ground Coffee ☕
    "ground-pure-light-500g": true, // 500g Ground Coffee ☕
    
    // 🔥 Medium Roast Variants  
    "whole-medium-250g": true,    // 250g Whole Beans ☕
    "whole-medium-500g": true,    // 500g Whole Beans ☕
    "ground-medium-250g": true,   // 250g Ground Coffee ☕
    "ground-medium-500g": true,   // 500g Ground Coffee ☕
    "drip-medium-5pcs": true,     // 5pc Drip Bags ☕
    "drip-medium-10pcs": true,    // 10pc Drip Bags ☕
    
    // 🌑 Dark Roast Variants
    "whole-dark-250g": true,      // 250g Whole Beans ☕
    "whole-dark-500g": true,      // 500g Whole Beans ☕
    "ground-dark-250g": true,     // 250g Ground Coffee ☕
    "ground-dark-500g": true,     // 500g Ground Coffee ☕
    "drip-dark-5pcs": true,       // 5pc Drip Bags ☕
    "drip-dark-10pcs": true,      // 10pc Drip Bags ☕
    
    // ⚙️ EQUIPMENT VARIANTS - SIZES & MATERIALS
    "moka-aluminum-3cup": true,   // Aluminum 3-Cup Moka ⚙️
    "moka-aluminum-6cup": true,   // Aluminum 6-Cup Moka ⚙️
  "moka-aluminum-9cup": true,  // Aluminum 9-Cup Moka ⚙️
    "moka-steel-2cup": true,      // Steel 2-Cup Moka ⚙️
    "moka-steel-4cup": true,      // Steel 4-Cup Moka ⚙️
  "moka-steel-6cup": true,     // Steel 6-Cup Moka ⚙️
    "fp-350ml": true,             // 350ml French Press ⚙️
  "fp-600ml": true,            // 600ml French Press ⚙️
    "fp-800ml": false,            // 800ml French Press ❌ OUT OF STOCK
    "fp-1000ml": true,            // 1000ml French Press ⚙️
    
    // � MERCHANDISE VARIANTS - COLORS
    "mug-white": true,            // White Mug 🎽
    "mug-black": true,            // Black Mug 🎽
    "tumbler-black": true,        // Black Temperature Display Cup 🎽
    "tumbler-white": true,        // White Temperature Display Cup 🎽
    "tumbler-pink": true,         // Pink Temperature Display Cup 🎽
    "cap-navy": true,             // Navy Cap 🎽
    "cap-black": true,            // Black Cap 🎽
    "cap-khaki": false,           // Khaki Cap ❌ OUT OF STOCK
    
    // ⚫ Black Moka Pot Variants
  "moka-black-3cup": false,     // Black 3-Cup Moka ❌ OUT OF STOCK
  "moka-black-6cup": true,      // Black 6-Cup Moka ⚙️
  "moka-black-9cup": false,     // Black 9-Cup Moka ❌ OUT OF STOCK
    
    // 🔩 Stainless Steel French Press Variants
  "fpss-350ml": true,           // 350ml Steel French Press ⚙️
  "fpss-600ml": true,           // 600ml Steel French Press ⚙️
  "fpss-800ml": true,           // 800ml Steel French Press ⚙️
  "fpss-1000ml": true,          // 1000ml Steel French Press ⚙️
    
    // 🥛 Stainless Steel Frothing Pitcher Variants
  "pitcher-350ml": true,        // 350ml Frothing Pitcher ⚙️
  "pitcher-600ml": true,        // 600ml Frothing Pitcher ⚙️
  "pitcher-1000ml": true,       // 1000ml Frothing Pitcher ⚙️
    
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
//different roast coffee details , combo offers, SEO and home page section

export const products: Product[] = [
  // Light Roast Coffee
  {
    id: 1,
    name: "Whole Coffee Beans - Medium Light Roast",
    price: 899, // Base price for 250g
    description: "High quality single-origin Nepal coffee from Palpa. Our Medium light roast Arabica beans are perfect for pour-over brewing methods. Available in multiple sizes for coffee enthusiasts.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-light-roast",
    featured: true,
    inStock: getProductStock(1),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      processing: "Washed",
      altitude: "1200-1500m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-light-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("whole-light-500g")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 2,
    name: "Drip Coffee Bags",
    price: 1500, // Base price for 10pcs
    description: "Convenient single-serve drip coffee bags featuring Nepal's finest light roast. Perfect for morning brewing anywhere - ideal for office, travel, or home use. High quality instant drip coffee experience.",
    image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
    images: [
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/Drip%20coffee%20image2.webp",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/drip%20coffee%20image3.webp",
      "https://images.pexels.com/photos/4224099/pexels-photo-4224099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-light-roast",
    featured: false,
    inStock: getProductStock(2),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      processing: "Washed",
      altitude: "1200-1500m",
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
        image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
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
    price: 899, // Base price for 250g
    description: "Pre-ground Nepal coffee beans featuring clean, bright light roast from Nepal's renowned coffee growing regions. Ready-to-brew ground coffee for convenience and exceptional flavor.",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-light-roast",
    featured: false,
    inStock: getProductStock(3),
    details: {
      origin: "Palpa",
      roastLevel: "Medium light",
      processing: "Washed",
      altitude: "1200-1500m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-light-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },  // Medium Roast Coffee
  {
    id: 11,
    name: "Whole Coffee Beans - Espresso Blend",
    price: 899, // Base price for 250g
    description: "Our best espresso blend coffee beans combine carefully selected Arabica from Kaski. Perfect for espresso machines and coffee enthusiasts. Available in multiple sizes.",
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-roast",
    featured: true,
    details: {
      origin: "Kaski",
      roastLevel: "Medium Dark",
      processing: "Natural",
      altitude: "1250m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-medium-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 12,
    name: "Ground Coffee - Medium Dark Roast",
    price: 899, // Base price for 250g
    description: "A smooth, complex medium dark roast from the farm of Kaski at an altitude of 1250m. Pre-ground for convenience.",
    image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-roast",
    featured: false,
    inStock: true,
    details: {
      origin: "Kaski",
      roastLevel: "Medium Dark",
      processing: "Washed",
      altitude: "1250m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-medium-250g",
        name: "250g",
        price: 899,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: true
      },
      {
        id: "ground-medium-500g",
        name: "500g",
        price: 1560,
        image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 13,
    name: "Drip Coffee Bags",
    price: 1849, // Base price for 10pcs
    description: "Certified organic coffee with a balanced profile featuring notes. Convenient single-serve drip bags. Perfect for home, office, or travel.",
    image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
    images: [
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/Drip%20coffee%20image2.webp",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/drip%20coffee%20image3.webp",
      "https://images.pexels.com/photos/2602537/pexels-photo-2602537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "medium-roast",
    featured: false,
    details: {
      origin: "Kaski",
      roastLevel: "Medium Dark",
      processing: "Washed",
      altitude: "1200-1800m",
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
        image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
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
    price: 899, // Base price for 250g
    description: "A bold, earthy dark roast with low acidity and notes of cedar, spice, and dark chocolate. Available in multiple sizes.",
    image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "dark-roast",
    featured: true,
    inStock: true,
    details: {
      origin: "Sumatra",
      roastLevel: "Dark",
      processing: "Wet Hulled",
      altitude: "900-1500m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-dark-250g",
        name: "250g",
        price: 899,
        image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "250g",
          volume: "12-15 cups"
        },
        inStock: true
      },
      {
        id: "whole-dark-500g",
        name: "500g",
        price: 1560,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: true
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 22,
    name: "Ground Coffee - French Roast",
    price: 899, // Base price for 250g
    description: "A bold, intense dark roast with smoky notes and rich body. Perfect for those who love strong coffee. Pre-ground for convenience.",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "dark-roast",
    featured: false,
    details: {
      origin: "Sindhupalchok",
      roastLevel: "Dark",
      processing: "Washed",
      altitude: "1200-2000m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-dark-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
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
    image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
    images: [
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/Drip%20coffee%20image2.webp",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/drip%20coffee%20image3.webp",
      "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "dark-roast",
    featured: false,
    details: {
      origin: "Sindhupalchok",
      roastLevel: "Dark",
      processing: "Washed",
      altitude: "1200-2000m",
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
    price: 899, // Base price for 250g
    description: "High quality single-origin Nepal coffee with delicate, bright flavors. Our pure light roast preserves the coffee's origin characteristics with minimal roasting for maximum brightness. Good for pour-over and filter brewing methods.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "light-roast",
    featured: true,
    inStock: getProductStock(31),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      processing: "Washed",
      altitude: "1200-1500m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "whole-pure-light-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("whole-pure-light-500g")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 32,
    name: "Drip Coffee Bags - Light Roast",
    price: 1399, // Base price for 10pcs
    description: "Convenient single-serve drip coffee bags featuring Nepal's purest light roast. Perfect for those who appreciate subtle, nuanced coffee flavors. Ideal for office, travel, or home brewing.",
    image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
    images: [
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/Drip%20coffee%20image2.webp",
      "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/drip%20coffee%20image3.webp",
      "https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "light-roast",
    featured: false,
    inStock: getProductStock(32),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      processing: "Washed",
      altitude: "1200-1500m",
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
        image: "https://gdtlqgnisicagjkadlca.supabase.co/storage/v1/object/public/Products/dripcoffeeimagecompress.jpg",
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
    price: 899, // Base price for 250g
    description: "Pre-ground Nepal coffee beans featuring delicate light roast with bright acidity and floral characteristics. Our lightest roast level preserves the coffee's natural brightness and origin flavors. Ready-to-brew ground coffee for filter and pour-over methods.",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    images: [
      "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "light-roast",
    featured: false,
    inStock: getProductStock(33),
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      processing: "Washed",
      altitude: "1200-1500m",
      weight: "Varies by size"
    },
    variants: [
      {
        id: "ground-pure-light-250g",
        name: "250g",
        price: 899,
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
        price: 1560,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "500g",
          volume: "25-30 cups"
        },
        inStock: getVariantStock("ground-pure-light-500g")
      }
    ],
    // promoCodes removed for global promo
  },

  // Coffee Equipment
  {
    id: 111,
    name: "Black Moka Pot",
    price: 1199, // Base price for black 3-cup
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
        price: 1199,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-black-3cup")
      },
      {
        id: "moka-black-6cup",
        name: "Black 6-Cup",
        price: 1799,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-black-6cup")
      },
      {
        id: "moka-black-9cup",
        name: "Black 9-Cup",
        price: 1999,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-black-9cup")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 101,
    name: "Classic Moka Pot",
    price: 1299, // Base price for aluminum 3-cup 1199
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
        price: 1299,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: '-'
        },
        inStock: getVariantStock("moka-aluminum-3cup")
      },
      {
        id: "moka-aluminum-6cup",
        name: "Aluminum 6-Cup",
        price: 1499,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-aluminum-6cup")
      },
      {
        id: "moka-aluminum-9cup",
        name: "Aluminum 9-Cup",
        price: 1799,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-aluminum-9cup")
      },
      {
        id: "moka-steel-2cup",
        name: "Steel 2-Cup",
        price: 1099,
        image: "https://images.pexels.com/photos/4226801/pexels-photo-4226801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-steel-2cup")
      },
      {
        id: "moka-steel-4cup",
        name: "Steel 4-Cup",
        price: 1399,
        image: "https://images.pexels.com/photos/4226802/pexels-photo-4226802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-steel-4cup")
      },
      {
        id: "moka-steel-6cup",
        name: "Steel 6-Cup",
        price: 1499,
        image: "https://images.pexels.com/photos/4226803/pexels-photo-4226803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "-",
          weight: "-"
        },
        inStock: getVariantStock("moka-steel-6cup")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 102,
    name: "French Press Coffee Maker",
    price: 999, // Base price for 350ml
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
        price: 999,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "350ml",
          weight: "650g"
        },
        inStock: getVariantStock("fp-350ml")
      },
      {
        id: "fp-600ml",
        name: "600ml",
        price: 1199,
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "600ml",
          weight: "750g"
        },
        inStock: getVariantStock("fp-600ml")
      },
      {
        id: "fp-800ml",
        name: "800ml",
        price: 1399,
        image: "https://images.pexels.com/photos/4226838/pexels-photo-4226838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "800ml",
          weight: "850g"
        },
        inStock: getVariantStock("fp-800ml")
      },
      {
        id: "fp-1000ml",
        name: "1000ml",
        price: 1499,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "1000ml",
          weight: "950g"
        },
        inStock: getVariantStock("fp-1000ml")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 112,
    name: "Stainless Steel French Press",
    price: 1299, // Base price for 350ml steel 
    description: "Premium stainless steel French press with superior heat retention and durability. Features professional-grade mesh filter and quality handle. Perfect for camping, office, or home use with unbreakable construction. The body wall is a borosillicate glass core wrapped in stainless steel for the best of both worlds.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    inStock: getProductStock(112),
    label: PRODUCT_LABELS.PREMIUM,
    details: {
      material: "Stainless Steel and Borosillicate Glass",
      capacity: "Multiple sizes",
      features: ["Borosillicate glass body", "Better Look", "Premium Filter"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "fpss-350ml",
        name: "350ml Steel",
        price: 1299,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "350ml",
          weight: "750g"
        },
        inStock: getVariantStock("fpss-350ml")
      },
      {
        id: "fpss-600ml",
        name: "600ml Steel",
        price: 1499,
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "600ml",
          weight: "850g"
        },
        inStock: getVariantStock("fpss-600ml")
      },
      {
        id: "fpss-800ml",
        name: "800ml Steel",
        price: 1599,
        image: "https://images.pexels.com/photos/4226838/pexels-photo-4226838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "800ml",
          weight: "950g"
        },
        inStock: getVariantStock("fpss-800ml")
      },
      {
        id: "fpss-1000ml",
        name: "1000ml Steel",
        price: 1699,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "1000ml",
          weight: "1050g"
        },
        inStock: getVariantStock("fpss-1000ml")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 103,
    name: "Professional Filtercone Pour Over Dripper",
    price: 1300,
    description: "Professional AS resin filtercone with eco-friendly design for 2-4 servings. Features curved swirl design to improve coffee flow and prevent water stagnation in coffee bed. Large opening in base maintains proper flow rate. Produces clean cupping coffee without over-extraction bitterness. Widely used by coffee professionals and aficionados. Box includes: 1x Filtercone, 1x Scoop Spoon & 1x Reusable Cotton Filter.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    inStock: getProductStock(103),
    label: PRODUCT_LABELS.NEW_ARRIVAL,
    details: {
      material: "AS Resin",
      capacity: "2-4 Servings",
      features: ["Eco-Friendly", "Curved Swirl Design", "Includes Scoop Spoon", "Reusable Cotton Filter"],
      weight: "320g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 104,
    name: "V60 Coffee Server",
    price: 1799,
    description: "500ml heat-proof glass server designed specifically for V60 Coffee Drippers. Features tapered design that keeps coffee warm longer by reducing surface area and makes pouring more spill-proof. Comes with glass lid and silicone seal - the lid doubles as a dripper stand. Made from heat-resistant glass that's microwaveable and easy to clean. Perfect 4-cup size with flexibility to work with other V60 products.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    inStock: getProductStock(104),
    details: {
      material: "Heat-Resistant Glass",
      capacity: "500ml (4-Cup)",
      features: ["Glass Lid & Silicone Seal", "Tapered Design", "Spill-Proof"],
      weight: "350g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 105,
    name: "Ceramic Burr Hand Coffee Grinder",
    price: 3699,
    description: "Premium ceramic burr hand grinder that preserves pure coffee flavor without heat or rust. Adjustable settings for all brewing methods - Pour-over, French press, Espresso. Features stainless steel hand crank, detachable glass container, and super quiet operation. Perfect for home and travel with silicone lid and rubber base. Includes exquisite coffee spoon as free gift.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      material: "Ceramic Burr + Stainless Steel",
      capacity: "30g Bean Capacity",
      features: ["Adjustable Grind Settings", "Super Quiet Mode", "Detachable Glass Container", "Includes Coffee Spoon"],
      weight: "-"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 106,
    name: "AeroPress Coffee ",
    price: 4499,
    description: "Fast and convenient AeroPress makes one of the best cups of coffee you'll ever taste. Uses ideal water temperature (175°F) and gentle air pressure for rich flavor with lower acidity and no bitterness. Makes 1-4 cups in just 1 minute (20 seconds press time). Features micro-filter for grit-free coffee and total immersion brewing for uniform extraction. Perfect for espresso, Americano, or full cafe brewing.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "BPA-Free Plastic",
      capacity: "1-4 Cups (1-2 Mugs)",
      features: ["MicroFilter Technology", "20s Press Time"],
      weight: "-"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 108,
    name: "Digital Coffee Scale with Timer",
    price: 2799,
    description: "High-precision digital coffee scale with built-in cooking timer and green backlight LCD display. Features 0.1g accuracy with 3000g capacity, multiple units (g/oz/lb/ml), and silicone mat for stability. Includes tare function, auto power-off, and low battery indicator. Essential tool for perfect coffee-to-water ratios and consistent brewing results.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "ABS Design with Silicone Mat",
      capacity: "3000g (107oz)",
      features: ["Cooking Timer", "Multiple Units", "Tare Function"],
      weight: "-"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 113,
    name: "Electric Handheld Milk Frother",
    price: 750,
    description: "Simple 1-hand operation electric milk frother with results in 20-30 seconds. Creates cafe-quality froth for milk, coffee, and cappuccinos. Features stainless steel stirrer with plastic handle in black matte finish. Electronic mini blender perfect for mixing, egg beating, and frothing. Note: Designed for frothing and mixing only, not for vegetable pulping or chopping.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Stainless Steel Stirrer + Plastic Handle",
      capacity: "Handheld Design",
      features: [ "1-Hand Operation", "Cafe Quality Froth"],
      weight: "100g"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 114,
    name: "Stainless Steel Frothing Pitcher",
    price: 2499, // Base price for 350ml
    description: "Professional stainless steel frothing pitcher designed for creating creamy espresso drinks, lattes, cappuccinos, and mochas. Made of pure stainless steel that resists corrosion with sturdy handle for easy pouring and gripping. Features molded spout for even milk stream pouring. Can be chilled before frothing for optimal results.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    inStock: getProductStock(114),
    details: {
      material: "Pure Stainless Steel",
      capacity: "Multiple Sizes",
      features: ["Corrosion Resistant", "Molded Spout", "Chillable Design", "Sturdy Handle"],
      weight: "Varies by size"
    },
    variants: [
      {
        id: "pitcher-350ml",
        name: "350ml",
        price: 1699,
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "350ml",
          weight: "300g"
        },
        inStock: getVariantStock("pitcher-350ml")
      },
      {
        id: "pitcher-600ml",
        name: "600ml",
        price: 2099,
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "600ml",
          weight: "450g"
        },
        inStock: getVariantStock("pitcher-600ml")
      },
      {
        id: "pitcher-1000ml",
        name: "1000ml",
        price: 2499,
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          volume: "1000ml",
          weight: "650g"
        },
        inStock: getVariantStock("pitcher-1000ml")
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 115,
    name: "V60 Coffee Filter (2-4 cups)",
    price: 499,
    description: "Premium cone-shaped paper filters specifically designed for V60 pour-over brewing for 2-4 cups. Pack of 40 high-quality filters in 1 set for consistent extraction and clean cup profiles. Perfect fit for V60 drippers and optimal water flow.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      material: "Paper",
      capacity: "2-4 cups",
      features: ["Cone Shape", "40 pcs per set", "Clean Extraction"],
      weight: "-"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 116,
    name: "Drip Coffee Maker Machine",
    price: 7999,
    description: "Easy-to-use automatic coffee maker that brews perfect coffee at the touch of a button. Simply add water and coffee grounds, press start, and enjoy fresh coffee in minutes. Features anti-drip function to prevent messy spills, programmable timer for wake-up coffee, and durable construction with stainless steel, plastic, and glass components. Perfect for busy mornings and office use.",
    image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    inStock: getProductStock(116),
    details: {
      material: "Stainless Steel/Plastic/Glass",
      capacity: "10-12 Cups",
      features: ["Programmable Timer", "800W Power", "Easy Operation"],
      weight: "-"
    },
    variants: [],
    // promoCodes removed for global promo
  },
  {
    id: 117,
    name: "Gooseneck Kettle with Thermometer",
    price: 4999,
    description: "Premium stainless steel gooseneck kettle with built-in thermometer for precise temperature control. The gooseneck spout provides perfect control for pouring hot water or coffee with slow, precise flow to extract maximum flavor. Features ergonomic handle for comfortable use and high-quality polished finish that's anti-rust and durable. Safe for all stove types including gas, electric, and induction.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    inStock: getProductStock(117),
    details: {
      material: "High Quality Stainless Steel",
      capacity: "Large Capacity",
      features: ["Built-in Thermometer", "Gooseneck Spout", "All Stove Compatible"],
      weight: "800g"
    },
    variants: [],
    // promoCodes removed for global promo
  },

  // Merchandise
  {
    id: 201,
    name: "Alpico Coffee Mug ",
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
    name: "Temperature Display Alpico Coffee Cup",
    price: 1299, // Discounted price
    originalPrice: 1599, // Original price to show discount
    description: "Smart temperature display coffee cup with 380ml capacity. Made of 304 food grade stainless steel with excellent heat preservation. Features larger caliber for easy cleaning, lightweight portable design, and water-tight sealing technology.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    label: PRODUCT_LABELS.SALE,
    details: {
      material: "304 Food Grade Stainless Steel",
      capacity: "380ml",
      features: ["Temperature Display", "Large Cup Mouth", "Lightweight & Portable", "Water Tight Seal"],
      weight: "350g"
    },
    variants: [
      {
        id: "tumbler-black",
        name: "Black",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "350g",
          volume: "380ml"
        },
        inStock: getVariantStock("tumbler-black")
      },
      {
        id: "tumbler-white",
        name: "White",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "350g",
          volume: "380ml"
        },
        inStock: getVariantStock("tumbler-white")
      },
      {
        id: "tumbler-pink",
        name: "Pink",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "350g",
          volume: "380ml"
        },
        inStock: getVariantStock("tumbler-pink")
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
  {
    id: 211,
    name: "Alpico Coffee T-Shirt",
    price: 1299,
    description: "Premium quality cotton t-shirt with stylish Alpico Coffee logo in classic black. Comfortable fit and durable print. Available in multiple sizes. Perfect for coffee enthusiasts.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    inStock: getProductStock(211),
    details: {
      material: "100% Cotton",
      capacity: "Multiple Sizes",
      features: ["Premium Quality", "Durable Print", "Comfortable Fit"],
      weight: "200g"
    },
    variants: [
      {
        id: "tshirt-black-s",
        name: "Black - Small",
        price: 1299,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "200g",
          volume: "Small"
        },
        inStock: false
      },
      {
        id: "tshirt-black-m",
        name: "Black - Medium",
        price: 1299,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "200g",
          volume: "Medium"
        },
        inStock: false
      },
      {
        id: "tshirt-black-l",
        name: "Black - Large",
        price: 1299,
        image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: {
          weight: "200g",
          volume: "Large"
        },
        inStock: false
      }
    ],
    // promoCodes removed for global promo
  },
  {
    id: 212,
    name: "Alpico Coffee Keychain",
    price: 299,
    description: "Metal keychain with elegant Alpico Coffee logo design. Durable and stylish accessory for coffee lovers. Perfect gift item or personal accessory.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      material: "Metal",
      capacity: "Single Item",
      features: ["Durable Design", "Logo Design", "Compact Size"],
      weight: "15g"
    },
    variants: [],
    // promoCodes removed for global promo
  },

  // 🎁 COMBO OFFERS - Special Bundle Deals
  {
    id: 301,
    name: "French Press + Coffee Combo",
    price: 4200, // Discounted combo price
    description: "Perfect coffee brewing starter kit! Includes our premium French Press Coffee Maker paired with 250g of your choice coffee. Everything you need for the perfect coffee experience at home. Save NPR 350 compared to buying separately!",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(301),
    label: PRODUCT_LABELS.HOT_DEAL,
    details: {
      material: "Bundle",
      capacity: "Complete Kit",
      features: ["French Press Included", "250g Ground Coffee", "Perfect for Beginners"],
      weight: "French Press + 250g Coffee"
    },
    // Add placeholder variants so the customer chooses French Press size at checkout
    variants: [
      {
        id: "combo301-fp-350ml",
        name: "French Press 350ml",
        price: 4200,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "350ml" },
        inStock: getVariantStock("fp-350ml")
      },
      {
        id: "combo301-fp-600ml",
        name: "French Press 600ml",
        price: 4399,
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "600ml" },
        inStock: getVariantStock("fp-600ml")
      },
      {
        id: "combo301-fp-1000ml",
        name: "French Press 1000ml",
        price: 4599,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "1000ml" },
        inStock: getVariantStock("fp-1000ml")
      }
    ]
  },
  {
    id: 302,
    name: "Coffee + Free Alpico Mug",
    price: 1899, // Same as coffee price, mug is free
    description: "Get our signature Alpico Coffee Mug absolutely FREE with 500g coffee purchase! Choose from our premium light, medium, or dark roast coffee and receive our beautiful ceramic mug as a complimentary gift. Limited time offer!",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(302),
    label: PRODUCT_LABELS.LIMITED_EDITION,
    details: {
      material: "Bundle",
      capacity: "Free Mug Included",
      features: ["500g Premium Coffee", "Free Ceramic Mug", "Perfect Gift Set"],
      weight: "500g Coffee + Mug"
    },
    variants: [
      {
        id: "combo-light-mug",
        name: "Light Roast + Free Mug",
        price: 1899,
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
        price: 1899,
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
        price: 1899,
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
    id: 306,
    name: "Moka Pot + Coffee Combo",
    price: 1900, // Discounted combo price
    description: "Authentic Italian coffee experience! Includes our premium stainless steel Moka Pot (compatible with induction cooktops) with 250g of specially selected medium roast ground coffee perfect for moka brewing. The durable stainless steel construction ensures even heat distribution and works on all stovetops including gas, electric, and induction. Experience the rich, bold flavor of traditional Italian coffee at home. Save NPR 200!",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(306),
    label: PRODUCT_LABELS.HOT_DEAL,
    details: {
      material: "Bundle",
      capacity: "Italian Style",
      features: ["Stainless Steel Moka Pot", "Induction Compatible", "250g Ground Coffee", "Authentic Italian Experience"],
      weight: "Moka Pot + 250g Coffee"
    },
    // Add placeholder variants so the customer chooses Moka Pot size at checkout
    variants: [
      {
        id: "combo306-moka-3cup",
        name: "Moka Pot 3-Cup",
        price: 1900,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "3-Cup" },
        inStock: getVariantStock("moka-aluminum-3cup")
      },
      {
        id: "combo306-moka-6cup",
        name: "Moka Pot 6-Cup",
        price: 2100,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "6-Cup" },
        inStock: getVariantStock("moka-aluminum-6cup")
      },
      {
        id: "combo306-moka-9cup",
        name: "Moka Pot 9-Cup",
        price: 2300,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "9-Cup" },
        inStock: getVariantStock("moka-aluminum-9cup")
      }
    ]
  },
  {
    id: 304,
    name: "Pour Over Coffee Bundle",
    price: 12500, // Comprehensive bundle price
    description: "Complete pour over coffee mastery kit! Includes precision V60 Dripper, burr hand grinder, digital scale with timer, glass server, coffee filters, and Alpico mug. Everything you need for perfect pour over brewing with 250g specially selected light roast coffee.",
    image: "https://images.pexels.com/photos/4226903/pexels-photo-4226903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(304),
    details: {
      material: "Complete Bundle",
      capacity: "Professional Pour Over Setup",
      features: ["V60 Dripper", "Burr Grinder", "Digital Scale", "Glass Server", "Filters", "Alpico Mug", "250g Coffee"],
      weight: "Complete Pour Over Kit + 250g Coffee"
    },
    variants: []
  },
  {
    id: 305,
    name: "Coffee Lover's Premium Pack",
    price: 4599, // Premium bundle with significant savings
    description: "The ultimate coffee experience! Includes Burr Coffee Grinder,French Press + Mocha pot , 1kg whole beans, Alpico mug, travel tumbler. Everything you need for cafe-quality coffee at home. Save NPR 800!",
    image: "https://images.pexels.com/photos/4226856/pexels-photo-4226856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "combo-offers",
    featured: true,
    inStock: getProductStock(305),
    label: PRODUCT_LABELS.PREMIUM,
    details: {
      material: "Bundle",
      capacity: "Professional Grade",
      features: ["Burr Grinder", "French Press + Mocha Pot", "Whole Bean Coffee, Mug & Tumbler"],
      weight: "Full Kit + 1kg Coffee"
    },
    // Add variant selections so user can choose sizes for included French Press & Moka Pot
    variants: [
      {
        id: "bundle-fp-350ml",
        name: "French Press 350ml",
        price: 4599,
        image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "350ml" },
        inStock: getVariantStock("fp-350ml")
      },
      {
        id: "bundle-fp-600ml",
        name: "French Press 600ml",
        price: 4799, // small incremental adjustment for larger size
        image: "https://images.pexels.com/photos/4226855/pexels-photo-4226855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "600ml" },
        inStock: getVariantStock("fp-600ml")
      },
      {
        id: "bundle-fp-1000ml",
        name: "French Press 1000ml",
        price: 4999,
        image: "https://images.pexels.com/photos/4226812/pexels-photo-4226812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "1000ml" },
        inStock: getVariantStock("fp-1000ml")
      },
      {
        id: "bundle-moka-3cup",
        name: "Moka Pot 3-Cup",
        price: 4599,
        image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "3-Cup" },
        inStock: getVariantStock("moka-aluminum-3cup")
      },
      {
        id: "bundle-moka-6cup",
        name: "Moka Pot 6-Cup",
        price: 4799,
        image: "https://images.pexels.com/photos/4226798/pexels-photo-4226798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "6-Cup" },
        inStock: getVariantStock("moka-aluminum-6cup")
      },
      {
        id: "bundle-moka-9cup",
        name: "Moka Pot 9-Cup",
        price: 4999,
        image: "https://images.pexels.com/photos/4226799/pexels-photo-4226799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        details: { weight: "Bundle", volume: "9-Cup" },
        inStock: getVariantStock("moka-aluminum-9cup")
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
      material: "Bundle",
      capacity: "Everything Included",
      features: ["Pour Over Dripper", "1kg Coffee Beans", "Mug & Filters"],
      weight: "Complete Kit"
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