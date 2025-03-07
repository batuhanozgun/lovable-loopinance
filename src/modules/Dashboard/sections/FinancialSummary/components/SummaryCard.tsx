
import { useTranslation } from "react-i18next";
import { financialSummaryLogger } from "@/modules/Dashboard/logging";

export const SummaryCard = () => {
  const { t } = useTranslation("Dashboard");
  
  financialSummaryLogger.debug("FinancialSummary component rendered");

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
      <h2 className="text-xl font-semibold mb-2">{t("financialSummary.title")}</h2>
      <p className="text-muted-foreground">{t("financialSummary.description")}</p>
    </div>
  );
};
