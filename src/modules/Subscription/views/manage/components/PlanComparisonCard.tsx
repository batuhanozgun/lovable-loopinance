
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const PlanComparisonCard: React.FC = () => {
  const { t } = useTranslation(["subscription.common", "subscription.plans"]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("comparison.title", { ns: "subscription.plans" })}</CardTitle>
        <CardDescription>
          {t("comparison.description", { ns: "subscription.plans" })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="font-medium">{t("comparison.features", { ns: "subscription.plans" })}</div>
            <div className="font-medium text-center">{t("trial.title")}</div>
            <div className="font-medium text-center">{t("premium.title")}</div>
          </div>
          
          {/* Tüm özellikler için tek bir satır */}
          <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
            <div className="text-muted-foreground">{t("comparison.allFeatures", { ns: "subscription.plans" })}</div>
            <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
            <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
          </div>
          
          {/* Kullanım süresi - Ana Fark */}
          <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2 font-medium">
            <div className="text-muted-foreground">{t("comparison.duration", { ns: "subscription.plans" })}</div>
            <div className="text-center">{t("features.duration.trial")}</div>
            <div className="text-center">{t("features.duration.premium")}</div>
          </div>
          
          {/* İşlevsel açıklama - salt görüntüleme */}
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-100 dark:border-amber-900/30">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <AlertCircle className="inline-block mr-2 h-4 w-4" />
              {t("trial.expired")} → {t("viewOnly")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanComparisonCard;
