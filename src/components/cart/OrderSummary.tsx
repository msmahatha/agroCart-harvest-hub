
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck, IndianRupee, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderConfirmationDialog from './OrderConfirmationDialog';
import { toast } from 'sonner';

interface OrderSummaryProps {
  subtotal: number;
  clearCart: () => void;
  items: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  userEmail?: string;
  userName?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  subtotal, 
  clearCart, 
  items,
  userEmail,
  userName
}) => {
  // Fix delivery charge calculation: free for orders above ₹1000
  const shipping = subtotal > 0 ? (subtotal >= 1000 ? 0 : 100) : 0;
  const tax = subtotal * 0.05; // 5% tax
  
  // Total is correctly calculated as subtotal + shipping + tax
  const total = subtotal + shipping + tax;
  
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    if (!userEmail) {
      toast.error("Please log in to place an order");
      navigate('/login');
      return;
    }
    
    setPlacing(true);
    toast.loading("Processing your order...");
    
    try {
      // Generate a random order ID
      const generatedOrderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderId(generatedOrderId);
      
      // Save order to localStorage for orders history
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      const newOrder = {
        id: generatedOrderId,
        date: new Date(),
        total: total,
        status: 'Processing',
        items: items.length,
        products: items.map(item => item.name)
      };
      
      localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
      
      toast.dismiss();
      toast.success("Order placed successfully!");
      
      // Show confirmation dialog
      setShowConfirmation(true);
      
      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Error processing order:', error);
      toast.dismiss();
      toast.error("An error occurred while processing your order");
    } finally {
      setPlacing(false);
    }
  };
  
  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ShoppingBag className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-muted-foreground">Shipping</span>
              {shipping === 0 && subtotal > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                  Free
                </span>
              )}
            </div>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {shipping.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Tax (5%)</span>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-bold flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Truck className="h-4 w-4 mr-2" />
            {subtotal >= 1000 
              ? "Free delivery on this order!"
              : "Free delivery on orders above ₹1,000"}
          </div>
          
          <Button 
            onClick={handlePlaceOrder} 
            className="w-full h-12 text-base"
            disabled={placing || items.length === 0}
          >
            {placing ? "Processing..." : "Place Order"}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
          
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center justify-center"
              onClick={clearCart}
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">We Accept:</h3>
          <div className="flex items-center space-x-3">
            <img src="/assets/visa.svg" alt="Visa" className="h-8 w-auto" />
            <img src="/assets/mastercard.svg" alt="Mastercard" className="h-8 w-auto" />
            <img src="/assets/paypal.svg" alt="PayPal" className="h-8 w-auto" />
            <img src="/assets/upi.svg" alt="UPI" className="h-8 w-auto" />
          </div>
        </div>
      </div>
      
      <OrderConfirmationDialog 
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        orderId={orderId}
        total={total}
      />
    </>
  );
};

export default OrderSummary;
