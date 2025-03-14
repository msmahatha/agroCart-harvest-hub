
import React from 'react';
import { Product } from '@/data/products';
import ProductCardDefault from './ProductCardDefault';
import ProductCardCompact from './ProductCardCompact';
import ProductCardHorizontal from './ProductCardHorizontal';

interface ProductCardProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  showRating?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  showAddToCart = true,
  showRating = true,
  variant = 'default',
  isNew = false
}) => {
  switch (variant) {
    case 'compact':
      return (
        <ProductCardCompact 
          product={product} 
          className={className} 
          isNew={isNew}
        />
      );
    case 'horizontal':
      return (
        <ProductCardHorizontal 
          product={product} 
          className={className} 
          showAddToCart={showAddToCart} 
          showRating={showRating}
          isNew={isNew}
        />
      );
    default:
      return (
        <ProductCardDefault 
          product={product} 
          className={className} 
          showAddToCart={showAddToCart} 
          showRating={showRating}
          isNew={isNew}
        />
      );
  }
};

export default ProductCard;
