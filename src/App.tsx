
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
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Product Routes */}
                <Route path="/products" element={<ProductCatalogPage />} />
                <Route path="/products/category/:categorySlug" element={<ProductCatalogPage />} />
                <Route path="/products/search" element={<ProductCatalogPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                
                {/* Cart Routes */}
                <Route path="/cart" element={<CartPage />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
