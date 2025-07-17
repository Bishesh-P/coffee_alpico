export interface PromoCode {
  code: string;
  discount: number; // NPR discount (flat amount)
}

export type CheckoutStep = 'shipping' | 'confirmation' | 'platform' | 'payment' | 'receipt' | 'success';

export type MachineType = 'French Press' | 'Mocha Pot' | 'Aeropress' | 'Espresso Machine' | 'Pour Over' | 'Drip Coffee Maker' | 'Other';

export type PaymentPlatform = 'esewa' | 'khalti' | 'fonepay';

export interface PaymentPlatformInfo {
  key: PaymentPlatform;
  name: string;
  qr: string;
  info: string;
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
  machine?: MachineType;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, machine?: MachineType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setMachineForItem: (productId: number, machine: MachineType) => void;
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