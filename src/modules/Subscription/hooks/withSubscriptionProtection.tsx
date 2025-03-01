
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { PremiumDialog } from "../components/PremiumDialog";
import { useTranslation } from "react-i18next";
import { AuthService } from "@/modules/UserManagement/common/services/AuthService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { supabase } from "@/integrations/supabase/client"; // Supabase client'ı doğrudan kullanalım

// Logger instance
const logger = LoggerService.getInstance("SubscriptionProtection");

export function withSubscriptionProtection<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [showPremiumDialog, setShowPremiumDialog] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const { t } = useTranslation("subscription.common");

    // Kullanıcının oturum durumunu kontrol et
    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Mevcut session'ı kontrol edelim
          const { data } = await supabase.auth.getSession();
          setIsAuthenticated(!!data.session);
          
          logger.debug("Oturum durumu kontrolü tamamlandı", { 
            isAuthenticated: !!data.session 
          });
        } catch (error) {
          logger.error("Oturum kontrolü sırasında hata:", error);
          setIsAuthenticated(false);
        }
      };
      
      checkAuth();
      
      // Auth durumu değişikliklerini dinleyelim
      const subscription = AuthService.onAuthStateChange((authState) => {
        setIsAuthenticated(authState);
        logger.debug("Auth durumu değişti", { isAuthenticated: authState });
      });
      
      return () => {
        subscription.data?.subscription.unsubscribe();
      };
    }, []);

    // Abonelik durumunu kontrol et
    useEffect(() => {
      const checkAccess = async () => {
        if (isAuthenticated === null) return;
        
        if (!isAuthenticated) {
          logger.debug("Kullanıcı oturum açmamış, login sayfasına yönlendirilecek");
          setLoading(false);
          return;
        }
        
        try {
          logger.debug("Abonelik durumu kontrol ediliyor");
          const { hasAccess, status } = await SubscriptionController.checkSubscriptionStatus();
          
          setHasAccess(hasAccess);
          setStatus(status);
          
          logger.debug("Abonelik durumu alındı", { hasAccess, status });
          
          // Deneme süresi bittiyse premium dialog göster
          if (status === "expired") {
            setShowPremiumDialog(true);
          }
        } catch (error) {
          logger.error("Abonelik durumu kontrol edilirken bir hata oluştu:", error);
          // Hataya rağmen kullanıcıya erişim izni verelim (daha iyi kullanıcı deneyimi için)
          setHasAccess(true);
        } finally {
          setLoading(false);
        }
      };

      checkAccess();
    }, [isAuthenticated]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-muted-foreground">{t("loading")}</p>
          </div>
        </div>
      );
    }

    if (isAuthenticated === false) {
      logger.debug("Oturum açılmamış, login sayfasına yönlendiriliyor");
      return <Navigate to="/login" />;
    }

    return (
      <>
        <Component {...props} />
        {status === "expired" && (
          <PremiumDialog 
            open={showPremiumDialog} 
            onOpenChange={setShowPremiumDialog} 
            forceOpen={true} 
          />
        )}
      </>
    );
  };
}
