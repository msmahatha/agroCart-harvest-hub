import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  } | null;
  login: (user: { id: string; name: string; email: string; avatar: string | null }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
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
  // For demo, we'll always be logged in
  const [user, setUser] = useState(mockUser);

  const login = (user: { id: string; name: string; email: string; avatar: string | null }) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextProps = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
