
import { useTranslation } from "react-i18next";
import { recentTransactionsLogger } from "@/modules/Dashboard/logging";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Clock, List, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const TransactionCard = () => {
  const { t } = useTranslation("Dashboard");
  
  recentTransactionsLogger.debug("RecentTransactions component rendered");

  const formatTime = () => {
    return new Date().toLocaleTimeString();
  };

  // Örnek işlem verileri
  const transactions = [
    { id: 1, title: "Market Alışverişi", amount: -245.50, date: "Bugün", category: "Gıda" },
    { id: 2, title: "Maaş Ödemesi", amount: 5000.00, date: "Dün", category: "Gelir" },
    { id: 3, title: "İnternet Faturası", amount: -109.90, date: "25 Mart", category: "Faturalar" },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <List className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t("recentTransactions.title")}</CardTitle>
            <CardDescription>{t("recentTransactions.description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mt-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 bg-card/50 rounded-md border hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-1.5 rounded-md",
                  transaction.amount > 0 ? "bg-green-500/10" : "bg-red-500/10" 
                )}>
                  {transaction.amount > 0 ? 
                    <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  }
                </div>
                <div>
                  <div className="text-sm font-medium">{transaction.title}</div>
                  <div className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</div>
                </div>
              </div>
              <div className={cn(
                "font-medium",
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              )}>
                {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY' })}
              </div>
            </div>
          ))}
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
