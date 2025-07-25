export interface PromoCode {
  code: string;
  discount: number; // NPR discount (flat amount)
}

export type CheckoutStep = 'shipping' | 'variants' | 'confirmation' | 'platform' | 'payment' | 'receipt' | 'success';

export type MachineType = 'French Press' | 'Mocha Pot' | 'Aeropress' | 'Espresso Machine' | 'Pour Over' | 'Drip Coffee Maker' | 'Other';

export type PaymentPlatform = 'esewa' | 'khalti' | 'fonepay';

export interface PaymentPlatformInfo {
  key: PaymentPlatform;
  name: string;
  qr: string;
  info: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  image: string;
  details: {
    volume: string;
    weight: string;
  };
  inStock?: boolean;
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
  variants?: ProductVariant[];
  promoCodes?: PromoCode[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  machine?: MachineType;
  selectedVariant?: ProductVariant;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, machine?: MachineType, selectedVariant?: ProductVariant) => void;
  removeFromCart: (productId: number, variantId?: string) => void;
  updateQuantity: (productId: number, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  setMachineForItem: (productId: number, machine: MachineType, variantId?: string) => void;
  setVariantForItem: (productId: number, variant: ProductVariant) => void;
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