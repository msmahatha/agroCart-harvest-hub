
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Category } from '@/data/categories';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: Category;
  className?: string;
  variant?: 'default' | 'compact' | 'feature';
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  className,
  variant = 'default'
}) => {
  if (variant === 'compact') {
    return (
      <Link 
        to={`/products/category/${category.slug}`}
        className={cn(
          "flex flex-col items-center justify-center p-4 rounded-lg bg-white hover:bg-muted/50 transition-colors hover-lift",
          className
        )}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-muted">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-sm font-medium text-center">{category.name}</h3>
      </Link>
    );
  }
  
  if (variant === 'feature') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <Link 
          to={`/products/category/${category.slug}`}
          className={cn(
            "block relative rounded-lg overflow-hidden aspect-[4/3] subtle-shadow group",
            className
          )}
        >
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl md:text-2xl font-display mb-2">{category.name}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
            <div className="mt-4 inline-block">
              <span className="text-white text-sm font-medium border-b border-white/50 pb-0.5 transition-all group-hover:border-white">
                Explore Products
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <Link 
      to={`/products/category/${category.slug}`}
      className={cn(
        "group block relative rounded-lg overflow-hidden bg-white hover-lift border border-border hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
        <h3 className="text-white font-medium text-lg">{category.name}</h3>
        <p className="text-white/80 text-sm mt-1 line-clamp-2">{category.description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
