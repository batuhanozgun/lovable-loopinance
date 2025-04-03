
import { useTranslation } from "react-i18next";
import { FinancialSummary } from "../sections/FinancialSummary";
import { RecentTransactions } from "../sections/RecentTransactions";
import { BudgetGoals } from "../sections/BudgetGoals";
import { DashboardLogger } from "../logging";
import { Plus, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardView = () => {
  const { t } = useTranslation(["Dashboard", "common"]);

  DashboardLogger.debug("Dashboard view rendered");

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">{t('common:navigation.dashboard')}</h1>
        </div>
        <Button size="sm" className="gap-1">
          <Plus size={16} />
          {t('common:add')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <FinancialSummary />
        <RecentTransactions />
        <BudgetGoals />
      </div>
    </div>
  );
};

export default DashboardView;
