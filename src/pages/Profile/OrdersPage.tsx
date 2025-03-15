
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ShoppingBag, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ProfileLayout from '@/components/profile/ProfileLayout';

// Convert mock orders to use INR and realistic dates
const defaultOrders = [
  {
    id: 'ORD7823691',
    date: new Date('2023-11-15'),
    total: 9499,
    status: 'Delivered',
    items: 3,
    products: [
      "Premium Wheat Seeds",
      "Organic Compost Fertilizer",
      "Mini Cultivator Machine"
    ]
  },
  {
    id: 'ORD5439018',
    date: new Date('2023-09-28'),
    total: 3749,
    status: 'Processing',
    items: 2,
    products: [
      "Professional Pruning Shears",
      "Eco-Friendly Pest Control Spray"
    ]
  },
  {
    id: 'ORD2176459',
    date: new Date('2023-07-10'),
    total: 12450,
    status: 'Delivered',
    items: 5,
    products: [
      "Advanced Irrigation Kit",
      "Organic Tomato Seeds",
      "Premium Garden Tool Set",
      "Premium Wheat Seeds",
      "Eco-Friendly Pest Control Spray"
    ]
  },
];

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState(defaultOrders);

  useEffect(() => {
    // Load any orders from localStorage that were placed through checkout
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        // Combine with default orders
        setOrders([...parsedOrders, ...defaultOrders]);
      } catch (e) {
        console.error("Failed to parse orders from localStorage", e);
      }
    }
  }, []);

  return (
    <ProfileLayout title="My Orders">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">My Orders</h2>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                    <div className="p-4 md:p-6 md:border-r border-border md:col-span-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(order.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 ml-13 pl-13">
                        <p className="text-xs text-muted-foreground">Items:</p>
                        <ul className="text-xs list-disc pl-4 mt-1">
                          {order.products.map((product, index) => (
                            <li key={index} className="truncate max-w-[250px]">{product}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 text-center md:border-r border-border">
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items}</p>
                    </div>
                    <div className="p-4 text-center md:border-r border-border">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium flex items-center justify-center">
                        <IndianRupee className="h-3 w-3 mr-1" />
                        {order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="p-4 md:pl-6 flex items-center justify-between md:col-span-1">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className={cn(
                          "font-medium",
                          order.status === 'Delivered' ? 'text-primary' : 'text-orange-500'
                        )}>
                          {order.status}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Browse our products and place your first order!
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </ProfileLayout>
  );
};

export default OrdersPage;
