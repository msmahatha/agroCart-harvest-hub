export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  gallery?: string[];
  categoryId: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isOrganic?: boolean;
  brand?: string;
  tags?: string[];
  featured?: boolean;
  slug: string;
  specifications?: { [key: string]: string };
}

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Premium Wheat Seeds",
    description: "High-yield wheat seeds perfect for a variety of climate conditions. These premium seeds have been carefully selected to provide optimal growth and resistance to common diseases.",
    price: 129.99,
    salePrice: 99.99,
    image: "https://www.bombaysuperseeds.com/images/prod/wheat/bombay-701.webp",
    gallery: [
      "https://www.bombaysuperseeds.com/images/prod/wheat/bombay-701.webp",
      "https://m.media-amazon.com/images/I/714xCG6CxKL._AC_UF1000,1000_QL80_.jpg"
    ],
    categoryId: "cat_seeds",
    stock: 120,
    rating: 4.8,
    reviewCount: 56,
    isOrganic: false,
    brand: "GrowWell",
    tags: ["wheat", "seeds", "high-yield"],
    featured: true,
    slug: "premium-wheat-seeds",
    specifications: {
      "Weight": "5 kg",
      "Germination Rate": "95%",
      "Seed Count": "~5000 seeds",
      "Growing Season": "All year",
      "Harvest Time": "90-120 days"
    }
  },
  {
    id: "prod_002",
    name: "Organic Compost Fertilizer",
    description: "100% organic compost fertilizer, perfect for all types of plants. Enriches soil and promotes healthy plant growth without harmful chemicals.",
    price: 49.99,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRzn8rANYWyXBRITuA4bgClVukHJQC5J-Y055x04A1ILsaKKFt-LXzEw_Qym24UhOakz7vXBws3dE1JNOhG3xjjNgoJgw_M0Ee8fvhgWfZqjQnDRLMmmhDmHg&usqp=CAE",
    categoryId: "cat_fertilizers",
    stock: 85,
    rating: 4.9,
    reviewCount: 123,
    isOrganic: true,
    brand: "EcoGrow",
    tags: ["organic", "fertilizer", "compost"],
    featured: true,
    slug: "organic-compost-fertilizer",
    specifications: {
      "Weight": "20 kg",
      "Type": "Organic",
      "NPK Ratio": "5-5-5",
      "Suitable For": "All plants",
      "Usage": "Apply 1kg per 10 square meters"
    }
  },
  {
    id: "prod_003",
    name: "Advanced Irrigation Kit",
    description: "Complete drip irrigation system for efficient water usage. Perfect for small to medium gardens and farms.",
    price: 259.99,
    salePrice: 199.99,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSgKS13DVu4iPtM3l0oqRZNt2YgLfOUvDvle_uUm53ZME8KUmnlXeE83qCfaiFpccFWIWRdXKmVK4vUdbv4_qVMkJOaIqEHqMHTQiejdpOyCPpjFrqiey4L&usqp=CAE",
    categoryId: "cat_irrigation",
    stock: 32,
    rating: 4.7,
    reviewCount: 87,
    brand: "AquaFlow",
    tags: ["irrigation", "water-saving", "kit"],
    featured: true,
    slug: "advanced-irrigation-kit",
    specifications: {
      "Coverage": "Up to 500 square meters",
      "Hose Length": "100 meters",
      "Components": "Drippers, connectors, timer",
      "Material": "UV-resistant plastic",
      "Warranty": "2 years"
    }
  },
  {
    id: "prod_004",
    name: "Premium Garden Tool Set",
    description: "Complete set of high-quality garden tools made with durable materials. Includes pruners, trowel, fork, and more.",
    price: 89.99,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSjWHiRD7LY0xhMGJCQsOw4Gk-G7fwQpmULygvSRc2oWfcmVzk9PmNED1orAygnkKXXyNwLFA2UnEiaeCvb4bnon-Jf4yKO9iVJhJm1vLCScbANEzhdCK333w&usqp=CAE",
    categoryId: "cat_tools",
    stock: 45,
    rating: 4.6,
    reviewCount: 92,
    brand: "GardenPro",
    tags: ["tools", "gardening", "set"],
    featured: false,
    slug: "premium-garden-tool-set",
    specifications: {
      "Pieces": "7 tools",
      "Material": "Stainless steel with oak handles",
      "Includes": "Trowel, fork, pruner, weeder, rake, hoe, gloves",
      "Carrying Case": "Canvas bag included",
      "Warranty": "Lifetime warranty"
    }
  },
  {
    id: "prod_005",
    name: "Eco-Friendly Pest Control Spray",
    description: "Natural pest control solution that's safe for beneficial insects and the environment. Effective against common garden pests.",
    price: 32.99,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRxJlwghNpKI-XxLr7QVxAoSXj_PM3CrRnclGnJ8oWpNWks32OPJsiKNb1DZQVmNLquEVuqz_1sXkfWKSbF4_c3FRR8fMjFn5v4OgUowLiaiTAxNIrX7hTzUw&usqp=CAE",
    categoryId: "cat_pesticides",
    stock: 110,
    rating: 4.4,
    reviewCount: 67,
    isOrganic: true,
    brand: "NatureDef",
    tags: ["organic", "pest-control", "spray"],
    featured: false,
    slug: "eco-friendly-pest-control",
    specifications: {
      "Volume": "1 liter",
      "Active Ingredients": "Neem oil, essential oils",
      "Target Pests": "Aphids, whiteflies, mites",
      "Application": "Spray every 7-10 days",
      "Safe For": "Edible plants, pets, beneficial insects"
    }
  },
  {
    id: "prod_006",
    name: "Mini Cultivator Machine",
    description: "Compact and powerful cultivator for small farms and large gardens. Easy to operate and maintain.",
    price: 699.99,
    salePrice: 599.99,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/grass-trimmer/u/j/5/manual-63cc-mini-power-tiller-cultivator-weeder-used-for-weeding-original-imah4gp4z4qezbur.jpeg?q=90&crop=false",
    categoryId: "cat_machinery",
    stock: 15,
    rating: 4.7,
    reviewCount: 38,
    brand: "FarmTech",
    tags: ["machinery", "cultivator", "small-farm"],
    featured: true,
    slug: "mini-cultivator-machine",
    specifications: {
      "Engine": "4-stroke, 5HP",
      "Working Width": "50 cm",
      "Fuel Type": "Unleaded gasoline",
      "Weight": "35 kg",
      "Warranty": "3 years"
    }
  },
  {
    id: "prod_007",
    name: "Organic Tomato Seeds",
    description: "Heirloom tomato seeds grown organically for the best flavor and yield. Perfect for home gardens.",
    price: 19.99,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQaSMYj7RT1YilLTrG06aG28W88YZcinigfdKFabt-j5izt9_5EYscak9RNCaf_xrwNc_IpJPOWlBUcypBjVh34rnY7tSQ8g87PKUvsZLeJaYPkvGVrEAcT2yXr&usqp=CAE",
    categoryId: "cat_seeds",
    stock: 78,
    rating: 4.9,
    reviewCount: 112,
    isOrganic: true,
    brand: "SeedWell",
    tags: ["organic", "tomato", "seeds", "heirloom"],
    featured: false,
    slug: "organic-tomato-seeds",
    specifications: {
      "Quantity": "100 seeds",
      "Variety": "Beefsteak",
      "Germination Rate": "92%",
      "Growing Season": "Spring to Summer",
      "Days to Maturity": "75-85 days"
    }
  },
  {
    id: "prod_008",
    name: "Professional Pruning Shears",
    description: "High-quality pruning shears with ergonomic design for comfortable use. Perfect for precision cutting of branches and stems.",
    price: 45.99,
    image: "https://m.media-amazon.com/images/I/61IrWWyEjvL._AC_UF1000,1000_QL80_.jpg",
    categoryId: "cat_tools",
    stock: 62,
    rating: 4.8,
    reviewCount: 94,
    brand: "CutMaster",
    tags: ["pruning", "shears", "gardening"],
    featured: false,
    slug: "professional-pruning-shears",
    specifications: {
      "Blade Material": "Hardened steel",
      "Handle": "Ergonomic rubber grip",
      "Cutting Capacity": "Up to 20mm diameter",
      "Lock Mechanism": "Safety lock included",
      "Length": "22 cm"
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getOnSaleProducts(): Product[] {
  return products.filter(product => product.salePrice !== undefined);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
}