
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { SessionService } from "@/modules/UserManagement/auth";
import { useToast } from "./hooks/use-toast";
import "@/i18n/config";
import { AppRoutes } from "@/modules/Routing";

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
    setIsLoading(true);

    const subscription = SessionService.onAuthStateChange((authState) => {
      setIsAuthenticated(authState);
      setIsLoading(false);
    });

    const init = async () => {
      try {
        const sessionResponse = await SessionService.getCurrentSession();

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

    init();

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
        <AppRoutes isAuthenticated={isAuthenticated} isLoading={isLoading} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
