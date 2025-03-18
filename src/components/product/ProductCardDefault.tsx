
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import { ShoppingCart, MoveRight, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductImage, ProductPrice, ProductRating } from './ProductCardUtils';

interface ProductCardDefaultProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  showRating?: boolean;
  isNew?: boolean;
}

const ProductCardDefault: React.FC<ProductCardDefaultProps> = ({
  product,
  className,
  showAddToCart = true,
  showRating = true,
  isNew = false
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Navigate to cart page
    window.location.href = '/cart';
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

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
          <ProductImage product={product} isNew={isNew} />
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
                  onClick={handleBuyNow}
                  className="p-3 rounded-full bg-white text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors shadow-lg"
                >
                  <MoveRight size={20} />
                </button>
                <button 
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-full bg-white transition-colors shadow-lg ${
                    isInWishlist(product.id) 
                      ? "text-red-500 hover:bg-red-50" 
                      : "text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium truncate">{product.name}</h3>
          {showRating && (
            <ProductRating 
              rating={product.rating} 
              reviewCount={product.reviewCount} 
              className="mt-1"
            />
          )}
          <ProductPrice 
            price={product.price} 
            salePrice={product.salePrice} 
            className="mt-2"
            priceSizeLarge
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCardDefault;
