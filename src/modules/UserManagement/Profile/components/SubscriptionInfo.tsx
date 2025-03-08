
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
  const { t } = useTranslation(['common', 'Profile', 'Subscription']);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-1/3 mb-2" />
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('Profile:content.subscriptionTitle', 'Abonelik')}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {t(`Subscription:status.${subscription.status}`, 
               subscription.status === SubscriptionStatus.TRIAL ? 'Deneme' : 
               subscription.status === SubscriptionStatus.ACTIVE ? 'Aktif' : 
               subscription.status === SubscriptionStatus.EXPIRED ? 'Süresi Dolmuş' : 
               'İptal Edilmiş')}
          </Badge>
        </div>
        <CardDescription>
          {t(`Subscription:plan.${subscription.plan}`, 
             subscription.plan === SubscriptionPlanType.TRIAL ? 'Deneme Planı' :
             subscription.plan === SubscriptionPlanType.MONTHLY ? 'Aylık Plan' : 'Yıllık Plan')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {subscription.status === SubscriptionStatus.TRIAL && (
          <p className="text-sm text-muted-foreground">
            {t('Subscription:info.trialRemaining', 
               { days: subscription.daysRemaining }, 
               `Deneme sürenizde ${subscription.daysRemaining} gün kaldı`)}
          </p>
        )}
        
        {subscription.status === SubscriptionStatus.ACTIVE && (
          <p className="text-sm text-muted-foreground">
            {t('Subscription:info.subscriptionRemaining', 
               { days: subscription.daysRemaining }, 
               `Aboneliğinizde ${subscription.daysRemaining} gün kaldı`)}
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/subscription">
            {t('Profile:content.viewSubscription', 'Abonelik Detayları')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
