-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  image TEXT NOT NULL,
  gallery TEXT[],
  category_id TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 4.0,
  review_count INTEGER DEFAULT 0,
  is_organic BOOLEAN DEFAULT false,
  brand TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  slug TEXT NOT NULL UNIQUE,
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (is_admin());

-- Create trigger for automatic slug generation and updated_at
CREATE OR REPLACE FUNCTION public.generate_slug_from_name()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = lower(replace(replace(replace(NEW.name, ' ', '-'), '.', ''), ',', ''));
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER update_products_slug_and_timestamp
BEFORE INSERT OR UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.generate_slug_from_name();

-- Insert existing mock products into the database
INSERT INTO public.products (id, name, description, price, sale_price, image, gallery, category_id, stock, rating, review_count, is_organic, brand, tags, featured, slug, specifications) VALUES
('prod_001', 'Premium Wheat Seeds', 'High-yield wheat seeds perfect for a variety of climate conditions. These premium seeds have been carefully selected to provide optimal growth and resistance to common diseases.', 129.99, 99.99, 'https://www.bombaysuperseeds.com/images/prod/wheat/bombay-701.webp', ARRAY['https://www.bombaysuperseeds.com/images/prod/wheat/bombay-701.webp', 'https://m.media-amazon.com/images/I/714xCG6CxKL._AC_UF1000,1000_QL80_.jpg'], 'cat_seeds', 120, 4.8, 56, false, 'GrowWell', ARRAY['wheat', 'seeds', 'high-yield'], true, 'premium-wheat-seeds', '{"Weight": "5 kg", "Germination Rate": "95%", "Seed Count": "~5000 seeds", "Growing Season": "All year", "Harvest Time": "90-120 days"}'),

('prod_002', 'Organic Compost Fertilizer', '100% organic compost fertilizer, perfect for all types of plants. Enriches soil and promotes healthy plant growth without harmful chemicals.', 49.99, NULL, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRzn8rANYWyXBRITuA4bgClVukHJQC5J-Y055x04A1ILsaKKFt-LXzEw_Qym24UhOakz7vXBws3dE1JNOhG3xjjNgoJgw_M0Ee8fvhgWfZqjQnDRLMmmhDmHg&usqp=CAE', NULL, 'cat_fertilizers', 85, 4.9, 123, true, 'EcoGrow', ARRAY['organic', 'fertilizer', 'compost'], true, 'organic-compost-fertilizer', '{"Weight": "20 kg", "Type": "Organic", "NPK Ratio": "5-5-5", "Suitable For": "All plants", "Usage": "Apply 1kg per 10 square meters"}'),

('prod_003', 'Advanced Irrigation Kit', 'Complete drip irrigation system for efficient water usage. Perfect for small to medium gardens and farms.', 259.99, 199.99, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSgKS13DVu4iPtM3l0oqRZNt2YgLfOUvDvle_uUm53ZME8KUmnlXeE83qCfaiFpccFWIWRdXKmVK4vUdbv4_qVMkJOaIqEHqMHTQiejdpOyCPpjFrqiey4L&usqp=CAE', NULL, 'cat_irrigation', 32, 4.7, 87, false, 'AquaFlow', ARRAY['irrigation', 'water-saving', 'kit'], true, 'advanced-irrigation-kit', '{"Coverage": "Up to 500 square meters", "Hose Length": "100 meters", "Components": "Drippers, connectors, timer", "Material": "UV-resistant plastic", "Warranty": "2 years"}'),

('prod_004', 'Premium Garden Tool Set', 'Complete set of high-quality garden tools made with durable materials. Includes pruners, trowel, fork, and more.', 89.99, NULL, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSjWHiRD7LY0xhMGJCQsOw4Gk-G7fwQpmULygvSRc2oWfcmVzk9PmNED1orAygnkKXXyNwLFA2UnEiaeCvb4bnon-Jf4yKO9iVJhJm1vLCScbANEzhdCK333w&usqp=CAE', NULL, 'cat_tools', 45, 4.6, 92, false, 'GardenPro', ARRAY['tools', 'gardening', 'set'], false, 'premium-garden-tool-set', '{"Pieces": "7 tools", "Material": "Stainless steel with oak handles", "Includes": "Trowel, fork, pruner, weeder, rake, hoe, gloves", "Carrying Case": "Canvas bag included", "Warranty": "Lifetime warranty"}'),

('prod_005', 'Eco-Friendly Pest Control Spray', 'Natural pest control solution that''s safe for beneficial insects and the environment. Effective against common garden pests.', 32.99, NULL, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRxJlwghNpKI-XxLr7QVxAoSXj_PM3CrRnclGnJ8oWpNWks32OPJsiKNb1DZQVmNLquEVuqz_1sXkfWKSbF4_c3FRR8fMjFn5v4OgUowLiaiTAxNIrX7hTzUw&usqp=CAE', NULL, 'cat_pesticides', 110, 4.4, 67, true, 'NatureDef', ARRAY['organic', 'pest-control', 'spray'], false, 'eco-friendly-pest-control', '{"Volume": "1 liter", "Active Ingredients": "Neem oil, essential oils", "Target Pests": "Aphids, whiteflies, mites", "Application": "Spray every 7-10 days", "Safe For": "Edible plants, pets, beneficial insects"}'),

('prod_006', 'Mini Cultivator Machine', 'Compact and powerful cultivator for small farms and large gardens. Easy to operate and maintain.', 699.99, 599.99, 'https://rukminim2.flixcart.com/image/850/1000/xif0q/grass-trimmer/u/j/5/manual-63cc-mini-power-tiller-cultivator-weeder-used-for-weeding-original-imah4gp4z4qezbur.jpeg?q=90&crop=false', NULL, 'cat_machinery', 15, 4.7, 38, false, 'FarmTech', ARRAY['machinery', 'cultivator', 'small-farm'], true, 'mini-cultivator-machine', '{"Engine": "4-stroke, 5HP", "Working Width": "50 cm", "Fuel Type": "Unleaded gasoline", "Weight": "35 kg", "Warranty": "3 years"}'),

('prod_007', 'Organic Tomato Seeds', 'Heirloom tomato seeds grown organically for the best flavor and yield. Perfect for home gardens.', 19.99, NULL, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQaSMYj7RT1YilLTrG06aG28W88YZcinigfdKFabt-j5izt9_5EYscak9RNCaf_xrwNc_IpJPOWlBUcypBjVh34rnY7tSQ8g87PKUvsZLeJaYPkvGVrEAcT2yXr&usqp=CAE', NULL, 'cat_seeds', 78, 4.9, 112, true, 'SeedWell', ARRAY['organic', 'tomato', 'seeds', 'heirloom'], false, 'organic-tomato-seeds', '{"Quantity": "100 seeds", "Variety": "Beefsteak", "Germination Rate": "92%", "Growing Season": "Spring to Summer", "Days to Maturity": "75-85 days"}'),

('prod_008', 'Professional Pruning Shears', 'High-quality pruning shears with ergonomic design for comfortable use. Perfect for precision cutting of branches and stems.', 45.99, NULL, 'https://m.media-amazon.com/images/I/61IrWWyEjvL._AC_UF1000,1000_QL80_.jpg', NULL, 'cat_tools', 62, 4.8, 94, false, 'CutMaster', ARRAY['pruning', 'shears', 'gardening'], false, 'professional-pruning-shears', '{"Blade Material": "Hardened steel", "Handle": "Ergonomic rubber grip", "Cutting Capacity": "Up to 20mm diameter", "Lock Mechanism": "Safety lock included", "Length": "22 cm"}');