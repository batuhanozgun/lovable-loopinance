
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "../../../hooks/subscription/useSubscription";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriptionController } from "../../../controllers/SubscriptionController";
import { showSubscriptionToast } from "../../../helpers/toastHelper";

const CurrentPlanCard: React.FC = () => {
  const { subscription, status, plan, remainingDays, refetch } = useSubscription();
  const { t, i18n } = useTranslation(["subscription.common", "subscription.plans"]);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("currentPlan")}</span>
          {status === "premium" || status === "business" ? (
            <Badge variant="default" className="bg-green-500">{plan?.name || t("premium.title")}</Badge>
          ) : status === "expired" ? (
            <Badge variant="destructive">{t("trial.expired")}</Badge>
          ) : (
            <Badge variant="outline">{t("trial.title")}</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {status === "premium" || status === "business"
            ? plan?.description || t("premium.status")
            : status === "expired" 
              ? t("trial.expired")
              : t("trial.remaining", { days: remainingDays })
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscription && subscription.trial_ends_at && status !== "premium" && status !== "business" && (
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
              {status === "premium" || status === "business"
                ? plan?.name || t("premium.status") 
                : status === "expired" 
                  ? t("trial.expired") 
                  : t("trial.status")
              }
            </span>
          </div>
          
          {(status === "premium" || status === "business") && plan && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("plans:pricing.billedMonthly", { ns: "subscription.plans.pricing" })}</span>
              <span className="font-medium">
                {plan.price} {t("plans:pricing.currency", { ns: "subscription.plans.pricing" })} 
                {plan.interval === "monthly" 
                  ? t("plans:pricing.perMonth", { ns: "subscription.plans.pricing" })
                  : t("plans:pricing.perYear", { ns: "subscription.plans.pricing" })
                }
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {(status !== "premium" && status !== "business") && (
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

export default CurrentPlanCard;
