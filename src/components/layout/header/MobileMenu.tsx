
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, Leaf, Info, Mail, LogIn, UserPlus } from 'lucide-react';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user: { name: string; email: string } | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  user 
}) => {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-white border-t border-border shadow-sm overflow-hidden"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="grid grid-cols-1 gap-2">
          <Link 
            to="/" 
            className={cn(
              "px-3 py-3 rounded-md font-medium flex items-center",
              location.pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link 
            to="/products" 
            className={cn(
              "px-3 py-3 rounded-md font-medium flex items-center",
              location.pathname.includes("/products") ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Leaf className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "px-3 py-3 rounded-md font-medium flex items-center",
              location.pathname === "/about" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Info className="h-5 w-5 mr-3" />
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "px-3 py-3 rounded-md font-medium flex items-center",
              location.pathname === "/contact" ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Mail className="h-5 w-5 mr-3" />
            Contact
          </Link>
          {!user && (
            <>
              <div className="h-px bg-border my-2"></div>
              <Link 
                to="/login" 
                className="px-3 py-3 rounded-md font-medium flex items-center hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 mr-3" />
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-3 py-3 rounded-md font-medium flex items-center bg-primary/10 text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-5 w-5 mr-3" />
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
