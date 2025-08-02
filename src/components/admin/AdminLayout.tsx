
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LogOut, 
  Menu, 
  Package, 
  ShoppingBag, 
  Settings, 
  LayoutDashboard,
  User,
  AlertCircle
} from 'lucide-react';

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated or not admin
  React.useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading || !user || !isAdmin) {
    return null; // Don't render anything while loading or redirecting
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <AdminSidebar onLogout={handleLogout} />
              </SheetContent>
            </Sheet>
            <h1 
              className="text-xl font-bold cursor-pointer" 
              onClick={() => navigate('/admin/dashboard')}
            >
              AgroKart Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 mr-6 sticky top-20 self-start">
          <AdminSidebar onLogout={handleLogout} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Sidebar Component
const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <LayoutDashboard className="h-4 w-4 mr-3" />, 
      onClick: () => navigate('/admin/dashboard') 
    },
    { 
      title: 'Products', 
      icon: <Package className="h-4 w-4 mr-3" />, 
      onClick: () => navigate('/admin/products') 
    },
    { 
      title: 'Orders', 
      icon: <ShoppingBag className="h-4 w-4 mr-3" />, 
      onClick: () => navigate('/admin/orders') 
    },
    { 
      title: 'Settings', 
      icon: <Settings className="h-4 w-4 mr-3" />, 
      onClick: () => navigate('/admin/settings') 
    },
  ];

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className="w-full justify-start"
            onClick={item.onClick}
          >
            {item.icon}
            {item.title}
          </Button>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminLayout;
