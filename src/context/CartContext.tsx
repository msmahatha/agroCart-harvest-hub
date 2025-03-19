import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update derived state
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
    
    const total = items.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
    setSubtotal(total);
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated quantity for ${product.name}`);
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      toast.success(`Added ${product.name} to cart`);
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      
      // Get the product name for the toast
      const removedProduct = prevItems.find(item => item.product.id === productId);
      if (removedProduct) {
        toast.info(`Removed ${removedProduct.product.name} from cart`);
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart has been cleared");
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        itemCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
