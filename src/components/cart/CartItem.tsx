
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, IndianRupee } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { ProductImage } from '@/components/product/ProductCardUtils';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  removeFromCart, 
  updateQuantity 
}) => {
  // Convert to INR
  const priceInINR = item.product.price * 83;
  const salePriceInINR = item.product.salePrice ? item.product.salePrice * 83 : null;
  
  return (
    <div className="p-4 flex flex-col sm:flex-row gap-4">
      <div className="sm:w-20 sm:h-20 rounded-md overflow-hidden">
        <ProductImage 
          product={item.product} 
          className="w-full h-full"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <Link 
            to={`/product/${item.product.slug}`}
            className="font-medium hover:text-primary transition-colors"
          >
            {item.product.name}
          </Link>
          <button 
            onClick={() => removeFromCart(item.product.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        {item.product.brand && (
          <div className="text-sm text-muted-foreground mb-2">
            Brand: {item.product.brand}
          </div>
        )}
        
        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center border border-input rounded-md">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-2 py-1 text-muted-foreground hover:text-foreground"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 py-1 w-8 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-2 py-1 text-muted-foreground hover:text-foreground"
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <div className="text-right">
            <div className="font-medium">
              <span className="flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {((salePriceInINR || priceInINR) * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
            {item.product.salePrice && (
              <div className="text-sm text-muted-foreground line-through flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {(priceInINR * item.quantity).toLocaleString('en-IN')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
