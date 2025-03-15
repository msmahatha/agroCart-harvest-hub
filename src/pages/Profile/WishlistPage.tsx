
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { toast } from 'sonner';
import ProfileLayout from '@/components/profile/ProfileLayout';

const WishlistPage: React.FC = () => {
  // For demo purposes, we're showing a few products from the data
  const wishlistItems = [
    { ...products[2], addedOn: new Date('2023-09-15') }, // Advanced Irrigation Kit
    { ...products[6], addedOn: new Date('2023-08-20') }, // Organic Tomato Seeds
    { ...products[4], addedOn: new Date('2023-10-05') }  // Eco-Friendly Pest Control Spray
  ];

  // USD to INR conversion rate (approximate)
  const usdToInr = 83;

  const handleRemoveFromWishlist = (productId: string) => {
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (productId: string) => {
    toast.success("Item added to cart");
  };

  return (
    <ProfileLayout title="My Wishlist">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">My Wishlist</h2>
        </CardHeader>
        <CardContent>
          {wishlistItems.length > 0 ? (
            <div className="space-y-4">
              {wishlistItems.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <div className="p-4 md:border-r border-border md:col-span-2">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div>
                          <Link to={`/product/${product.slug}`} className="font-medium hover:text-primary">
                            {product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            ₹{Math.round((product.salePrice || product.price) * usdToInr).toLocaleString('en-IN')}
                            {product.salePrice && (
                              <span className="ml-2 line-through text-muted-foreground/70">
                                ₹{Math.round(product.price * usdToInr).toLocaleString('en-IN')}
                              </span>
                            )}
                          </p>
                          {product.brand && (
                            <p className="text-xs text-muted-foreground">Brand: {product.brand}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:text-center md:border-r border-border">
                      <p className="text-sm text-muted-foreground">Added on</p>
                      <p className="font-medium">{new Intl.DateTimeFormat('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(product.addedOn)}</p>
                    </div>
                    <div className="p-4 flex flex-row md:flex-col gap-2 justify-end md:items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary text-primary hover:bg-primary/5"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Heart className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Save items you like to your wishlist and come back to them later.
              </p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </ProfileLayout>
  );
};

export default WishlistPage;
