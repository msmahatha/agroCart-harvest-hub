
import React from 'react';
import { useCart } from '@/context/CartContext';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-8">
      <h1 className="text-3xl font-display font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <CartItemsList 
            items={items}
            itemCount={itemCount}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary 
            subtotal={subtotal}
            clearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
