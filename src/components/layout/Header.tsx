import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { 
  Search, ShoppingCart, UserRound, Menu, X, Heart, ChevronDown, 
  LogOut, Package, Settings, Home, Leaf, Sprout, Wheat, Flower2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Categories dropdown
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
    setCategoryMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setSearchOpen(false);
      setUserMenuOpen(false);
      setCategoryMenuOpen(false);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setMobileMenuOpen(false);
      setUserMenuOpen(false);
      setCategoryMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (!userMenuOpen) {
      setCategoryMenuOpen(false);
    }
  };

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
    if (!categoryMenuOpen) {
      setUserMenuOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products/search?q=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Leaf className="text-primary h-6 w-6 mr-2" />
            <span className="font-display text-xl font-semibold">AgroCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === "/" 
                ? "text-primary" 
                : "text-foreground/80 hover:text-primary hover:bg-primary/5"
            )}>
              Home
            </Link>
            
            <div className="relative">
              <button 
                onClick={toggleCategoryMenu}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname.includes("/products") 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                Products <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", categoryMenuOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-border p-2 w-60 z-50"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      <Link 
                        to="/products" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>All Products</span>
                      </Link>
                      <Link 
                        to="/products/category/seeds" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <Wheat className="h-4 w-4 text-primary" />
                        <span>Seeds</span>
                      </Link>
                      <Link 
                        to="/products/category/fertilizers" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <Sprout className="h-4 w-4 text-primary" />
                        <span>Fertilizers</span>
                      </Link>
                      <Link 
                        to="/products/category/tools-equipment" 
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <Flower2 className="h-4 w-4 text-primary" />
                        <span>Tools & Equipment</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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

          {/* Actions */}
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
            
            {/* User Menu */}
            {user ? (
              <div className="relative ml-1">
                <button 
                  onClick={toggleUserMenu}
                  className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                  aria-label="User menu"
                >
                  <UserRound className="h-5 w-5" />
                </button>
                
                <AnimatePresence>
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
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted text-sm transition-colors text-left w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:block ml-4">
                <Link to="/login">
                  <AnimatedButton variant="outline" size="sm">
                    Log In
                  </AnimatedButton>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors ml-1 md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
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
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSearchOpen(false);
              }
            }}
          >
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <form onSubmit={handleSearchSubmit} className="flex items-center p-4">
                <Search className="h-5 w-5 text-muted-foreground mr-3" />
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="flex-1 outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button" 
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// These imports are defined after the component to avoid circular dependencies
import { Info, Mail, LogIn, UserPlus } from 'lucide-react';

export default Header;
