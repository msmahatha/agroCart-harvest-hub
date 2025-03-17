
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
  loading?: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  user,
  itemCount,
  toggleSearch,
  toggleMobileMenu,
  mobileMenuOpen,
  userMenuOpen,
  setUserMenuOpen,
  logout,
  loading = false
}) => {
  return (
    <div className="flex items-center gap-1">
      {/* Search button */}
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
        className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors relative"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="default" 
            className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center p-0"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </Badge>
        )}
      </Link>
      
      {/* User menu */}
      <UserMenu 
        user={user} 
        userMenuOpen={userMenuOpen} 
        setUserMenuOpen={setUserMenuOpen} 
        logout={logout}
        loading={loading}
      />
      
      {/* Mobile menu toggle */}
      <button 
        onClick={toggleMobileMenu} 
        className="md:hidden p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default HeaderActions;
