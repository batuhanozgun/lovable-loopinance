
import React from "react";
import { SubscriptionPlanList } from "./components/SubscriptionPlanList";
import { CurrentPlanCard } from "./components/CurrentPlanCard";
import { PlanComparisonCard } from "./components/PlanComparisonCard";
import { useTranslation } from "react-i18next";

const ManageSubscriptionView: React.FC = () => {
  const { t } = useTranslation(["subscription.common"]);
  
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("currentPlan")}</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <CurrentPlanCard />
        <PlanComparisonCard />
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6">{t("pricing.title", { ns: "subscription.plans", defaultValue: "Abonelik Planları" })}</h2>
      <SubscriptionPlanList />
    </div>
  );
};

export default ManageSubscriptionView;
