
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { ProductImage, ProductPrice } from './ProductCardUtils';

interface ProductCardCompactProps {
  product: Product;
  className?: string;
  isNew?: boolean;
}

const ProductCardCompact: React.FC<ProductCardCompactProps> = ({
  product,
  className,
  isNew = false
}) => {
  return (
    <Link 
      to={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col rounded-lg overflow-hidden bg-white hover-lift border border-border hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <ProductImage 
        product={product} 
        isNew={isNew} 
        className="aspect-square"
      />
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-medium text-sm truncate">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <ProductPrice 
            price={product.price} 
            salePrice={product.salePrice} 
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCardCompact;
