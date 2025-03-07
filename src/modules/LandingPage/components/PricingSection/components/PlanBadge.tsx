
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { PricingPlanType } from "../types/pricing.types";

interface PlanBadgeProps {
  planType: PricingPlanType;
}

export const PlanBadge = ({ planType }: PlanBadgeProps) => {
  const { t } = useTranslation("LandingPage");
  
  if (planType === "trial") {
    return (
      <div className="absolute -top-2 right-4">
        <Badge variant="default" className="bg-primary text-primary-foreground px-3 py-1">
          {t("pricing.plans.trial.badge")}
        </Badge>
      </div>
    );
  }
  
  if (planType === "yearly") {
    return (
      <div className="absolute -top-2 right-4">
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700 px-3 py-1">
          {t("pricing.plans.yearly.badge")}
        </Badge>
      </div>
    );
  }
  
  return null;
};
