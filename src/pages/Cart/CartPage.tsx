
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const { user } = useAuth();

  // Transform cart items to the format expected by OrderSummary
  const orderItems = items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.salePrice ? item.product.salePrice * 83 : item.product.price * 83, // Convert to INR
    image: item.product.image,
    quantity: item.quantity
  }));

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
            subtotal={subtotal * 83} // Convert to INR to match CartItem display
            clearCart={clearCart}
            items={orderItems}
            userEmail={user?.email}
            userName={user?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
