export interface PromoCode {
  code: string;
  discount: number; // NPR discount (flat amount)
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  inStock?: boolean;
  details: {
    origin: string;
    roastLevel: string;
    flavorNotes: string[];
    weight: string;
  };
  promoCodes?: PromoCode[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  machine?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, machine?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setMachineForItem: (productId: number, machine: string) => void;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  image: string;
  readTime: number;
}

export interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getFeaturedPosts: () => BlogPost[];
}