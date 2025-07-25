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
      title: "Best Coffee in Nepal | Premium Arabica Coffee Beans | Alpico Coffee",
      description: "Discover Nepal's best coffee roaster. Premium Arabica coffee beans, specialty coffee, and brewing equipment. Sustainably sourced from local farmers. Shop online now.",
      keywords: "best coffee in nepal, nepal coffee, premium arabica coffee, specialty coffee nepal, coffee beans nepal, alpico coffee, coffee roaster nepal, nepal coffee online"
    },
    products: {
      title: "Premium Coffee Beans & Equipment | Best Coffee Shop Nepal | Alpico Coffee",
      description: "Browse Nepal's finest coffee collection - premium Arabica beans, light to dark roasts, and professional brewing equipment. Best coffee shop in Nepal with online delivery.",
      keywords: "coffee beans nepal, best coffee shop nepal, light roast coffee, medium roast coffee, dark roast coffee, coffee equipment nepal, french press nepal, moka pot nepal, alpico coffee nepal"
    },
    about: {
      title: "About Us | Nepal's Premier Coffee Roaster | Best Coffee in Nepal | Alpico Coffee",
      description: "Learn about Alpico Coffee, Nepal's leading specialty coffee roaster. Our journey from small roastery to Nepal's best coffee company sourcing premium beans from local farmers.",
      keywords: "nepal coffee company, best coffee roaster nepal, specialty coffee nepal, nepal coffee story, sustainable coffee nepal, coffee farmers nepal, premium coffee nepal"
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
      title: "Light Roast Coffee Beans Nepal | Bright & Floral Coffee | Alpico Coffee",
      description: "Explore Nepal's finest light roast coffee beans with bright, floral notes and vibrant acidity. Perfect for pour-over brewing. Premium Arabica from local farms.",
      keywords: "light roast coffee nepal, light roast coffee beans, pour over coffee nepal, bright coffee nepal, floral coffee, nepal arabica light roast"
    },
    "medium-roast": {
      title: "Medium Roast Coffee Nepal | Balanced Espresso Beans | Alpico Coffee",
      description: "Discover our premium medium roast coffee collection featuring balanced flavors with notes of chocolate, caramel, and fruit. Perfect espresso beans from Nepal.",
      keywords: "medium roast coffee nepal, espresso beans nepal, balanced coffee, chocolate coffee notes, caramel coffee, nepal medium roast"
    },
    "dark-roast": {
      title: "Dark Roast Coffee Nepal | Bold & Rich Coffee Beans | Alpico Coffee",
      description: "Experience our dark roast coffee beans with bold, rich flavors and notes of dark chocolate and spice. Premium dark roast coffee from Nepal's mountains.",
      keywords: "dark roast coffee nepal, bold coffee nepal, rich coffee beans, dark chocolate coffee, spice coffee notes, nepal dark roast"
    },
    "equipment": {
      title: "Coffee Equipment Nepal | French Press, Moka Pot & Brewing Gear | Alpico Coffee",
      description: "Professional coffee brewing equipment in Nepal including grinders, pour-over drippers, French presses, moka pots and more. Best coffee equipment store.",
      keywords: "coffee equipment nepal, french press nepal, moka pot nepal, coffee grinder nepal, pour over dripper, aeropress nepal, v60 nepal, chemex nepal, coffee gear nepal"
    },
    "merch": {
      title: "Coffee Merchandise Nepal | Coffee Mugs & Apparel | Alpico Coffee",
      description: "Show your coffee love with Alpico Coffee merchandise including premium mugs, apparel, and accessories. Best coffee merchandise in Nepal.",
      keywords: "coffee merchandise nepal, coffee mugs nepal, coffee apparel nepal, coffee accessories nepal, coffee gear nepal, alpico coffee merch nepal"
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