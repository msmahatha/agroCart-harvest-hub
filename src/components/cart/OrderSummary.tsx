
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, IndianRupee } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import OrderConfirmationDialog from './OrderConfirmationDialog';
import { CartItem } from '@/context/CartContext';

interface OrderSummaryProps {
  subtotal: number;
  clearCart: () => void;
  items: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, clearCart, items }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Convert USD to INR (approximate fixed rate)
  const subtotalInINR = subtotal * 83;
  const shippingCost = subtotalInINR >= 5000 ? 0 : 150;
  const taxAmount = subtotalInINR * 0.18; // GST 18%
  const total = subtotalInINR + shippingCost + taxAmount;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Generate order ID
      const newOrderId = `ORD${Math.floor(Math.random() * 10000000)}`;
      setOrderId(newOrderId);
      
      // Get existing orders or create empty array
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Create new order object
      const newOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        total: total,
        status: 'Processing',
        items: items.length,
        products: items.map(item => item.product.name)
      };
      
      // Save order to localStorage
      localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
      
      // Send email confirmation if user is logged in
      if (user && user.email) {
        try {
          await supabase.functions.invoke('send-order-confirmation', {
            body: {
              email: user.email,
              orderId: newOrderId,
              orderDate: new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              total: subtotalInINR,
              items: items.map(item => ({
                name: item.product.name,
                price: (item.product.salePrice || item.product.price) * 83, // Convert to INR
                quantity: item.quantity
              }))
            }
          });
          console.log("Order confirmation email sent successfully");
        } catch (emailError) {
          console.error("Failed to send order confirmation email:", emailError);
          // We don't want to fail the order if just the email fails
          toast({
            title: "Email notification failed",
            description: "We couldn't send the confirmation email, but your order was placed successfully.",
            variant: "destructive"
          });
        }
      }
      
      // Show success dialog
      setConfirmationOpen(true);
      
      // Clear the cart
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order Failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Order Summary</h2>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {subtotalInINR.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{subtotalInINR >= 5000 ? "Free" : 
              <span className="flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {shippingCost.toLocaleString('en-IN')}
              </span>}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (GST 18%)</span>
            <span className="flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {taxAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span className="flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-muted p-3 rounded-md text-sm mt-4">
            <div className="font-medium mb-1">Payment Method</div>
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-1 rounded-full">
                <IndianRupee className="h-4 w-4" />
              </span>
              Cash on Delivery
            </div>
          </div>

          <Button 
            className="w-full mt-6" 
            size="lg"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
          
          <div className="pt-4 text-xs text-center text-muted-foreground">
            <p>Secure checkout powered by trusted payment gateways</p>
            <div className="flex justify-center space-x-2 mt-2">
              <img src="/assets/visa.svg" alt="Visa" className="h-6" />
              <img src="/assets/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/assets/paypal.svg" alt="PayPal" className="h-6" />
              <img src="/assets/upi.svg" alt="UPI" className="h-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderConfirmationDialog 
        open={confirmationOpen} 
        onOpenChange={setConfirmationOpen}
        orderId={orderId}
        total={total}
      />
    </>
  );
};

export default OrderSummary;
