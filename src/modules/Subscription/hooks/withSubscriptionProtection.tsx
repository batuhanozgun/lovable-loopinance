
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { PremiumDialog } from "../components/PremiumDialog";

export function withSubscriptionProtection<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const [showPremiumDialog, setShowPremiumDialog] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

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
      return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;
    }

    // Premium dialogu kapatıldıysa ve erişim yoksa, salt görüntüleme modunda göster
    if (!hasAccess && !showPremiumDialog && status === "expired") {
      // Salt görüntüleme modunda Component'i render et
      return (
        <>
          <Component {...props} />
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowPremiumDialog(true)}
          >
            <div 
              className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Premium'a Geçiş Zamanı</h2>
              <p className="mb-6">Deneme süreniz sona erdi. Tüm özelliklere erişmek için Premium'a geçin.</p>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => setShowPremiumDialog(true)}
              >
                Premium'a Geç
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Component {...props} />
        <PremiumDialog 
          open={showPremiumDialog} 
          onOpenChange={setShowPremiumDialog} 
        />
      </>
    );
  };
}
