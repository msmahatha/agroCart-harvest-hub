
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingCart, 
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductImage } from '@/components/product/ProductCardUtils';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-display font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-8">
      <h1 className="text-3xl font-display font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Cart Items ({itemCount})</h2>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4">
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
                          ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                        </div>
                        {item.product.salePrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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

        {/* Order Summary */}
        <div>
          <Card>
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{subtotal >= 50 ? "Free" : "$5.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${(subtotal * 0.05).toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>
                  ${(subtotal + (subtotal >= 50 ? 0 : 5) + (subtotal * 0.05)).toFixed(2)}
                </span>
              </div>

              <Button className="w-full mt-6" size="lg" asChild>
                <Link to="/checkout">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Link>
              </Button>
              
              <div className="pt-4 text-xs text-center text-muted-foreground">
                <p>Secure checkout powered by trusted payment gateways</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                  <img src="https://via.placeholder.com/40x25" alt="UPI" className="h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
