
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "@/modules/UserManagement/Signup/views/SignupView";
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { useState, useEffect } from "react";
import { SessionService } from "@/modules/UserManagement/auth";
import { Layout } from "@/modules/AppLayout/components/Layout";
import { DashboardView } from "@/modules/Dashboard";
import { ProfileView } from "@/modules/UserManagement/Profile";
import { SubscriptionView } from "@/modules/Subscription";
import { 
  SubscriptionDashboardView,
  SubscriptionPlansView,
  SubscriptionBillingView,
  SubscriptionSettingsView
} from "@/modules/Subscription/views/management";
import Landing from "./pages/Landing";
import PricingPage from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import "@/i18n/config";
import { useToast } from "./hooks/use-toast";
import { CategoriesView } from "@/modules/Categories/views/CategoriesView";
import CategoryTemplatesView from "@/modules/CategoryTemplates/views/CategoryTemplatesView";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

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
    const checkInitialSession = async () => {
      try {
        setIsLoading(true);
        
        const timeoutId = setTimeout(() => {
          console.log("Session kontrolü zaman aşımına uğradı, varsayılan olarak oturum açılmamış kabul ediliyor");
          setIsAuthenticated(false);
          setIsLoading(false);
        }, 5000);
        
        const sessionResponse = await SessionService.getCurrentSession();
        
        clearTimeout(timeoutId);
        
        if (!sessionResponse.success) {
          console.error("Session kontrolü sırasında bir hata oluştu:", sessionResponse.error);
          toast({
            title: "Oturum kontrolü hatası",
            description: "Oturum bilgileriniz kontrol edilirken bir sorun oluştu. Lütfen tekrar giriş yapın.",
            variant: "destructive",
          });
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(sessionResponse.isAuthenticated);
        }
      } catch (error) {
        console.error("Session kontrolü sırasında bir hata oluştu:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkInitialSession();
    
    const subscription = SessionService.onAuthStateChange((authState) => {
      setIsAuthenticated(authState);
      setIsLoading(false);
    });
    
    return () => {
      subscription.data?.subscription.unsubscribe();
    };
  }, [toast]);

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
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout>
                  <DashboardView />
                </Layout>
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/pricing"
            element={<PricingPage />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <DashboardView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Layout>
                  <ProfileView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/categories"
            element={
              isAuthenticated ? (
                <Layout>
                  <CategoriesView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category-templates"
            element={
              isAuthenticated ? (
                <Layout>
                  <CategoryTemplatesView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription"
            element={
              isAuthenticated ? (
                <Layout>
                  <SubscriptionView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <SubscriptionDashboardView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription/plans"
            element={
              isAuthenticated ? (
                <Layout>
                  <SubscriptionPlansView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription/billing"
            element={
              isAuthenticated ? (
                <Layout>
                  <SubscriptionBillingView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/subscription/settings"
            element={
              isAuthenticated ? (
                <Layout>
                  <SubscriptionSettingsView />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Layout>
                  <NotFound />
                </Layout>
              ) : (
                <NotFound />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
