
import React from "react";
import { useSubscription } from "../../hooks/subscription/useSubscription";
import { useTranslation } from "react-i18next";
import CurrentPlanCard from "./components/CurrentPlanCard";
import PlanComparisonCard from "./components/PlanComparisonCard";
import SubscriptionPlanList from "./components/SubscriptionPlanList";

const ManageSubscriptionView: React.FC = () => {
  const { t } = useTranslation(["subscription.common", "subscription.plans"]);
  const { isLoading } = useSubscription();
  
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
        <CurrentPlanCard />
        <PlanComparisonCard />
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6">
        {t("plans:pricing.title", { ns: "subscription.plans", defaultValue: "Abonelik Planları" })}
      </h2>
      
      <SubscriptionPlanList />
    </div>
  );
};

export default ManageSubscriptionView;
