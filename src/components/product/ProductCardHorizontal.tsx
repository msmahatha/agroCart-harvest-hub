
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext'; 
import { ProductImage, ProductPrice, ProductRating } from './ProductCardUtils';

interface ProductCardHorizontalProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  showRating?: boolean;
  isNew?: boolean;
}

const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  product,
  className,
  showAddToCart = true,
  showRating = true,
  isNew = false
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <Link 
      to={`/product/${product.slug}`}
      className={cn(
        "group relative flex rounded-lg overflow-hidden bg-white hover-lift border border-border hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <ProductImage 
        product={product} 
        isNew={isNew} 
        className="relative w-1/3 aspect-square"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium">{product.name}</h3>
        {showRating && (
          <ProductRating 
            rating={product.rating} 
            reviewCount={product.reviewCount} 
            className="mt-1"
          />
        )}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <ProductPrice 
            price={product.price} 
            salePrice={product.salePrice} 
          />
          <div className="flex space-x-2">
            {showAddToCart && (
              <button 
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <ShoppingCart size={18} />
              </button>
            )}
            <button 
              onClick={handleWishlist}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardHorizontal;
