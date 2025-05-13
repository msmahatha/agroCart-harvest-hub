import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Package, Loader2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Json } from '@/integrations/supabase/types';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  user_email: string | null;
  user_name: string | null;
  total: number;
  status: string | null;
  created_at: string;
  items: OrderItem[];
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [viewOrder, setViewOrder] = React.useState<Order | null>(null);

  // Fetch orders
  const { data: orders, isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Convert the JSON items to properly typed OrderItem[]
      return (data as any[]).map(order => ({
        ...order,
        items: order.items as OrderItem[]
      })) as Order[];
    }
  });

  // Filter orders based on search term
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    
    return orders.filter(order => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        (order.user_email && order.user_email.toLowerCase().includes(searchLower)) ||
        (order.user_name && order.user_name.toLowerCase().includes(searchLower)) ||
        order.status?.toLowerCase().includes(searchLower) ||
        order.total.toString().includes(searchLower)
      );
    });
  }, [orders, searchTerm]);

  const getStatusBadgeColor = (status: string | null): string => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800'; // pending or other
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      
      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID, customer, or status..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{order.user_name || 'Guest'}</div>
                      <div className="text-sm text-muted-foreground">{order.user_email || 'No email'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusBadgeColor(order.status)}
                    >
                      {order.status || 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{order.total.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setViewOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No orders found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? `No orders matching "${searchTerm}"` : "There are no orders yet"}
          </p>
        </div>
      )}
      
      {viewOrder && (
        <Dialog open={!!viewOrder} onOpenChange={() => setViewOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Order ID</h4>
                <p className="font-mono">{viewOrder.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                <p>{new Date(viewOrder.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
                <p>{viewOrder.user_name || 'Guest'}</p>
                <p className="text-sm text-muted-foreground">{viewOrder.user_email || 'No email'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                <Badge 
                  variant="outline" 
                  className={getStatusBadgeColor(viewOrder.status)}
                >
                  {viewOrder.status || 'Pending'}
                </Badge>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <h3 className="font-semibold mb-2">Order Items</h3>
            <div className="space-y-4">
              {viewOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md border overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-medium">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ₹{viewOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{viewOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;
