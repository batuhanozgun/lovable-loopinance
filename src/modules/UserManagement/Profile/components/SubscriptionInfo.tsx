
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import { 
  useSubscription, 
  SubscriptionStatus, 
  SubscriptionPlanType 
} from '@/modules/Subscription';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export const SubscriptionInfo: React.FC = () => {
  const { subscription, isLoading } = useSubscription();
  const { t, i18n } = useTranslation(['Subscription', 'common', 'Profile']);
  
  if (isLoading) {
    return (
      <Card className="shadow-sm border">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }
  
  if (!subscription) {
    return null;
  }
  
  // Rozet stilini belirle
  const getBadgeVariant = () => {
    switch (subscription.status) {
      case SubscriptionStatus.TRIAL:
        return subscription.daysRemaining <= 7 ? 'destructive' : 'default';
      case SubscriptionStatus.ACTIVE:
        return 'secondary';
      case SubscriptionStatus.EXPIRED:
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  // Durum bilgisini al
  const getStatusText = () => {
    if (subscription.status === SubscriptionStatus.TRIAL && subscription.daysRemaining <= 7) {
      return t('Subscription:badge.trialEnding');
    }
    return t(`Subscription:status.${subscription.status}`);
  };
  
  // Abonelik bilgisini al
  const getInfoMessage = () => {
    if (subscription.status === SubscriptionStatus.TRIAL) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.trialRemaining', { days: subscription.daysRemaining })
        : t('Subscription:info.trialExpired');
    }
    
    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.subscriptionRemaining', { days: subscription.daysRemaining })
        : '';
    }
    
    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return t('Subscription:info.expired');
    }
    
    return '';
  };
  
  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">{t("Profile:SubscriptionInfo.title", "Abonelik")}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {getStatusText()}
          </Badge>
        </div>
        <CardDescription className="text-base">
          {t(`Subscription:plans.${subscription.plan}`)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-base text-muted-foreground">{getInfoMessage()}</p>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/subscription">
            {t("Profile:SubscriptionInfo.viewDetails", "Abonelik Detayları")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
