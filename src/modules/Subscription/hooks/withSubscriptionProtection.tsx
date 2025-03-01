
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { PremiumDialog } from "../components/PremiumDialog";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";

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
          const { data: { session } } = await supabase.auth.getSession();
          setIsAuthenticated(!!session && !!session.user);
        } catch (error) {
          console.error("Oturum kontrolü sırasında hata:", error);
          setIsAuthenticated(false);
        }
      };
      
      checkAuth();
      
      const subscription = supabase.auth.onAuthStateChange((event, session) => {
        setIsAuthenticated(!!session && !!session.user);
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
          setLoading(false);
          return;
        }
        
        try {
          const { hasAccess, status } = await SubscriptionController.checkSubscriptionStatus();
          setHasAccess(hasAccess);
          setStatus(status);
          
          // Deneme süresi bittiyse premium dialog göster
          if (status === "expired") {
            setShowPremiumDialog(true);
          }
        } catch (error) {
          console.error("Abonelik durumu kontrol edilirken bir hata oluştu:", error);
          // Hata durumunda erişime izin ver
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
