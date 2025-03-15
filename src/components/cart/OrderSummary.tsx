
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, IndianRupee } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface OrderSummaryProps {
  subtotal: number;
  clearCart: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, clearCart }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would send the order to a backend
      toast({
        title: "Order Placed Successfully!",
        description: "Your order will be delivered in 3-5 business days.",
      });
      
      // Clear the cart
      clearCart();
      
      // Redirect to orders page
      navigate('/orders');
      
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <Card>
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium">Order Summary</h2>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{subtotal >= 500 ? "Free" : 
            <span className="flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />50.00
            </span>}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (GST)</span>
          <span className="flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {(subtotal * 0.05).toFixed(2)}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span className="flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {(subtotal + (subtotal >= 500 ? 0 : 50) + (subtotal * 0.05)).toFixed(2)}
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
  );
};

export default OrderSummary;
