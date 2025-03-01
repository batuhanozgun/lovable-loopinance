
import { useTranslation } from "react-i18next";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export const SummaryCard = () => {
  const { t } = useTranslation("Dashboard");
  const logger = LoggerService.getInstance("Dashboard.FinancialSummary");
  
  logger.debug("FinancialSummary component rendered");

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
      <h2 className="text-xl font-semibold mb-2">{t("financialSummary.title")}</h2>
      <p className="text-muted-foreground">{t("financialSummary.description")}</p>
    </div>
  );
};
