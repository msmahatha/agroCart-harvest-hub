-- Update the handle_new_user function to set the password for our admin user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    CASE 
      WHEN NEW.email = 'msmahatha007@gmail.com' THEN 'admin'
      ELSE 'user'
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    role = CASE 
      WHEN NEW.email = 'msmahatha007@gmail.com' THEN 'admin'
      ELSE profiles.role
    END;
  RETURN NEW;
END;
$function$;

-- Also ensure our existing profile has the correct role
UPDATE public.profiles 
SET role = 'admin', email = 'msmahatha007@gmail.com' 
WHERE email = 'msmahatha007@gmail.com' OR id IN (
  SELECT id FROM public.profiles WHERE email = 'msmahatha007@gmail.com'
);

-- Create products table for persistent storage
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  sale_price numeric,
  image text,
  category_id text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  brand text,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_organic boolean DEFAULT false,
  tags text[],
  specifications jsonb,
  slug text UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on products table
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

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();