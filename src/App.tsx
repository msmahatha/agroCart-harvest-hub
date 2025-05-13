
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage";
import ProductCatalogPage from "./pages/Product/ProductCatalogPage";
import CartPage from "./pages/Cart/CartPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Profile/OrdersPage";
import WishlistPage from "./pages/Profile/WishlistPage";
import SettingsPage from "./pages/Profile/SettingsPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AdminProvider } from "./context/AdminContext";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductsPage from "./pages/Admin/ProductsPage";
import ProductForm from "./pages/Admin/ProductForm";
import AdminOrdersPage from "./pages/Admin/OrdersPage";
import AdminSettingsPage from "./pages/Admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AdminProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/edit/:id" element={<ProductForm />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                  </Route>
                  
                  {/* Customer Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    
                    {/* Authentication Routes */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    
                    {/* Product Routes */}
                    <Route path="products" element={<ProductCatalogPage />} />
                    <Route path="products/category/:categorySlug" element={<ProductCatalogPage />} />
                    <Route path="products/search" element={<ProductCatalogPage />} />
                    <Route path="product/:slug" element={<ProductDetailPage />} />
                    
                    {/* Cart Routes */}
                    <Route path="cart" element={<CartPage />} />
                    
                    {/* Profile Routes */}
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    
                    {/* Static Pages */}
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    
                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AdminProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
