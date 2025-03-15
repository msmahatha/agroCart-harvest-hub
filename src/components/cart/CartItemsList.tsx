
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemsListProps {
  items: CartItemType[];
  itemCount: number;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ 
  items, 
  itemCount, 
  removeFromCart, 
  updateQuantity 
}) => {
  return (
    <div>
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Cart Items ({itemCount})</h2>
        </div>
        
        <div className="divide-y">
          {items.map((item) => (
            <CartItem 
              key={item.product.id} 
              item={item} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
        <Button asChild variant="outline">
          <Link to="/products">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CartItemsList;
