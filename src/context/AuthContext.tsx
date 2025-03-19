
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

interface AuthContextProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  } | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize authentication state
    const initAuth = async () => {
      try {
        // Check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        if (currentSession?.user) {
          setUser({
            id: currentSession.user.id,
            name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || '',
            email: currentSession.user.email || '',
            avatar: null,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          setUser({
            id: newSession.user.id,
            name: newSession.user.user_metadata.name || newSession.user.email?.split('@')[0] || '',
            email: newSession.user.email || '',
            avatar: null,
          });
        } else {
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, allow any email with non-empty password to log in
      if (email && password && password.length >= 6) {
        // Generate a fake session and user
        const fakeUserId = `user_${Math.random().toString(36).substring(2, 10)}`;
        const userName = email.split('@')[0];
        
        // Set user manually without actually using Supabase auth
        setUser({
          id: fakeUserId,
          name: userName,
          email: email,
          avatar: null,
        });
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Please provide a valid email and password (min 6 characters).",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, any valid email and password allows signup
      if (name && email && password && password.length >= 6) {
        // Generate a fake user ID
        const fakeUserId = `user_${Math.random().toString(36).substring(2, 10)}`;
        
        // Set user manually without actually using Supabase auth
        setUser({
          id: fakeUserId,
          name: name,
          email: email,
          avatar: null,
        });
        
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
        
        return true;
      }
      
      toast({
        title: "Signup failed",
        description: "Please provide a valid name, email, and password (min 6 characters).",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      // Simply clear the user state without calling Supabase
      setUser(null);
      setSession(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const value: AuthContextProps = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
