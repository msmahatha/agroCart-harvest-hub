
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  itemCount: 0,
});

export const useWishlist = () => useContext(WishlistContext);

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever wishlist changes
    localStorage.setItem('wishlist', JSON.stringify(items));
    
    // Update derived state
    setItemCount(items.length);
  }, [items]);

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems([...items, product]);
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const productToRemove = items.find(item => item.id === productId);
    
    setItems(items.filter(item => item.id !== productId));
    
    if (productToRemove) {
      toast.info(`Removed ${productToRemove.name} from wishlist`);
    }
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    toast.info("Wishlist has been cleared");
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        items, 
        addToWishlist, 
        removeFromWishlist, 
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        itemCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
