
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { PremiumDialog } from "../components/PremiumDialog";
import { useTranslation } from "react-i18next";

export function withSubscriptionProtection<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [showPremiumDialog, setShowPremiumDialog] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const { t } = useTranslation("subscription.common");

    useEffect(() => {
      const checkAccess = async () => {
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
    }, []);

    if (loading) {
      return <div className="flex justify-center items-center h-screen">{t("loading")}</div>;
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
