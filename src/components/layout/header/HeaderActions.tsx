
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import UserMenu from './UserMenu';

interface HeaderActionsProps {
  user: { name: string; email: string } | null;
  itemCount: number;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  logout: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  user,
  itemCount,
  toggleSearch,
  toggleMobileMenu,
  mobileMenuOpen,
  userMenuOpen,
  setUserMenuOpen,
  logout
}) => {
  return (
    <div className="flex items-center">
      {/* Search Button */}
      <button 
        onClick={toggleSearch}
        className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
      
      {/* Cart */}
      <Link 
        to="/cart" 
        className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors ml-1 relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center bg-primary text-white text-xs rounded-full h-5 w-5">
            {itemCount}
          </span>
        )}
      </Link>
      
      {/* User Menu or Login/Signup Buttons */}
      <UserMenu 
        user={user}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        logout={logout}
      />
      
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleMobileMenu}
        className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors ml-1 md:hidden"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default HeaderActions;
