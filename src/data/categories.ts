export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: "cat_seeds",
    name: "Seeds",
    description: "High-quality seeds for all types of crops",
    image: "https://articles-1mg.gumlet.io/articles/wp-content/uploads/2016/12/seeds.jpg?compress=true&quality=80&w=640&dpr=2.6",
    slug: "seeds",
    featured: true
  },
  {
    id: "cat_fertilizers",
    name: "Fertilizers",
    description: "Organic and chemical fertilizers for optimal plant growth",
    image: "https://krishibazaar.in/public/blogs/Zn1qjK8JMweyPhTNgrFvBigzOtuAjyniPrJ3L8E6.jpg",
    slug: "fertilizers",
    featured: true
  },
  {
    id: "cat_pesticides",
    name: "Pesticides",
    description: "Effective pest control solutions for your crops",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    slug: "pesticides",
    featured: false
  },
  {
    id: "cat_tools",
    name: "Tools & Equipment",
    description: "Essential tools for farming and gardening",
    image: "https://m.media-amazon.com/images/I/61IrWWyEjvL._AC_UF1000,1000_QL80_.jpg",
    slug: "tools-equipment",
    featured: true
  },
  {
    id: "cat_machinery",
    name: "Machinery",
    description: "Modern farming machinery for efficient agriculture",
    image: "https://m.media-amazon.com/images/I/81wGnmbbDQL.jpg",
    slug: "machinery",
    featured: false
  },
  {
    id: "cat_irrigation",
    name: "Irrigation Systems",
    description: "Water management systems for farms and gardens",
    image: "https://m.media-amazon.com/images/I/81wGnmbbDQL.jpg",
    slug: "irrigation-systems",
    featured: true
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return categories.filter(category => category.featured);
}