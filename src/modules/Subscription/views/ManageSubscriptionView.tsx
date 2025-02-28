
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

const ManageSubscriptionView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { subscription, status, remainingDays, isLoading, refetch } = useSubscription();
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  
  const dateLocale = i18n.language === "tr" ? tr : enUS;
  
  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      await refetch();
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
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
      <h1 className="text-3xl font-bold mb-8">Abonelik Yönetimi</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Mevcut Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Mevcut Plan</span>
              {status === "premium" ? (
                <Badge variant="default" className="bg-green-500">Premium</Badge>
              ) : status === "expired" ? (
                <Badge variant="destructive">Süresi Doldu</Badge>
              ) : (
                <Badge variant="outline">Deneme</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {status === "premium" 
                ? "Premium hesabınız aktif."
                : status === "expired" 
                  ? "Deneme süreniz doldu."
                  : `Deneme sürenizin bitmesine ${remainingDays} gün kaldı.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscription && subscription.trial_ends_at && status !== "premium" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Deneme süresi bitiş:</span>
                  <span className="font-medium">
                    {format(new Date(subscription.trial_ends_at), "PPP", { locale: dateLocale })}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Durum:</span>
                <span className="font-medium">
                  {status === "premium" ? "Aktif" : status === "expired" ? "Süresi Doldu" : "Deneme Süresi"}
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
                {isUpgrading ? "İşleniyor..." : "Premium'a Yükselt"}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Plan Karşılaştırma */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Karşılaştırma</CardTitle>
            <CardDescription>
              Planların sunduğu özellikleri karşılaştırın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Özellik</div>
                <div className="font-medium text-center">Deneme</div>
                <div className="font-medium text-center">Premium</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                <div className="text-muted-foreground">Temel özellikler</div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                <div className="text-muted-foreground">Gelişmiş analizler</div>
                <div className="text-center"><AlertCircle className="mx-auto h-4 w-4 text-red-500" /></div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                <div className="text-muted-foreground">Raporlar</div>
                <div className="text-center"><AlertCircle className="mx-auto h-4 w-4 text-red-500" /></div>
                <div className="text-center"><CheckCircle className="mx-auto h-4 w-4 text-green-500" /></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm border-t pt-2">
                <div className="text-muted-foreground">Kullanım süresi</div>
                <div className="text-center">3 ay</div>
                <div className="text-center">Sınırsız</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageSubscriptionView;
