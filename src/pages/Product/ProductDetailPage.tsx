import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { 
  getProductBySlug, 
  getProductsByCategory, 
  type Product 
} from '@/data/products';
import { 
  ChevronRight, 
  Leaf, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Plus, 
  Minus, 
  Shield, 
  Truck, 
  RotateCcw, 
  HelpCircle,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProductRating, calculateDiscountPercentage } from '@/components/product/ProductCardUtils';
import ProductGrid from '@/components/product/ProductGrid';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = getProductBySlug(slug || '');
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const discountPercentage = calculateDiscountPercentage(product);
  const relatedProducts = getProductsByCategory(product.categoryId).filter(p => p.id !== product.id).slice(0, 4);
  
  // Convert USD to INR (approximate fixed rate)
  const priceInINR = product.price * 83;
  const salePriceInINR = product.salePrice ? product.salePrice * 83 : null;

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Use the gallery or fall back to the main image
  const images = product.gallery || [product.image];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="relative rounded-lg overflow-hidden bg-background border border-border h-[400px] mb-4">
            <img 
              src={images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
            {product.isOrganic && (
              <Badge variant="success" className="absolute top-4 left-4">
                Organic
              </Badge>
            )}
            {discountPercentage && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)} 
                  className={`border rounded-md overflow-hidden h-20 ${
                    idx === activeImageIndex ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - view ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="space-y-4">
            {product.brand && (
              <div className="text-sm text-muted-foreground">{product.brand}</div>
            )}
            
            <h1 className="text-3xl font-display font-semibold">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span className="text-primary">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              {salePriceInINR ? (
                <>
                  <span className="text-2xl font-semibold flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {salePriceInINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-muted-foreground line-through flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {priceInINR.toLocaleString('en-IN')}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  {priceInINR.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <Separator />

            <div className="text-sm leading-relaxed">
              <p>{product.description}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-input rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground" 
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1 sm:flex-none">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-start space-x-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Free shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over ₹5,000</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Easy returns</p>
                  <p className="text-xs text-muted-foreground">30 day return policy</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Secure payments</p>
                  <p className="text-xs text-muted-foreground">Protected by encryption</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Leaf className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Quality guarantee</p>
                  <p className="text-xs text-muted-foreground">Tested and certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details & Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="bg-card p-6 rounded-lg border">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            {product.specifications && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium w-1/2">{key}:</span>
                      <span className="text-muted-foreground w-1/2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="bg-card p-6 rounded-lg border">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center p-4 bg-muted rounded-lg md:w-1/3">
                <span className="text-5xl font-semibold">{product.rating.toFixed(1)}</span>
                <ProductRating rating={product.rating} reviewCount={product.reviewCount} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">Based on {product.reviewCount} reviews</p>
              </div>
              
              <div className="md:w-2/3">
                <p className="text-center text-muted-foreground py-12">
                  <HelpCircle className="h-10 w-10 mx-auto mb-4 text-muted-foreground/50" />
                  No reviews yet. Be the first to write a review!
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="bg-card p-6 rounded-lg border">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
              <p className="text-muted-foreground mb-4">
                We ship all products within 1-2 business days of receiving your order.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Standard Shipping: 3-5 business days</li>
                <li>Express Shipping: 1-2 business days</li>
                <li>Free shipping on orders over ₹5,000</li>
                <li>International shipping available to select countries</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
              <p className="text-muted-foreground mb-4">
                We want you to be completely satisfied with your purchase. If you're not, we accept returns within 30 days of delivery.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Items must be unused and in original packaging</li>
                <li>Return shipping costs are the responsibility of the customer</li>
                <li>Refunds will be processed within 5-7 business days</li>
                <li>Some items, such as seeds that have been opened, cannot be returned</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-display font-semibold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
