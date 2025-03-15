
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Settings, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, title }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <div className="container mx-auto py-20 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">You need to be logged in</h2>
            <p className="text-muted-foreground mb-6">Please log in to view this page</p>
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
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20 bg-primary/10">
                  <AvatarFallback className="text-primary">
                    <UserRound className="h-12 w-12" />
                  </AvatarFallback>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
