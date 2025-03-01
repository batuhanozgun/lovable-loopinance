
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "@/modules/UserManagement/Signup/views/SignupView";
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { useState, useEffect } from "react";
import { AuthService } from "@/modules/UserManagement/common/services/AuthService";
import { supabase } from "@/lib/supabase";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import "@/i18n/config";
import { TrialBanner } from "./modules/Subscription/components/TrialBanner";
import ManageSubscriptionView from "./modules/Subscription/views/ManageSubscriptionView";
import { withSubscriptionProtection } from "./modules/Subscription/hooks/withSubscriptionProtection";

const queryClient = new QueryClient();

// Abonelik Ayarları sayfasını subscription korumasıyla sarma
const ProtectedManageSubscriptionView = withSubscriptionProtection(ManageSubscriptionView);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // İlk yükleme sırasında mevcut session'ı kontrol et
    const checkInitialSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session && !!session.user);
      } catch (error) {
        console.error("Session kontrolü sırasında bir hata oluştu:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkInitialSession();
    
    // Auth state değişikliklerini dinle
    const subscription = AuthService.onAuthStateChange((authState) => {
      setIsAuthenticated(authState);
      setIsLoading(false);
    });
    
    return () => {
      subscription.data?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        {isAuthenticated && <TrialBanner />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Index />
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Index /> : <Navigate to="/login" />}
          />
          <Route
            path="/subscription"
            element={isAuthenticated ? <ProtectedManageSubscriptionView /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
