
import React from "react";
import { AlertCircle, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { useSubscription } from "../hooks/useSubscription";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast"; // Doğru import yolu

export const TrialBanner: React.FC = () => {
  const { status, remainingDays, isLoading, plan } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const { t } = useTranslation(["subscription.common", "subscription.notifications"]);
  
  // Yükseltme işlemi
  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      toast({
        title: t("Subscription.notifications.success.title"),
        description: t("Subscription.notifications.success.upgraded", { plan: "Premium" }),
        variant: "default"
      });
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
      toast({
        title: t("Subscription.notifications.error.title"),
        description: error instanceof Error ? error.message : t("Subscription.notifications.error.fallback"),
        variant: "destructive"
      });
    } finally {
      setIsUpgrading(false);
    }
  };
  
  // Banner'ın arka plan rengi ve mesajı için durum bazlı değişkenler
  const getBannerClass = () => {
    if (status === "premium") return "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-900";
    if (status === "expired") return "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-900";
    
    // Trial durumuna göre farklı arka planlar
    if (remainingDays && remainingDays <= 7) {
      return "bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900";
    }
    
    return "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900";
  };
  
  const getIcon = () => {
    if (status === "premium") return <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />;
    if (status === "expired") return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    if (remainingDays && remainingDays <= 7) {
      return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    }
    return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
  };
  
  const getMessage = () => {
    if (isLoading) return t("loading");
    if (status === "premium") {
      return plan ? `${plan.name} ${t("premium.status")}` : t("premium.status");
    }
    if (status === "expired") return t("trialEnding.cta", { ns: "subscription.notifications" });
    if (remainingDays === null) return t("loading");
    
    if (remainingDays <= 3) {
      return t("trialEnding.days.3", { ns: "subscription.notifications" });
    } else if (remainingDays <= 7) {
      return t("trialEnding.days.7", { ns: "subscription.notifications" });
    } else if (remainingDays <= 14) {
      return t("trialEnding.days.14", { ns: "subscription.notifications" });
    } else {
      return t("trial.remaining", { days: remainingDays });
    }
  };
  
  if (isLoading) return null;
  
  return (
    <div className={`px-4 py-2 rounded-md border ${getBannerClass()} flex items-center justify-between mt-2 mx-2`}>
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="text-sm font-medium">{getMessage()}</span>
      </div>
      
      {(status !== "premium") && (
        <Button 
          size="sm" 
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          <Sparkles className="mr-1 h-3 w-3" />
          {isUpgrading 
            ? t("upgradeProcessing") 
            : t("upgradeButton")
          }
        </Button>
      )}
    </div>
  );
};
