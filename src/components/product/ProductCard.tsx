
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const calculateDiscountPercentage = () => {
    if (!product.salePrice) return null;
    const discount = ((product.price - product.salePrice) / product.price) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscountPercentage();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (variant === 'compact') {
    return (
      <Link 
        to={`/product/${product.slug}`}
        className={cn(
          "group relative flex flex-col rounded-lg overflow-hidden bg-white hover-lift border border-border hover:border-primary/20 transition-all duration-300",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden">
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
          {discountPercentage && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              {product.salePrice ? (
                <>
                  <span className="font-semibold">${product.salePrice}</span>
                  <span className="text-muted-foreground line-through text-xs">${product.price}</span>
                </>
              ) : (
                <span className="font-semibold">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/product/${product.slug}`}
        className={cn(
          "group relative flex rounded-lg overflow-hidden bg-white hover-lift border border-border hover:border-primary/20 transition-all duration-300",
          className
        )}
      >
        <div className="relative w-1/3 aspect-square overflow-hidden">
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
          {discountPercentage && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium">{product.name}</h3>
          {showRating && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.floor(product.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                    } 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          )}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="mt-auto pt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              {product.salePrice ? (
                <>
                  <span className="font-semibold">${product.salePrice}</span>
                  <span className="text-muted-foreground line-through text-sm">${product.price}</span>
                </>
              ) : (
                <span className="font-semibold">${product.price}</span>
              )}
            </div>
            {showAddToCart && (
              <button 
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Link 
        to={`/product/${product.slug}`}
        className={cn(
          "group relative flex flex-col rounded-lg overflow-hidden bg-white border border-border hover:border-primary/20 transition-all duration-300 subtle-shadow",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
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
          <div 
            className={cn(
              "absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center",
              isHovered ? "bg-black/10" : ""
            )}
          >
            {isHovered && showAddToCart && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex space-x-2"
              >
                <button 
                  onClick={handleAddToCart}
                  className="p-3 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-lg"
                >
                  <ShoppingCart size={20} />
                </button>
                <button 
                  onClick={handleWishlist}
                  className="p-3 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-lg"
                >
                  <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium truncate">{product.name}</h3>
          {showRating && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < Math.floor(product.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                    } 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          )}
          <div className="mt-2 flex items-baseline gap-1.5">
            {product.salePrice ? (
              <>
                <span className="font-semibold text-lg">${product.salePrice}</span>
                <span className="text-muted-foreground line-through text-sm">${product.price}</span>
              </>
            ) : (
              <span className="font-semibold text-lg">${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
