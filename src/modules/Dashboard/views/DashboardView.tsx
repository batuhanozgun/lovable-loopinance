
import { useTranslation } from "react-i18next";
import { FinancialSummary } from "../sections/FinancialSummary";
import { RecentTransactions } from "../sections/RecentTransactions";
import { BudgetGoals } from "../sections/BudgetGoals";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import DashboardHeader from "../components/DashboardHeader";

const DashboardView = () => {
  const { t } = useTranslation(["Dashboard", "common"]);
  const logger = LoggerService.getInstance("Dashboard.View");

  logger.debug("Dashboard view rendered");

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinancialSummary />
          <RecentTransactions />
          <BudgetGoals />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
