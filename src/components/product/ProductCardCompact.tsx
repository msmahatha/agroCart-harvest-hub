
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { ProductImage, ProductPrice } from './ProductCardUtils';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    addToCart(product, 1);
  };

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
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardCompact;
