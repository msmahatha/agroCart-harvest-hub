-- First, let's check if the user exists in auth.users
-- If not, we need to create them manually

-- Create the admin user in auth.users (this requires admin privileges)
-- Since we can't directly insert into auth.users, we'll use a different approach

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