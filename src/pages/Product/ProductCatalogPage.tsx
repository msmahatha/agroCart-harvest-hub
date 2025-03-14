
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  getProductsByCategory, 
  getFeaturedProducts, 
  searchProducts, 
  products 
} from '@/data/products';
import { getCategoryBySlug, categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import ProductGrid from '@/components/product/ProductGrid';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductCatalogPage = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  const [displayProducts, setDisplayProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const pageTitle = category ? category.name : searchQuery ? `Search Results: "${searchQuery}"` : 'All Products';

  // Get unique brands for the filter
  const uniqueBrands = [...new Set(products.filter(p => p.brand).map(p => p.brand as string))];

  // Filter products based on category, search, and filters
  useEffect(() => {
    let result = products;
    
    // Filter by category if provided
    if (category) {
      result = getProductsByCategory(category.id);
    } 
    // Filter by search if provided
    else if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply brand filter if any brands are selected
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    setFilteredProducts(result);
  }, [category, searchQuery, priceRange, selectedBrands]);

  // Sort products
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => 
          (a.salePrice || a.price) - (b.salePrice || b.price)
        );
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => 
          (b.salePrice || b.price) - (a.salePrice || a.price)
        );
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // We don't have a date field, so we'll use ID as a proxy
        sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // For featured, put featured products first, then sort by rating
        sortedProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    setDisplayProducts(sortedProducts);
  }, [filteredProducts, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results - in a real app, we would use a router
    window.location.href = `/products/search?q=${encodeURIComponent(searchTerm)}`;
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
        {category && (
          <>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-foreground font-medium">{category.name}</span>
          </>
        )}
        {searchQuery && (
          <>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-foreground font-medium">Search Results</span>
          </>
        )}
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold mb-2">{pageTitle}</h1>
        {category && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
        {searchQuery && (
          <p className="text-muted-foreground">
            Showing results for "{searchQuery}" ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found)
          </p>
        )}
        {!category && !searchQuery && (
          <p className="text-muted-foreground">Browse our complete selection of quality agricultural products</p>
        )}
      </div>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden mb-6">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={toggleMobileFilters}
          >
            <Filter className="mr-2 h-4 w-4" />
            {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Sidebar Filters - Desktop always visible, mobile toggle */}
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
          <div className="sticky top-24 space-y-6 bg-card p-6 rounded-lg border shadow-sm">
            <div>
              <h2 className="font-medium text-lg mb-4">Search Products</h2>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <Separator />
            
            <div>
              <h2 className="font-medium text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                <div>
                  <Link 
                    to="/products" 
                    className={`block px-2 py-1 rounded ${!categorySlug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >
                    All Products
                  </Link>
                </div>
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <Link 
                      to={`/products/category/${cat.slug}`} 
                      className={`block px-2 py-1 rounded ${categorySlug === cat.slug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      {cat.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="py-2 font-medium text-lg">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    {/* This is a simplified price range - in a real app, use a proper slider component */}
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={priceRange[0] === 0 && priceRange[1] === 500 ? 'bg-primary/10 text-primary' : ''}
                        onClick={() => setPriceRange([0, 500])}
                      >
                        All
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={priceRange[0] === 0 && priceRange[1] === 50 ? 'bg-primary/10 text-primary' : ''}
                        onClick={() => setPriceRange([0, 50])}
                      >
                        Under $50
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={priceRange[0] === 50 && priceRange[1] === 200 ? 'bg-primary/10 text-primary' : ''}
                        onClick={() => setPriceRange([50, 200])}
                      >
                        $50-$200
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={priceRange[0] === 200 && priceRange[1] === 500 ? 'bg-primary/10 text-primary' : ''}
                        onClick={() => setPriceRange([200, 500])}
                      >
                        $200+
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="brand" className="border-none">
                <AccordionTrigger className="py-2 font-medium text-lg">Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => 
                            handleBrandChange(brand, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`brand-${brand}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="features" className="border-none">
                <AccordionTrigger className="py-2 font-medium text-lg">Features</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="feature-organic" />
                      <label 
                        htmlFor="feature-organic"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Organic
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="feature-sale" />
                      <label 
                        htmlFor="feature-sale"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        On Sale
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="feature-instock" />
                      <label 
                        htmlFor="feature-instock"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 500]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="text-sm text-muted-foreground">
                {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'}
              </div>
              
              <div className="flex ml-4">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedBrands.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 500) && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium">Active Filters:</span>
                
                {priceRange[0] !== 0 || priceRange[1] !== 500 ? (
                  <Badge variant="secondary" className="flex items-center">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => setPriceRange([0, 500])}
                    >
                      &times;
                    </button>
                  </Badge>
                ) : null}
                
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="flex items-center">
                    {brand}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
                
                <button
                  className="text-sm text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setSelectedBrands([]);
                    setPriceRange([0, 500]);
                  }}
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Product Display */}
          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button 
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 500]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <ProductGrid
              products={displayProducts}
              variant={viewMode === 'list' ? 'horizontal' : 'default'}
              columns={viewMode === 'list' ? 1 : { default: 1, sm: 2, md: 3 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogPage;
