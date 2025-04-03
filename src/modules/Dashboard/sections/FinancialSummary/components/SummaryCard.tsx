
import { useTranslation } from "react-i18next";
import { financialSummaryLogger } from "@/modules/Dashboard/logging";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowUp, DollarSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const SummaryCard = () => {
  const { t } = useTranslation("Dashboard");
  
  financialSummaryLogger.debug("FinancialSummary component rendered");

  const formatTime = () => {
    return new Date().toLocaleTimeString();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t("financialSummary.title")}</CardTitle>
            <CardDescription>{t("financialSummary.description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center p-3 bg-card/50 rounded-md border">
            <span className="text-sm font-medium">Toplam Bakiye</span>
            <span className="text-lg font-semibold">₺15.430,25</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 p-3 bg-green-500/10 rounded-md">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-green-600" /> 
                <span className="text-sm font-medium text-green-600">%12.5</span>
              </div>
              <p className="text-xs mt-1 text-muted-foreground">Bu ay</p>
            </div>
            
            <div className="flex-1 p-3 bg-card/50 rounded-md border">
              <div className="text-sm font-medium">₺1.250,00</div>
              <p className="text-xs mt-1 text-muted-foreground">Aylık gelir</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className={cn(
        "text-xs text-muted-foreground flex items-center gap-1 pt-2 border-t"
      )}>
        <Clock className="h-3 w-3" />
        {t("lastUpdated", { time: formatTime() })}
      </CardFooter>
    </Card>
  );
};
