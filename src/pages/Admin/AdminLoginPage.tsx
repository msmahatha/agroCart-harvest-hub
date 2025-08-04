
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Loader2, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Direct login attempt first
      const success = await login(data.email, data.password);
      
      if (success) {
        // Check if the logged-in user is an admin
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          if (profile?.role === 'admin') {
            toast({
              title: "Admin login successful",
              description: "Welcome to the admin dashboard",
            });
            navigate('/admin/dashboard');
          } else {
            setLoginError("Access denied. Admin privileges required.");
            await supabase.auth.signOut();
          }
        }
      } else {
        // If login failed, try the development workaround for the specific admin email
        if (data.email === 'msmahatha007@gmail.com' && data.password === 'admin123') {
          try {
            // Force create session by using the admin service
            const { data: authData, error: loginError } = await supabase.auth.signInWithPassword({
              email: data.email,
              password: data.password,
            });

            if (!loginError && authData.user) {
              // Create profile if it doesn't exist
              const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                  id: authData.user.id,
                  email: authData.user.email,
                  name: authData.user.email,
                  role: 'admin'
                });

              if (!profileError) {
                toast({
                  title: "Admin login successful", 
                  description: "Welcome to the admin dashboard",
                });
                navigate('/admin/dashboard');
                return;
              }
            }
          } catch (directLoginError) {
            console.error("Direct login attempt failed:", directLoginError);
          }
        }
        
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-20 px-4">
      <div className="flex flex-col items-center mb-8">
        <Lock className="text-primary h-10 w-10 mb-2" />
        <h1 className="text-2xl font-display font-semibold">AgroCart Admin</h1>
        <p className="text-muted-foreground">Login to admin dashboard</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your admin credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">🔐 Admin Login Credentials:</p>
                <div className="bg-blue-100 p-3 rounded-md">
                  <p><strong>Email:</strong> <code>msmahatha007@gmail.com</code></p>
                  <p><strong>Password:</strong> <code>admin123</code></p>
                </div>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={async () => {
                      try {
                        const { error } = await supabase.auth.signUp({
                          email: 'msmahatha007@gmail.com',
                          password: 'admin123',
                          options: {
                            emailRedirectTo: `${window.location.origin}/`
                          }
                        });
                        if (error) {
                          if (error.message.includes('already registered')) {
                            toast({ title: "Admin account already exists", description: "You can now login with the credentials above" });
                          } else {
                            toast({ title: "Error", description: error.message, variant: "destructive" });
                          }
                        } else {
                          toast({ title: "Admin account created", description: "You can now login with the credentials above" });
                        }
                      } catch (err) {
                        toast({ title: "Error", description: "Failed to create admin account", variant: "destructive" });
                      }
                    }}
                  >
                    Create Admin Account
                  </Button>
                </div>
                <p className="text-sm text-blue-600 mt-2">💡 Click "Create Admin Account" first, then use the credentials above to login</p>
              </div>
            </AlertDescription>
          </Alert>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@example.com" 
                        type="email" 
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="current-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginError && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {loginError}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login as Admin"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-sm"
          >
            Back to main site
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
