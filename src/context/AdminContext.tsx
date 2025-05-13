
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AdminContextProps {
  adminUser: AdminUser | null;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextProps>({
  adminUser: null,
  logout: () => {},
  isLoading: true,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const checkAdminSession = () => {
      try {
        const savedSession = localStorage.getItem('adminSession');
        
        if (savedSession) {
          const session = JSON.parse(savedSession);
          
          // Check if the session has expired (24 hours)
          const sessionTime = new Date(session.timestamp).getTime();
          const currentTime = new Date().getTime();
          const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          
          if (currentTime - sessionTime < sessionDuration) {
            setAdminUser(session);
          } else {
            // Session expired
            localStorage.removeItem('adminSession');
          }
        }
      } catch (error) {
        console.error("Error checking admin session:", error);
        localStorage.removeItem('adminSession');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminSession();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminSession');
    setAdminUser(null);
  };

  return (
    <AdminContext.Provider value={{ adminUser, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};
