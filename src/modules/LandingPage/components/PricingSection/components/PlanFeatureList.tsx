
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { PricingPlanType } from "../types/pricing.types";

interface PlanFeatureListProps {
  planType: PricingPlanType;
}

export const PlanFeatureList = ({ planType }: PlanFeatureListProps) => {
  const { t } = useTranslation("LandingPage");
  
  // Planın özelliklerini i18n'den al
  const featureKeys = t(`pricing.plans.${planType}.features`, { returnObjects: true }) as string[];
  
  return (
    <ul className="space-y-3 mt-4">
      {featureKeys.map((feature, index) => (
        <li key={index} className="flex items-start">
          <span className="mr-2 mt-0.5 flex-shrink-0 text-primary">
            <Check className="h-5 w-5" />
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};
