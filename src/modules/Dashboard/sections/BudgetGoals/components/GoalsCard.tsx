
import { useTranslation } from "react-i18next";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export const GoalsCard = () => {
  const { t } = useTranslation("Dashboard");
  const logger = LoggerService.getInstance("Dashboard.BudgetGoals");
  
  logger.debug("BudgetGoals component rendered");

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
      <h2 className="text-xl font-semibold mb-2">{t("budgetGoals.title")}</h2>
      <p className="text-muted-foreground">{t("budgetGoals.description")}</p>
    </div>
  );
};
