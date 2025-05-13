
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch orders count
  const { data: ordersCount, isLoading: ordersLoading } = useQuery({
    queryKey: ['adminOrdersCount'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  // Get product count from mock data
  const productsCount = products.length;

  // Stats cards data
  const stats = [
    {
      title: "Total Products",
      value: productsCount,
      description: "Products in inventory",
      icon: <Package className="h-8 w-8 text-blue-500" />,
      onClick: () => navigate('/admin/products'),
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "Total Orders",
      value: ordersLoading ? "..." : ordersCount,
      description: "Customer orders",
      icon: <ShoppingBag className="h-8 w-8 text-green-500" />,
      onClick: () => navigate('/admin/orders'),
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Customers",
      value: "Mock",
      description: "Registered users",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      onClick: undefined,
      color: "bg-purple-50 text-purple-700"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow" onClick={stat.onClick}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{stat.title}</CardTitle>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your store with these shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => navigate('/admin/products/new')}>
            Add New Product
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/orders')}>
            View Recent Orders
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
