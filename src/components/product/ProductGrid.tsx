import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: number | { default: number; sm?: number; md?: number; lg?: number; xl?: number };
  loading?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'horizontal';
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className,
  columns = 4,
  loading = false,
  emptyMessage = "No products found",
  variant = 'default'
}) => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const getGridCols = () => {
    if (typeof columns === 'number') {
      switch (columns) {
        case 1: return "grid-cols-1";
        case 2: return "grid-cols-1 sm:grid-cols-2";
        case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
        case 5: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
        case 6: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
        default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      }
    } else {
      const colObj = columns as { default: number; sm?: number; md?: number; lg?: number; xl?: number };
      const defaultCol = `grid-cols-${colObj.default}`;
      const smCol = colObj.sm ? ` sm:grid-cols-${colObj.sm}` : '';
      const mdCol = colObj.md ? ` md:grid-cols-${colObj.md}` : '';
      const lgCol = colObj.lg ? ` lg:grid-cols-${colObj.lg}` : '';
      const xlCol = colObj.xl ? ` xl:grid-cols-${colObj.xl}` : '';
      
      return `${defaultCol}${smCol}${mdCol}${lgCol}${xlCol}`;
    }
  };

  if (loading) {
    return (
      <div className={cn("grid gap-4 md:gap-6", getGridCols(), className)}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className={cn("grid gap-4 md:gap-6", getGridCols(), className)}>
        {displayProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <ProductCard 
              product={product} 
              isNew={index === 0 || index === 3}
              variant={variant}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ProductGrid;
