
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full border border-border/60 shadow-sm">
        <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">404</h1>
          <p className="text-muted-foreground mb-6">
            Aradığınız sayfa bulunamadı
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
              asChild
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Ana Sayfa</span>
              </Link>
            </Button>
            
            <Button
              className="w-full sm:w-auto flex items-center gap-2"
              asChild
            >
              <Link to="javascript:history.back()">
                <ArrowLeft className="h-4 w-4" />
                <span>Geri Dön</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
