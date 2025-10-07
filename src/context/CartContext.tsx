import React, { createContext, useContext, useState } from 'react';
import { CartContextType, CartItem, Product, MachineType, ProductVariant } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1, machine?: MachineType, selectedVariant?: ProductVariant) => {
    setCart((prevCart) => {
      // Create a unique key for the cart item (product + variant combination)
      const cartKey = selectedVariant ? `${product.id}-${selectedVariant.id}` : `${product.id}`;
      
      // Check if this specific product+variant combination already exists in cart
      const existingItem = prevCart.find((item) => {
        const itemKey = item.selectedVariant ? `${item.product.id}-${item.selectedVariant.id}` : `${item.product.id}`;
        return itemKey === cartKey;
      });
      
      if (existingItem) {
        // Update quantity if product+variant exists
        return prevCart.map((item) => {
          const itemKey = item.selectedVariant ? `${item.product.id}-${item.selectedVariant.id}` : `${item.product.id}`;
          return itemKey === cartKey
            ? { ...item, quantity: item.quantity + quantity, machine: machine || item.machine }
            : item;
        });
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity, machine, selectedVariant }];
      }
    });
  };

  const setMachineForItem = (productId: number, machine: MachineType, variantId?: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const matchesProduct = item.product.id === productId;
        const matchesVariant = variantId 
          ? item.selectedVariant?.id === variantId 
          : !item.selectedVariant;
        
        return matchesProduct && matchesVariant ? { ...item, machine } : item;
      })
    );
  };

  const removeFromCart = (productId: number, variantId?: string) => {
    setCart((prevCart) => prevCart.filter((item) => {
      const matchesProduct = item.product.id === productId;
      const matchesVariant = variantId 
        ? item.selectedVariant?.id === variantId 
        : !item.selectedVariant;
      
      return !(matchesProduct && matchesVariant);
    }));
  };

  const updateQuantity = (productId: number, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) => {
        const matchesProduct = item.product.id === productId;
        const matchesVariant = variantId 
          ? item.selectedVariant?.id === variantId 
          : !item.selectedVariant;
        
        return matchesProduct && matchesVariant ? { ...item, quantity } : item;
      })
    );
  };

  const setVariantForItem = (productId: number, variant: ProductVariant) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && !item.selectedVariant) {
          return { ...item, selectedVariant: variant };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        setMachineForItem,
        setVariantForItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
