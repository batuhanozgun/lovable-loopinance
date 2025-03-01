
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../../../hooks/useSubscription";
import { SubscriptionController } from "../../../controllers/SubscriptionController";
import { showSubscriptionToast } from "../../../helpers/toastHelper";

export interface CurrentPlanCardProps {
  className?: string;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ className = "" }) => {
  const { t, i18n } = useTranslation(["subscription.common", "subscription.ui"]);
  const { subscription, status, plan, remainingDays, isLoading, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  
  const dateLocale = i18n.language === "tr" ? tr : enUS;
  
  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      await refetch();
      showSubscriptionToast.premium();
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
      showSubscriptionToast.error(error instanceof Error ? error : undefined);
    } finally {
      setIsUpgrading(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <CardHeader className="h-24"></CardHeader>
        <CardContent className="h-32"></CardContent>
        <CardFooter className="h-16"></CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("currentPlan")}</span>
          {status === "premium" ? (
            <Badge variant="default" className="bg-green-500">{plan?.name || t("premium.title")}</Badge>
          ) : status === "expired" ? (
            <Badge variant="destructive">{t("trial.expired")}</Badge>
          ) : (
            <Badge variant="outline">{t("trial.title")}</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {status === "premium"
            ? plan?.description || t("premium.status")
            : status === "expired" 
              ? t("trial.expired")
              : t("trial.remaining", { days: remainingDays })
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscription && subscription.trial_ends_at && status !== "premium" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("trialEndsAt")}</span>
              <span className="font-medium">
                {format(new Date(subscription.trial_ends_at), "PPP", { locale: dateLocale })}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("planStatus")}</span>
            <span className="font-medium">
              {status === "premium"
                ? plan?.name || t("premium.status") 
                : status === "expired" 
                  ? t("trial.expired") 
                  : t("trial.status")
              }
            </span>
          </div>
          
          {(status === "premium") && plan && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("billingCycle", { ns: "subscription.ui", defaultValue: "Fatura Dönemi" })}</span>
              <span className="font-medium">
                {plan.interval === "monthly" 
                  ? t("pricing.billedMonthly", { ns: "subscription.plans", defaultValue: "Aylık" })
                  : t("pricing.billedYearly", { ns: "subscription.plans", defaultValue: "Yıllık" })
                }
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {(status !== "premium") && (
          <Button 
            onClick={handleUpgrade} 
            disabled={isUpgrading} 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isUpgrading 
              ? t("upgradeProcessing") 
              : t("upgradeButton")
            }
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
