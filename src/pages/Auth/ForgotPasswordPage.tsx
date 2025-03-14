
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    
    // Simulate API call for password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-md py-20 px-4">
      <div className="flex flex-col items-center mb-8">
        <Leaf className="text-primary h-10 w-10 mb-2" />
        <h1 className="text-2xl font-display font-semibold">Reset Your Password</h1>
        <p className="text-muted-foreground">We'll send you instructions to reset your password</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
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
                          placeholder="you@example.com" 
                          type="email" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset instructions...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center py-4 space-y-4">
              <CheckCircle className="h-12 w-12 text-primary" />
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-center text-muted-foreground">
                We've sent password reset instructions to your email address. Please check your inbox.
              </p>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setIsSubmitted(false)}
              >
                Try another email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="text-sm text-primary hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
