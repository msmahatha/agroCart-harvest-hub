
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
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    slug: "seeds",
    featured: true
  },
  {
    id: "cat_fertilizers",
    name: "Fertilizers",
    description: "Organic and chemical fertilizers for optimal plant growth",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
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
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    slug: "tools-equipment",
    featured: true
  },
  {
    id: "cat_machinery",
    name: "Machinery",
    description: "Modern farming machinery for efficient agriculture",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    slug: "machinery",
    featured: false
  },
  {
    id: "cat_irrigation",
    name: "Irrigation Systems",
    description: "Water management systems for farms and gardens",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
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
