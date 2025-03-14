
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Settings, Eye, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const mockOrders = [
  {
    id: 'ORD123456',
    date: new Date('2023-06-15'),
    total: 129.95,
    status: 'Delivered',
    items: 3,
  },
  {
    id: 'ORD789012',
    date: new Date('2023-05-28'),
    total: 76.50,
    status: 'Processing',
    items: 2,
  },
  {
    id: 'ORD345678',
    date: new Date('2023-04-10'),
    total: 210.25,
    status: 'Delivered',
    items: 5,
  },
];

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <div className="container mx-auto py-20 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
            <p className="text-muted-foreground mb-6">Please log in to view your orders</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-display font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
                  <img src={user.avatar || 'https://i.pravatar.cc/150?img=33'} alt={user.name} />
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <nav className="space-y-1">
                <Link 
                  to="/profile" 
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded-md transition-colors text-sm",
                    location.pathname === "/profile" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/orders" 
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded-md transition-colors text-sm",
                    location.pathname === "/orders" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Package className="h-4 w-4" />
                  <span>My Orders</span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded-md transition-colors text-sm",
                    location.pathname === "/wishlist" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link 
                  to="/settings" 
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded-md transition-colors text-sm",
                    location.pathname === "/settings" 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="col-span-1 lg:col-span-3">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">My Orders</h2>
            </CardHeader>
            <CardContent>
              {mockOrders.length > 0 ? (
                <div className="space-y-6">
                  {mockOrders.map((order) => (
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
                                {format(order.date, 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-center md:border-r border-border">
                          <p className="text-sm text-muted-foreground">Items</p>
                          <p className="font-medium">{order.items}</p>
                        </div>
                        <div className="p-4 text-center md:border-r border-border">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-medium">${order.total.toFixed(2)}</p>
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
                    <Package className="h-6 w-6 text-muted-foreground" />
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
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
