
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, UserRound } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Skeleton } from '@/components/ui/skeleton';

interface UserMenuProps {
  user: { name: string; email: string } | null;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  logout: () => void;
  loading?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  userMenuOpen,
  setUserMenuOpen,
  logout,
  loading = false
}) => {
  const navigate = useNavigate();
  
  // Loading state
  if (loading) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    );
  }
  
  // If no user is logged in, show login/signup buttons
  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Link to="/login">
          <AnimatedButton variant="outline" size="sm">
            Log In
          </AnimatedButton>
        </Link>
        <Link to="/signup">
          <AnimatedButton variant="default" size="sm">
            Sign Up
          </AnimatedButton>
        </Link>
      </div>
    );
  }
  
  // If user is logged in, show the user menu
  return (
    <div className="relative ml-1">
      <button 
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
        aria-label="User menu"
      >
        <UserRound className="h-5 w-5" />
      </button>
      
      {userMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-border p-2 w-56 z-50"
        >
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <Link 
              to="/profile" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              <Package className="h-4 w-4" />
              <span>My Orders</span>
            </Link>
            <Link 
              to="/wishlist" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
            <Link 
              to="/settings" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <button 
              onClick={() => {
                logout();
                setUserMenuOpen(false);
                navigate('/');
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors text-left w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserMenu;
