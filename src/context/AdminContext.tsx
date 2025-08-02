
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface AdminContextProps {
  isAdmin: boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextProps>({
  isAdmin: false,
  isLoading: true,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && user.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    }
  }, [user, loading]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};
