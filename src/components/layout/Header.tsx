
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { AnimatePresence } from 'framer-motion';

// Import sub-components
import LogoLink from './header/LogoLink';
import DesktopNavigation from './header/DesktopNavigation';
import HeaderActions from './header/HeaderActions';
import MobileMenu from './header/MobileMenu';
import SearchOverlay from './header/SearchOverlay';

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
          <LogoLink />

          {/* Desktop Navigation */}
          <DesktopNavigation 
            categoryMenuOpen={categoryMenuOpen}
            setCategoryMenuOpen={setCategoryMenuOpen}
          />

          {/* Actions */}
          <HeaderActions 
            user={user}
            itemCount={itemCount}
            toggleSearch={toggleSearch}
            toggleMobileMenu={toggleMobileMenu}
            mobileMenuOpen={mobileMenuOpen}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
            logout={logout}
            loading={loading}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            user={user}
          />
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay 
            searchOpen={searchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchOpen={setSearchOpen}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
