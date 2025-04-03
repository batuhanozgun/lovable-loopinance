
import { useTranslation } from "react-i18next";
import { FinancialSummary } from "../sections/FinancialSummary";
import { RecentTransactions } from "../sections/RecentTransactions";
import { BudgetGoals } from "../sections/BudgetGoals";
import { DashboardLogger } from "../logging";
import { Plus, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/modules/AppLayout/components/AppHeader";

const DashboardView = () => {
  const { t } = useTranslation(["Dashboard", "common"]);

  DashboardLogger.debug("Dashboard view rendered");

  // Header için aksiyon butonları
  const headerActions = (
    <Button size="sm" className="gap-1">
      <Plus size={16} />
      {t('common:add')}
    </Button>
  );

  return (
    <div className="flex flex-col h-full">
      <AppHeader 
        title={t('common:navigation.dashboard')}
        icon={<BarChart className="h-5 w-5" />}
        pageActions={headerActions}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <FinancialSummary />
        <RecentTransactions />
        <BudgetGoals />
      </div>
    </div>
  );
};

export default DashboardView;
