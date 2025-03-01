
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles } from "lucide-react";
import { useSubscription } from "../../../hooks/useSubscription";
import { SubscriptionController } from "../../../controllers/SubscriptionController";
import { useTranslation } from "react-i18next";
import { showSubscriptionToast } from "../../../helpers/toastHelper";
import { SubscriptionService } from "../../../services/SubscriptionService";

export interface SubscriptionPlanListProps {
  className?: string;
}

export const SubscriptionPlanList: React.FC<SubscriptionPlanListProps> = ({ className = "" }) => {
  const { t, i18n } = useTranslation(["subscription.ui", "subscription.plans"]);
  const { status, plan, isLoading, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [plans, setPlans] = React.useState(SubscriptionService.getSubscriptionPlans());
  
  const handleSubscription = async (planId: string) => {
    setIsUpgrading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      await refetch();
      showSubscriptionToast.premium();
    } catch (error) {
      console.error("Abonelik işlemi başarısız:", error);
      showSubscriptionToast.error(error instanceof Error ? error : undefined);
    } finally {
      setIsUpgrading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-pulse bg-muted">
          <CardHeader className="h-32"></CardHeader>
          <CardContent className="h-48"></CardContent>
          <CardFooter className="h-16"></CardFooter>
        </Card>
        <Card className="animate-pulse bg-muted">
          <CardHeader className="h-32"></CardHeader>
          <CardContent className="h-48"></CardContent>
          <CardFooter className="h-16"></CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {plans.filter(p => p.type !== "trial").map((planItem) => {
        // Mevcut plan mı kontrol et
        const isCurrentPlan = status === planItem.type && (
          !plan || plan.interval === planItem.interval
        );
        
        // Button text'ini belirle
        let buttonText = isCurrentPlan
          ? t("buttons.current", { ns: "subscription.ui", defaultValue: "Mevcut Plan" })
          : t("buttons.upgrade", { ns: "subscription.ui", defaultValue: "Yükselt" });
        
        return (
          <Card key={planItem.id} className={isCurrentPlan ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{planItem.name}</CardTitle>
                {isCurrentPlan && (
                  <Badge variant="default" className="bg-green-500 dark:bg-green-600">
                    {t("labels.current", { ns: "subscription.ui", defaultValue: "Mevcut" })}
                  </Badge>
                )}
              </div>
              <CardDescription>{planItem.description}</CardDescription>
              <div className="mt-2 font-bold text-2xl">
                {planItem.price} {t("plans:pricing.currency", { ns: "subscription.plans.pricing", defaultValue: "USD" })}
                <span className="text-sm font-normal ml-1">
                  {planItem.interval === "monthly" 
                    ? t("plans:pricing.perMonth", { ns: "subscription.plans.pricing", defaultValue: "/ ay" })
                    : t("plans:pricing.perYear", { ns: "subscription.plans.pricing", defaultValue: "/ yıl" })
                  }
                </span>
              </div>
              
              {planItem.interval === "yearly" && (
                <div className="mt-1">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                    {t("plans:pricing.savePercent", { ns: "subscription.plans.pricing", defaultValue: "Save 16%" })}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {planItem.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{t(`plans:features.${feature}`, { ns: "subscription.plans.ui", defaultValue: feature })}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${isCurrentPlan ? "bg-gray-200 text-gray-500 dark:bg-gray-700 cursor-default" : ""}`}
                disabled={isCurrentPlan || isUpgrading}
                onClick={() => handleSubscription(planItem.id)}
              >
                {isUpgrading ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    {t("buttons.processing", { ns: "subscription.ui", defaultValue: "İşleniyor..." })}
                  </>
                ) : (
                  <>
                    {!isCurrentPlan && <Sparkles className="mr-2 h-4 w-4" />}
                    {buttonText}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
