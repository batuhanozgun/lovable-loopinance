
import { useTranslation } from "react-i18next";
import { budgetGoalsLogger } from "@/modules/Dashboard/logging";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const GoalsCard = () => {
  const { t } = useTranslation("Dashboard");
  
  budgetGoalsLogger.debug("BudgetGoals component rendered");

  const formatTime = () => {
    return new Date().toLocaleTimeString();
  };

  // Örnek bütçe hedefleri
  const goals = [
    { id: 1, name: "Tatil Fonu", target: 5000, current: 3250, category: "Tasarruf" },
    { id: 2, name: "Acil Durum Fonu", target: 10000, current: 8500, category: "Tasarruf" },
    { id: 3, name: "Teknoloji Alımı", target: 7500, current: 2800, category: "Alışveriş" },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <PieChart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t("budgetGoals.title")}</CardTitle>
            <CardDescription>{t("budgetGoals.description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {goals.map((goal) => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{goal.name}</div>
                    <div className="text-xs text-muted-foreground">{goal.category}</div>
                  </div>
                  <div className="text-sm font-medium">
                    {percentage}%
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goal.current.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY' })}</span>
                    <span>{goal.target.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY' })}</span>
                  </div>
                </div>
              </div>
            );
          })}
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
