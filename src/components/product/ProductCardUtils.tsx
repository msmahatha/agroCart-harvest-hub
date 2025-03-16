
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star, IndianRupee } from 'lucide-react';
import { Product } from '@/data/products';

// Product Image component with badges
export const ProductImage = ({ 
  product, 
  isNew, 
  className 
}: { 
  product: Product; 
  isNew?: boolean; 
  className?: string;
}) => {
  const discountPercentage = calculateDiscountPercentage(product);
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img 
        src={product.image} 
        alt={product.name}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      {isNew && (
        <Badge variant="premium" className="absolute top-2 left-2">
          New
        </Badge>
      )}
      {product.isOrganic && (
        <Badge variant="success" className="absolute top-2 left-2">
          Organic
        </Badge>
      )}
      {discountPercentage && (
        <Badge variant="destructive" className="absolute top-2 right-2">
          {discountPercentage}% OFF
        </Badge>
      )}
    </div>
  );
};

// Product Rating component
export const ProductRating = ({ 
  rating, 
  reviewCount, 
  className 
}: { 
  rating: number; 
  reviewCount: number; 
  className?: string; 
}) => (
  <div className={cn("flex items-center gap-1", className)}>
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
          } 
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">({reviewCount})</span>
  </div>
);

// Product Price component
export const ProductPrice = ({ 
  price, 
  salePrice, 
  className,
  priceSizeLarge = false
}: { 
  price: number; 
  salePrice?: number; 
  className?: string;
  priceSizeLarge?: boolean;
}) => (
  <div className={cn("flex items-baseline gap-1.5", className)}>
    {salePrice ? (
      <>
        <span className={cn("font-semibold", priceSizeLarge ? "text-lg" : "")}>
          <span className="flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {(salePrice * 83).toLocaleString('en-IN')}
          </span>
        </span>
        <span className="text-muted-foreground line-through text-sm">
          <span className="flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {(price * 83).toLocaleString('en-IN')}
          </span>
        </span>
      </>
    ) : (
      <span className={cn("font-semibold", priceSizeLarge ? "text-lg" : "")}>
        <span className="flex items-center">
          <IndianRupee className="h-3 w-3 mr-1" />
          {(price * 83).toLocaleString('en-IN')}
        </span>
      </span>
    )}
  </div>
);

// Utility function to calculate discount percentage
export const calculateDiscountPercentage = (product: Product) => {
  if (!product.salePrice) return null;
  const discount = ((product.price - product.salePrice) / product.price) * 100;
  return Math.round(discount);
};
