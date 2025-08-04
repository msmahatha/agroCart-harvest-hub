-- Get the user ID and create profile for the admin user
INSERT INTO public.profiles (id, email, name, role)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', email) as name,
    'admin' as role
FROM auth.users 
WHERE email = 'msmahatha007@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    email = EXCLUDED.email,
    name = EXCLUDED.name;