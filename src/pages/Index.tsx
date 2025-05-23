
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/ui/HeroSection';
import { getFeaturedCategories } from '@/data/categories';
import CategoryCard from '@/components/product/CategoryCard';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { motion } from 'framer-motion';

const Index = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => getFeaturedProducts(),
  });

  const featuredCategories = getFeaturedCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Grow Better, Harvest Greater"
        subtitle="Premium agricultural products for farmers, gardeners, and agricultural enthusiasts. From seeds to machinery, we've got you covered."
        imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
        ctaText="Shop Now"
        ctaAction={() => window.location.href = '/products'}
        secondaryCtaText="Browse Categories"
        secondaryCtaAction={() => {
          const element = document.getElementById('categories');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
        overlayOpacity={0.5}
      />

      {/* Featured Categories */}
      <section id="categories" className="py-16 bg-agro-beige">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of agricultural products organized by categories to find exactly what you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                variant="feature"
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center h-10 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our selection of top-quality products recommended by agricultural experts
            </p>
          </motion.div>

          <ProductGrid 
            products={featuredProducts || []} 
            loading={isLoading} 
            columns={4}
            emptyMessage="Featured products coming soon!"
          />

          <div className="text-center mt-10">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center h-10 px-6 py-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-medium transition-colors"
            >
              Explore All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative bg-gradient-to-r from-agro-green to-agro-sage">
        <div className="absolute inset-0 bg-grain opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Farming Experience?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied farmers who have transformed their agricultural practices with our premium products.
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center justify-center h-12 px-8 py-3 bg-white text-agro-green hover:bg-white/90 rounded-md font-medium transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
