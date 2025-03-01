
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useSubscription } from "../../../hooks/subscription/useSubscription";
import { SubscriptionController } from "../../../controllers/SubscriptionController";
import { showSubscriptionToast } from "../../../helpers/toastHelper";
import { PlanService } from "../../../services/plan/PlanService";

const SubscriptionPlanList: React.FC = () => {
  const { t } = useTranslation(["subscription.common", "subscription.plans", "subscription.ui"]);
  const { status, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [plans, setPlans] = React.useState(PlanService.getSubscriptionPlans());

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
    <div className="grid gap-6 md:grid-cols-3">
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
                : status === "premium" || status === "business"
                  ? plan.type === "premium" || plan.type === "business"
                    ? t("buttons.switch", { ns: "subscription.ui", defaultValue: "Bu Plana Geç" })
                    : t("buttons.downgrade", { ns: "subscription.ui", defaultValue: "Düşür" })
                  : t("buttons.upgrade", { ns: "subscription.ui", defaultValue: "Yükselt" })
              }
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlanList;
