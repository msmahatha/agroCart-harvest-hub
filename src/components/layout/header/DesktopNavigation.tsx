
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CategoryMenu from './CategoryMenu';

interface DesktopNavigationProps {
  categoryMenuOpen: boolean;
  setCategoryMenuOpen: (open: boolean) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  categoryMenuOpen,
  setCategoryMenuOpen
}) => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Link to="/" className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        location.pathname === "/" 
          ? "text-primary" 
          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
      )}>
        Home
      </Link>
      
      <CategoryMenu 
        categoryMenuOpen={categoryMenuOpen}
        setCategoryMenuOpen={setCategoryMenuOpen}
        location={location}
      />
      
      <Link to="/about" className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        location.pathname === "/about" 
          ? "text-primary" 
          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
      )}>
        About
      </Link>
      
      <Link to="/contact" className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        location.pathname === "/contact" 
          ? "text-primary" 
          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
      )}>
        Contact
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
