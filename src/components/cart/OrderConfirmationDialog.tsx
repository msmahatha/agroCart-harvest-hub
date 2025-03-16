
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Package, IndianRupee } from 'lucide-react';

interface OrderConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  total: number;
}

const OrderConfirmationDialog = ({ 
  open, 
  onOpenChange,
  orderId,
  total
}: OrderConfirmationDialogProps) => {
  const navigate = useNavigate();
  
  const handleViewOrders = () => {
    onOpenChange(false);
    navigate('/orders');
  };
  
  const handleContinueShopping = () => {
    onOpenChange(false);
    navigate('/products');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your purchase. Your order has been received.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center p-4 bg-muted rounded-md">
            <div className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Order ID:</span>
            </div>
            <span className="font-medium">{orderId}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-muted rounded-md">
            <div className="flex items-center">
              <IndianRupee className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Total Amount:</span>
            </div>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            An email confirmation has been sent to your email address.
          </p>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleContinueShopping}
            className="sm:flex-1"
          >
            Continue Shopping
          </Button>
          <Button 
            onClick={handleViewOrders}
            className="sm:flex-1"
          >
            View My Orders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationDialog;
