import { Product } from '../types';


export const products: Product[] = [
  // Light Roast Coffee
  {
    id: 1,
    name: "French Press Light Roast",
    price: 1799,
    description: "A bright, complex single-origin coffee with floral aromatics and vibrant citrus notes. Perfect for pour-over brewing.",
    image: "https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: true,
    inStock: true,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Jasmine", "Lemon", "Bergamot"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 2,
    name: "Mocha pot Light Roast",
    price: 1499,
    description: "A bright, crisp light roast perfect for morning brewing with notes of citrus and honey.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: false,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Citrus", "Honey", "Green Apple"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 3,
    name: "Filter Light Roast",
    price: 1999,
    description: "A clean, bright light roast with notes of orange, vanilla, and honey from the renowned Tarrazu region.",
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "light-roast",
    featured: false,
    details: {
      origin: "Palpa",
      roastLevel: "Light",
      flavorNotes: ["Orange", "Vanilla", "Honey"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },

  // Medium Roast Coffee
  {
    id: 11,
    name: "Signature Espresso Blend Medium",
    price: 1799,
    description: "Our flagship espresso blend combines beans from Ethiopia and Colombia for a rich, balanced flavor with notes of chocolate and berry.",
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: true,
    details: {
      origin: "Ethiopia, Colombia",
      roastLevel: "Medium",
      flavorNotes: ["Chocolate", "Berry", "Caramel"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 12,
    name: "Guatemala Antigua Medium",
    price: 1899,
    description: "A smooth, complex medium roast with notes of chocolate, spice, and subtle fruit from the volcanic soils of Antigua.",
    image: "https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: false,
    inStock: false,
    details: {
      origin: "Guatemala",
      roastLevel: "Medium",
      flavorNotes: ["Chocolate", "Spice", "Apple"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 13,
    name: "Organic Peru Medium",
    price: 1849,
    description: "Certified organic coffee with a balanced profile featuring notes of caramel, almond, and citrus.",
    image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "medium-roast",
    featured: false,
    details: {
      origin: "Peru",
      roastLevel: "Medium",
      flavorNotes: ["Caramel", "Almond", "Citrus"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },

  // Dark Roast Coffee
  {
    id: 21,
    name: "Dark Roast Sumatra",
    price: 1849,
    description: "A bold, earthy dark roast with low acidity and notes of cedar, spice, and dark chocolate.",
    image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: true,
    inStock: false,
    details: {
      origin: "Sumatra",
      roastLevel: "Dark",
      flavorNotes: ["Cedar", "Dark Chocolate", "Spice"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 22,
    name: "French Roast Dark",
    price: 1649,
    description: "A bold, intense dark roast with smoky notes and rich body. Perfect for those who love strong coffee.",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: false,
    details: {
      origin: "French Roast Blend",
      roastLevel: "Dark",
      flavorNotes: ["Smoky", "Bold", "Rich Body"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 23,
    name: "Italian Roast Dark",
    price: 1699,
    description: "Traditional Italian-style dark roast with intense flavor and oily surface. Perfect for espresso.",
    image: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "dark-roast",
    featured: false,
    details: {
      origin: "Italian Roast Blend",
      roastLevel: "Dark",
      flavorNotes: ["Intense", "Oily", "Espresso Perfect"],
      weight: "250g"
    },
    // promoCodes removed for global promo
  },

  // Coffee Equipment
  {
    id: 101,
    name: "Classic Italian Moka Pot",
    price: 3599,
    description: "Traditional aluminum moka pot for authentic Italian-style espresso at home. Brews rich, concentrated coffee with distinctive flavor.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      origin: "Made in Italy",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Aluminum Construction", "6-Cup Capacity", "Stovetop Compatible"],
      weight: "550g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 102,
    name: "French Press Coffee Maker",
    price: 4399,
    description: "Premium borosilicate glass French press with stainless steel filter. Perfect for full-bodied, rich coffee extraction.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Heat Resistant", "1L Capacity", "Stainless Steel Filter"],
      weight: "950g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 103,
    name: "Pour Over V60 Dripper",
    price: 2999,
    description: "Ceramic V60 dripper with spiral ridges for optimal water flow and extraction. Includes 40 paper filters.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Ceramic Construction",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Spiral Ridges", "Size 02", "Includes 40 Filters"],
      weight: "360g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 104,
    name: "Gooseneck Kettle",
    price: 9199,
    description: "Precision pour kettle with temperature control and gooseneck spout for perfect pour-over brewing.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Stainless Steel",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Temperature Control", "1L Capacity", "Electric"],
      weight: "1.45kg"
    },
    // promoCodes removed for global promo
  },
  {
    id: 105,
    name: "Burr Coffee Grinder",
    price: 15399,
    description: "Conical burr grinder with 40 grind settings for consistent particle size. Essential for perfect coffee extraction.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: true,
    details: {
      origin: "Conical Burr",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["40 Grind Settings", "250g Bean Hopper", "Timer Function"],
      weight: "3.85kg"
    },
    // promoCodes removed for global promo
  },
  {
    id: 106,
    name: "AeroPress Coffee Maker",
    price: 4099,
    description: "Innovative brewing device that combines immersion and pressure for smooth, rich coffee in under a minute.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "BPA-Free Plastic",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["Includes 350 Filters", "Travel Friendly", "1-4 Cup Capacity"],
      weight: "500g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 107,
    name: "Chemex Classic Coffee Maker",
    price: 5599,
    description: "Iconic hourglass-shaped pour-over brewer made from borosilicate glass. Produces clean, bright coffee.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["6-Cup Capacity", "Wood Collar", "Leather Tie"],
      weight: "815g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 108,
    name: "Digital Coffee Scale",
    price: 3399,
    description: "Precision scale with timer function for accurate coffee-to-water ratios. Essential for consistent brewing.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Digital Display",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["0.1g Precision", "Built-in Timer", "Auto-off Function"],
      weight: "1kg"
    },
    // promoCodes removed for global promo
  },
  {
    id: 109,
    name: "Cold Brew Coffee Maker",
    price: 4699,
    description: "Large capacity cold brew maker with fine mesh filter. Perfect for smooth, low-acid cold coffee concentrate.",
    image: "https://images.pexels.com/photos/4226924/pexels-photo-4226924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Borosilicate Glass",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["2L Capacity", "Fine Mesh Filter", "Airtight Lid"],
      weight: "1.27kg"
    },
    // promoCodes removed for global promo
  },
  {
    id: 110,
    name: "Espresso Tamper",
    price: 2599,
    description: "Professional-grade stainless steel tamper with ergonomic handle. Essential for proper espresso extraction.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "equipment",
    featured: false,
    details: {
      origin: "Stainless Steel",
      roastLevel: "Brewing Equipment",
      flavorNotes: ["58mm Base", "Ergonomic Handle", "Professional Grade"],
      weight: "450g"
    },
    // promoCodes removed for global promo
  },

  // Merchandise
  {
    id: 201,
    name: "Alpico Coffee Mug - Classic White",
    price: 1149,
    description: "Premium ceramic coffee mug with the Alpico logo. Perfect for your daily coffee ritual. Dishwasher and microwave safe.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    details: {
      origin: "Ceramic",
      roastLevel: "Merchandise",
      flavorNotes: ["350ml Capacity", "Dishwasher Safe", "Microwave Safe"],
      weight: "320g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 202,
    name: "Alpico Travel Tumbler",
    price: 2049,
    description: "Insulated stainless steel travel tumbler with Alpico branding. Keeps coffee hot for 6 hours and cold for 12 hours.",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    details: {
      origin: "Stainless Steel",
      roastLevel: "Merchandise",
      flavorNotes: ["500ml Capacity", "Double Wall Insulated", "Leak Proof Lid"],
      weight: "450g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 203,
    name: "Alpico Coffee T-Shirt",
    price: 1669,
    description: "Comfortable 100% cotton t-shirt with vintage Alpico Coffee logo. Available in navy blue with white print.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "100% Cotton",
      roastLevel: "Merchandise",
      flavorNotes: ["Vintage Logo", "Navy Blue", "Sizes S-XXL"],
      weight: "180g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 204,
    name: "Alpico Canvas Tote Bag",
    price: 1029,
    description: "Eco-friendly canvas tote bag with Alpico Coffee branding. Perfect for carrying your coffee beans and daily essentials.",
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Canvas Cotton",
      roastLevel: "Merchandise",
      flavorNotes: ["Eco-Friendly", "40cm x 35cm", "Strong Handles"],
      weight: "150g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 205,
    name: "Alpico Coffee Hoodie",
    price: 3199,
    description: "Cozy fleece hoodie with embroidered Alpico logo. Perfect for chilly mornings with your favorite coffee.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: true,
    details: {
      origin: "Cotton Blend",
      roastLevel: "Merchandise",
      flavorNotes: ["Embroidered Logo", "Kangaroo Pocket", "Sizes S-XXL"],
      weight: "650g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 206,
    name: "Alpico Coffee Beans Keychain",
    price: 519,
    description: "Cute coffee bean-shaped keychain made from sustainable wood with laser-engraved Alpico logo.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Sustainable Wood",
      roastLevel: "Merchandise",
      flavorNotes: ["Laser Engraved", "Coffee Bean Shape", "Metal Ring"],
      weight: "15g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 207,
    name: "Alpico Coffee Coasters Set",
    price: 899,
    description: "Set of 4 cork coasters with Alpico Coffee designs. Protects your furniture while showcasing your coffee love.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Natural Cork",
      roastLevel: "Merchandise",
      flavorNotes: ["Set of 4", "Water Resistant", "10cm Diameter"],
      weight: "120g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 208,
    name: "Alpico Coffee Cap",
    price: 1279,
    description: "Adjustable baseball cap with embroidered Alpico Coffee logo. Perfect for coffee runs and casual wear.",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Cotton Twill",
      roastLevel: "Merchandise",
      flavorNotes: ["Adjustable Strap", "Embroidered Logo", "One Size Fits All"],
      weight: "85g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 209,
    name: "Alpico Coffee Notebook",
    price: 769,
    description: "Premium lined notebook with Alpico Coffee branding. Perfect for coffee tasting notes and daily journaling.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Recycled Paper",
      roastLevel: "Merchandise",
      flavorNotes: ["80 Pages", "A5 Size", "Elastic Band"],
      weight: "200g"
    },
    // promoCodes removed for global promo
  },
  {
    id: 210,
    name: "Alpico Coffee Stickers Pack",
    price: 389,
    description: "Pack of 10 waterproof vinyl stickers featuring various Alpico Coffee designs. Perfect for laptops, water bottles, and more.",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "merch",
    featured: false,
    details: {
      origin: "Vinyl Material",
      roastLevel: "Merchandise",
      flavorNotes: ["Pack of 10", "Waterproof", "Various Designs"],
      weight: "25g"
    },
    // promoCodes removed for global promo
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'light-roast', name: 'Light Roast' },
  { id: 'medium-roast', name: 'Medium Roast' },
  { id: 'dark-roast', name: 'Dark Roast' },
  { id: 'equipment', name: 'Equipment' },
  { id: 'merch', name: 'Merchandise' },
];