
import React from "react";
import { Button } from "@/components/ui/button";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { useSubscription } from "../hooks/useSubscription";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { showSubscriptionToast } from "../helpers/toastHelper";
import { SubscriptionService } from "../services/SubscriptionService";

const ManageSubscriptionView: React.FC = () => {
  const { t, i18n } = useTranslation(["subscription.common", "subscription.plans"]);
  const { subscription, status, plan, remainingDays, isLoading, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [plans, setPlans] = React.useState(SubscriptionService.getSubscriptionPlans());
  
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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("currentPlan")}</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
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
        
        <Card>
          <CardHeader>
            <CardTitle>{t("comparison.title", { ns: "subscription.plans" })}</CardTitle>
            <CardDescription>
              {t("comparison.description", { ns: "subscription.plans" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">{t("comparison.features", { ns: "subscription.plans" })}</div>
                <div className="font-medium text-center">{t("trial.title")}</div>
                <div className="font-medium text-center">{t("premium.title")}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                <div className="text-muted-foreground">{t("comparison.allFeatures", { ns: "subscription.plans" })}</div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2 font-medium">
                <div className="text-muted-foreground">{t("comparison.duration", { ns: "subscription.plans" })}</div>
                <div className="text-center">{t("features.duration.trial")}</div>
                <div className="text-center">{t("features.duration.premium")}</div>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-100 dark:border-amber-900/30">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <AlertCircle className="inline-block mr-2 h-4 w-4" />
                  {t("trial.expired")} → {t("viewOnly")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6">{t("plans:pricing.title", { ns: "subscription.plans", defaultValue: "Abonelik Planları" })}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {plans.filter(p => p.type !== "trial").map((plan) => (
          <Card key={plan.id} className={status === plan.type ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-2 font-bold text-2xl">
                {plan.price} {t("plans:pricing.currency", { ns: "subscription.plans.pricing", defaultValue: "USD" })}
                <span className="text-sm font-normal ml-1">
                  {plan.interval === "monthly" 
                    ? t("plans:pricing.perMonth", { ns: "subscription.plans.pricing", defaultValue: "/ ay" })
                    : t("plans:pricing.perYear", { ns: "subscription.plans.pricing", defaultValue: "/ yıl" })
                  }
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{t(`plans:features.${feature}`, { ns: "subscription.plans.ui", defaultValue: feature })}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${status === plan.type ? "bg-gray-200 text-gray-500 dark:bg-gray-700 cursor-default" : ""}`}
                disabled={status === plan.type || isUpgrading}
                onClick={handleUpgrade}
              >
                {status === plan.type 
                  ? t("buttons.current", { ns: "subscription.ui", defaultValue: "Mevcut Plan" })
                  : t("buttons.upgrade", { ns: "subscription.ui", defaultValue: "Yükselt" })
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageSubscriptionView;
