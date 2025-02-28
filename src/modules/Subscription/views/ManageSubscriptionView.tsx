
import React from "react";
import { Button } from "@/components/ui/button";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { useSubscription } from "../hooks/useSubscription";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

const ManageSubscriptionView: React.FC = () => {
  const { t, i18n } = useTranslation(["subscription"]);
  const { subscription, status, remainingDays, isLoading, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const { toast } = useToast();
  
  const dateLocale = i18n.language === "tr" ? tr : enUS;
  
  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      await refetch();
      toast({
        title: t("premium.status"),
        description: t("premium.unlimited"),
        variant: "default",
      });
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
      toast({
        title: t("errors:general.title", { ns: "errors" }),
        description: t("errors:general.description", { ns: "errors" }),
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("currentPlan", { ns: "subscription.common" })}</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Mevcut Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t("currentPlan", { ns: "subscription.common" })}</span>
              {status === "premium" ? (
                <Badge variant="default" className="bg-green-500">{t("premium.title", { ns: "subscription.common" })}</Badge>
              ) : status === "expired" ? (
                <Badge variant="destructive">{t("trial.expired", { ns: "subscription.common" })}</Badge>
              ) : (
                <Badge variant="outline">{t("trial.title", { ns: "subscription.common" })}</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {status === "premium" 
                ? t("premium.status", { ns: "subscription.common" })
                : status === "expired" 
                  ? t("trial.expired", { ns: "subscription.common" })
                  : t("trial.remaining", { days: remainingDays, ns: "subscription.common" })
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscription && subscription.trial_ends_at && status !== "premium" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("trialEndsAt", { ns: "subscription.common" })}</span>
                  <span className="font-medium">
                    {format(new Date(subscription.trial_ends_at), "PPP", { locale: dateLocale })}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("planStatus", { ns: "subscription.common" })}</span>
                <span className="font-medium">
                  {status === "premium" 
                    ? t("premium.status", { ns: "subscription.common" }) 
                    : status === "expired" 
                      ? t("trial.expired", { ns: "subscription.common" }) 
                      : t("trial.status", { ns: "subscription.common" })
                  }
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {status !== "premium" && (
              <Button 
                onClick={handleUpgrade} 
                disabled={isUpgrading} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isUpgrading 
                  ? t("upgradeProcessing", { ns: "subscription.common" }) 
                  : t("upgradeButton", { ns: "subscription.common" })
                }
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Plan Karşılaştırma */}
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
                <div className="font-medium text-center">{t("trial.title", { ns: "subscription.common" })}</div>
                <div className="font-medium text-center">{t("premium.title", { ns: "subscription.common" })}</div>
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
                <div className="text-center">{t("features.duration.trial", { ns: "subscription.common" })}</div>
                <div className="text-center">{t("features.duration.premium", { ns: "subscription.common" })}</div>
              </div>
              
              {/* İşlevsel açıklama - salt görüntüleme */}
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-100 dark:border-amber-900/30">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <AlertCircle className="inline-block mr-2 h-4 w-4" />
                  {t("trial.expired", { ns: "subscription.common" })} → {t("viewOnly", { ns: "subscription.common" })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageSubscriptionView;
