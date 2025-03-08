
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from '../../hooks/useSubscription';
import { SubscriptionStatus, SubscriptionPlanType } from '../../types/ISubscription';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/dateUtils';
import { Skeleton } from '@/components/ui/skeleton';

export const SubscriptionCard: React.FC = () => {
  const { subscription, isLoading, error } = useSubscription();
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  
  // Yükleniyor gösterimi
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }
  
  // Hata gösterimi
  if (error || !subscription) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('common:error')}</CardTitle>
          <CardDescription>{error || t('Subscription:errors.fetch.notFound')}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            {t('common:later')}
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Abonelik durum bilgisine göre rozet rengini belirle
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
  
  // Durum adını getir
  const getStatusText = () => {
    if (subscription.status === SubscriptionStatus.TRIAL && subscription.daysRemaining <= 7) {
      return t('Subscription:subscription.badge.trialEnding');
    }
    return t(`Subscription:subscription.status.${subscription.status}`);
  };
  
  // Bilgi mesajını getir
  const getInfoMessage = () => {
    if (subscription.status === SubscriptionStatus.TRIAL) {
      return subscription.daysRemaining > 0
        ? t('Subscription:subscription.info.trialRemaining', { days: subscription.daysRemaining })
        : t('Subscription:subscription.info.trialExpired');
    }
    
    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return subscription.daysRemaining > 0
        ? t('Subscription:subscription.info.subscriptionRemaining', { days: subscription.daysRemaining })
        : '';
    }
    
    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return t('Subscription:subscription.info.expired');
    }
    
    return '';
  };
  
  // Aksiyon butonunu getir
  const getActionButton = () => {
    if (subscription.status === SubscriptionStatus.TRIAL) {
      return (
        <Button className="w-full">
          {t('Subscription:subscription.actions.upgrade')}
        </Button>
      );
    }
    
    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return (
        <Button className="w-full">
          {t('Subscription:subscription.actions.renew')}
        </Button>
      );
    }
    
    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return (
        <Button variant="outline" className="w-full">
          {t('Subscription:subscription.actions.changePlan')}
        </Button>
      );
    }
    
    return null;
  };
  
  // Yenileme tarihini formatla - kullanıcının aktif diline göre
  const formatRenewalDate = (date: Date) => {
    return date.toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{t(`Subscription:subscription.plan.${subscription.plan}`)}</CardTitle>
          <Badge variant={getBadgeVariant()}>
            {getStatusText()}
          </Badge>
        </div>
        <CardDescription>
          {subscription.expiresAt && (
            t('Subscription:subscription.info.renewalDate', { 
              date: formatRenewalDate(subscription.expiresAt) 
            })
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground">{getInfoMessage()}</p>
      </CardContent>
      
      <CardFooter>
        {getActionButton()}
      </CardFooter>
    </Card>
  );
};
