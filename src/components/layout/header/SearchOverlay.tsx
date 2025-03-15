
import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  searchOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchOpen,
  searchQuery,
  setSearchQuery,
  setSearchOpen,
  handleSearchSubmit
}) => {
  return (
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
  );
};

export default SearchOverlay;
