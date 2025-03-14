
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user database
const MOCK_USERS = [
  {
    id: 'user_1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?u=demo@example.com',
  },
];

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          toast.success(`Welcome back, ${foundUser.name}!`);
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (userExists) {
          toast.error("Email already in use");
          resolve(false);
        } else {
          const newUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            password,
            avatar: `https://i.pravatar.cc/150?u=${email}`,
          };
          
          // In a real app, we would add to database
          MOCK_USERS.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          toast.success("Account created successfully!");
          resolve(true);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
