
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <div className="container mx-auto py-20 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
            <p className="text-muted-foreground mb-6">Please log in to view your profile</p>
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
              <h2 className="text-2xl font-semibold">My Profile</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Full Name</label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email Address</label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Orders</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Wishlist Items</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Reviews</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
