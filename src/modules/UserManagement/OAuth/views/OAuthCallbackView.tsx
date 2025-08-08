// OAuth sağlayıcısından dönüş sonrası oturumu doğrulayan ve yönlendiren sayfa
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const OAuthCallbackView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const run = async () => {
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        toast({
          title: "Giriş tamamlanamadı",
          description: errorDescription || "OAuth işlemi sırasında bir hata oluştu.",
          variant: "destructive",
        });
        navigate("/login", { replace: true });
        return;
      }

      // Session'ı kontrol et ve uygun sayfaya yönlendir
      const { data } = await supabase.auth.getSession();
      const hasUser = !!data.session?.user;

      navigate(hasUser ? "/dashboard" : "/login", { replace: true });
    };

    run();
  }, [navigate, searchParams, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium text-muted-foreground">Hesabınıza bağlanılıyor...</p>
      </div>
    </div>
  );
};
