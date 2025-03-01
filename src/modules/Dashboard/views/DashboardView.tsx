
import { useTranslation } from "react-i18next";
import { FinancialSummary } from "../sections/FinancialSummary";
import { RecentTransactions } from "../sections/RecentTransactions";
import { BudgetGoals } from "../sections/BudgetGoals";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const DashboardView = () => {
  const { t } = useTranslation(["Dashboard", "common"]);
  const logger = LoggerService.getInstance("Dashboard.View");

  logger.debug("Dashboard view rendered");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{t("common:welcome")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinancialSummary />
        <RecentTransactions />
        <BudgetGoals />
      </div>
    </div>
  );
};

export default DashboardView;
