
import { useTranslation } from "react-i18next";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export const TransactionCard = () => {
  const { t } = useTranslation("Dashboard");
  const logger = LoggerService.getInstance("Dashboard.RecentTransactions");
  
  logger.debug("RecentTransactions component rendered");

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
      <h2 className="text-xl font-semibold mb-2">{t("recentTransactions.title")}</h2>
      <p className="text-muted-foreground">{t("recentTransactions.description")}</p>
    </div>
  );
};
