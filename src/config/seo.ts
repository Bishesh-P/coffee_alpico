// SEO Configuration - Easy to modify for deployment
export const seoConfig = {
  // Site-wide defaults
  site: {
    name: "Alpico Coffee",
    description: "Premium mountain-grown coffee beans, expertly roasted and sustainably sourced. Discover exceptional coffee from alpine regions worldwide.",
    url: "https://alpico.coffee", 
    logo: "https://alpico.coffee/logo.png", 
    image: "https://alpico.coffee/og-image.jpg", 
    twitterHandle: "@alpico_coffee", 
    language: "en",
    locale: "en_US",
    type: "website"
  },

  // Business information
  business: {
    name: "Alpico Coffee",
    type: "Store",
    address: {
      street: "Madhyapur Thimi",
      city: "Bhaktapur",
      state: "Bagmati",
      postalCode: "44800",
      country: "Nepal"
    },
    phone: "+977-9869-062-187",
    email: "alpicocoffeecompany@gmail.com",
    hours: "Mo-Fr 08:00-18:00"
  },

  // Page-specific SEO data
  pages: {
    home: {
      title: "Premium Arabica Coffee | Alpico Coffee",
      description: "Discover exceptional mountain-grown coffee beans, expertly roasted and sustainably sourced from alpine regions worldwide. Shop premium coffee online.",
      keywords: "Nepali premium coffee, Arabica coffee, Nepal coffee, specialty coffee, coffee beans, alpico coffee"
    },
    products: {
      title: "Premium Coffee & Equipment | Alpico Coffee",
      description: "Browse our collection of premium coffee beans and professional brewing equipment. From light to dark roasts, find your perfect coffee.",
      keywords: "coffee beans, best coffee in nepal, light roast, medium roast, dark roast, brewing equipment, alpico coffee, nepali coffee"
    },
    about: {
      title: "Our Story | Alpico Coffee - Best Coffee in Nepal",
      description: "Learn about Alpico Coffee's journey from a small Portland roastery to a sustainable coffee company sourcing the finest alpine beans.",
      keywords: "coffee story, sustainable coffee, coffee roastery, Nepal coffee, coffee sourcing in Nepal, coffee farmers"
    },
    contact: {
      title: "Contact Us | Alpico Coffee - Get in Touch",
      description: "Contact Alpico Coffee for questions, wholesale inquiries, or feedback. We are here to help you with all your coffee needs.",
      keywords: "coffee roaster in Nepal, wholesale coffee in Nepal, coffee questions, coffee in Nepal"
    },
    blog: {
      title: "Coffee Blog | Brewing Tips & Stories | Alpico Coffee",
      description: "Discover coffee brewing techniques, origin stories, and insights from the world of specialty coffee. Learn from our coffee experts.",
      keywords: "coffee blog, brewing tips, coffee techniques, coffee origins in Nepal, specialty coffee education"
    }
  },

  // Product categories for dynamic SEO
  productCategories: {
    "light-roast": {
      title: "Light Roast Coffee Beans | Bright & Floral | Alpico Coffee",
      description: "Explore our selection of light roast coffee beans with bright, floral notes and vibrant acidity. Perfect for pour-over brewing.",
      keywords: "light roast coffee, alpico coffee, light roast coffee in nepal, pour over coffee"
    },
    "medium-roast": {
      title: "Medium Roast Coffee | Balanced & Smooth | Alpico Coffee",
      description: "Discover our medium roast coffee collection from alpico coffee featuring balanced flavors with notes of chocolate, caramel, and fruit.",
      keywords: "medium roast coffee, alpico coffee, medium roast coffee in nepal, espresso beans"
    },
    "dark-roast": {
      title: "Dark Roast Coffee | Bold & Rich | Alpico Coffee",
      description: "Experience our dark roast coffee beans from alpico coffee, rich flavors and notes of dark chocolate and spice.",
      keywords: "dark roast coffee, alpico coffee, dark roast coffee in nepal, dark chocolate coffee"
    },
    "equipment": {
      title: "Coffee Equipment & Brewing Gear | Alpico Coffee",
      description: "Professional coffee brewing equipment including grinders, pour-over drippers, French presses, and more.",
      keywords: "coffee equipment, french press, coffee grinder, pour over dripper, Mocha pot, Aeropress, V60, Chemex"
    },
    "merch": {
      title: "Coffee Merchandise | Alpico Coffee Gear & Apparel",
      description: "Show your coffee love with Alpico Coffee merchandise including mugs, apparel, and accessories.",
      keywords: "coffee merchandise, coffee mugs, coffee apparel, coffee accessories, coffee gear, alpico coffee merch"
    }
  }
};

// Helper function to generate product-specific SEO
export const generateProductSEO = (product: any) => ({
  title: `${product.name} | ${product.category === 'equipment' ? 'Coffee Equipment' : 'Premium Coffee'} | Alpico Coffee`,
  description: `${product.description} ${product.category === 'equipment' ? 'Coffee equipment' : 'Premium coffee beans'} from Alpico Coffee.`,
  keywords: `${product.name.toLowerCase()}, ${product.details.origin.toLowerCase()}, ${product.details.flavorNotes.join(', ').toLowerCase()}, ${product.category.replace('-', ' ')}`
});

// Helper function to generate blog post SEO
export const generateBlogSEO = (post: any) => ({
  title: `${post.title} | Alpico Coffee Blog`,
  description: post.excerpt,
  keywords: post.tags.join(', '),
  author: post.author,
  publishedTime: post.publishedAt,
  modifiedTime: post.publishedAt,
  type: "article"
});