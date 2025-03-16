
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import ProfileLayout from '@/components/profile/ProfileLayout';

const EmptyWishlist = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-muted rounded-full p-6 mb-6">
      <Heart className="h-10 w-10 text-muted-foreground" />
    </div>
    <h2 className="text-2xl font-display font-semibold mb-2">Your wishlist is empty</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      Start adding products you love to your wishlist. It's a great way to keep track of items you're interested in.
    </p>
    <Button asChild>
      <Link to="/products">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Browse Products
      </Link>
    </Button>
  </div>
);

const WishlistPage = () => {
  const { items, clearWishlist } = useWishlist();

  return (
    <ProfileLayout
      title="My Wishlist"
      description="Items you've saved for later"
      action={
        items.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )
      }
    >
      {items.length > 0 ? (
        <div className="space-y-6">
          <ProductGrid products={items} />
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </ProfileLayout>
  );
};

export default WishlistPage;
