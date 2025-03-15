
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Leaf, Wheat, Sprout, Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryMenuProps {
  categoryMenuOpen: boolean;
  setCategoryMenuOpen: (open: boolean) => void;
  location: { pathname: string };
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categoryMenuOpen,
  setCategoryMenuOpen,
  location
}) => {
  return (
    <div className="relative">
      <button 
        onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
          location.pathname.includes("/products") 
            ? "text-primary" 
            : "text-foreground/80 hover:text-primary hover:bg-primary/5"
        )}
      >
        Products <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", categoryMenuOpen && "rotate-180")} />
      </button>
      
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
    </div>
  );
};

export default CategoryMenu;
