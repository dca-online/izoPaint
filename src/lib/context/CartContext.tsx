'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/product';

// Define cart item type
export interface CartItem {
  productId: string;
  title: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  unit: string;
}

// Define cart context type
interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse saved cart', error);
        localStorage.removeItem('cart');
      }
    }
    setIsInitialized(true);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items));
      
      // Update total item count
      const count = items.reduce((total, item) => total + item.quantity, 0);
      setItemCount(count);
      
      // Update total price
      const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      setTotalPrice(price);
    }
  }, [items, isInitialized]);

  // Add item to cart
  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.productId === product.id && item.variant === variant.variantaProdus
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, {
          productId: product.id,
          title: product.titlu,
          image: product.linkImagine,
          variant: variant.variantaProdus,
          quantity,
          price: variant.pret.minim, // Using minimum price from variant
          unit: variant.cantitatePachet
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string, variant: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.productId === productId && item.variant === variant))
    );
  };

  // Update item quantity
  const updateQuantity = (productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}; 