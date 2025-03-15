
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user data
const mockUser = {
  id: "user123",
  name: "Ram",
  email: "ram@example.com",
  avatar: null, // No avatar photo to avoid showing other person's photo
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // For demo, we'll always be logged in initially
  const [user, setUser] = useState(mockUser);
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app this would validate against a backend
    if (email && password.length >= 8) {
      // Simple validation for demo purposes
      setUser({
        id: "user123",
        name: "Ram",
        email: email,
        avatar: null,
      });
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup - in a real app this would create a user in the backend
    if (name && email && password.length >= 8) {
      // Simple validation for demo purposes
      setUser({
        id: "user123",
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
    
    return false;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const value: AuthContextProps = {
    user,
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
