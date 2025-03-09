import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SubscriptionStatus, SubscriptionPlanType } from '../../types/ISubscription';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { Calendar, Clock, CreditCard, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { viewsLogger } from '../../logging';

export const SubscriptionDashboardView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik yönetim paneli görüntülendi');
  }, []);
  
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  const monthlyPrice = i18n.language.startsWith('tr') ? 49 : 4.99;
  const yearlyPrice = i18n.language.startsWith('tr') ? 39 : 3.99;
  const currentPrice = subscription?.plan === SubscriptionPlanType.YEARLY ? yearlyPrice : monthlyPrice;
  
  const getStatusBadgeVariant = () => {
    if (!subscription) return 'outline';
    
    switch (subscription.status) {
      case SubscriptionStatus.ACTIVE:
        return 'success';
      case SubscriptionStatus.TRIAL:
        return subscription.daysRemaining <= 7 ? 'destructive' : 'default';
      case SubscriptionStatus.EXPIRED:
        return 'destructive';
      case SubscriptionStatus.CANCELED:
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  const getStatusText = () => {
    if (!subscription) return '';
    return t(`Subscription:status.${subscription.status}`);
  };
  
  const getSubscriptionInfoText = () => {
    if (!subscription) return '';
    
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
  
  const getRenewalDate = () => {
    if (!subscription || !subscription.expiresAt) return '';
    
    const date = new Date(subscription.expiresAt);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{t('Subscription:dashboard.summary')}</CardTitle>
                <CardDescription>
                  {subscription && t(`Subscription:plans.${subscription.plan}`)}
                </CardDescription>
              </div>
              {subscription && (
                <Badge variant={getStatusBadgeVariant() as any}>
                  {getStatusText()}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {subscription && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {getSubscriptionInfoText()}
                </div>
                
                {subscription.expiresAt && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t('Subscription:info.renewalDate', { date: getRenewalDate() })}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="font-medium">
                    {formatCurrency(currentPrice, locale, currency)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {t(`Subscription:plans.pricing.period.${subscription.plan === SubscriptionPlanType.YEARLY ? 'year' : 'month'}`)}
                    </span>
                  </div>
                  
                  <Button asChild size="sm">
                    <Link to="/subscription/plans">
                      {t('Subscription:actions.changePlan')}
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              {t('Subscription:dashboard.nextBilling')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription && subscription.expiresAt ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('Subscription:plan.title')}:</span>
                  <span className="font-medium">{t(`Subscription:plans.${subscription.plan}`)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('Subscription:payment.confirmation.amount')}:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      subscription.plan === SubscriptionPlanType.YEARLY ? yearlyPrice * 12 : monthlyPrice,
                      locale,
                      currency
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">{t('Subscription:info.renewalDate', { date: '' })}:</span>
                  <span className="font-medium">{getRenewalDate()}</span>
                </div>
                
                <Button asChild size="sm" variant="outline" className="w-full mt-2">
                  <Link to="/subscription/billing">
                    {t('Subscription:actions.viewDetails')}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  {t('Subscription:billing.noInvoices')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {t('Subscription:dashboard.usage')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {t('Subscription:dashboard.usageComingSoon')}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              {t('Subscription:dashboard.featuresAccess')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="h-5 w-5 text-green-500 mr-2">✓</span>
                <span>{t('Subscription:plans.features.allAccess')}</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-green-500 mr-2">✓</span>
                <span>{t('Subscription:plans.features.unlimitedAccounts')}</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-green-500 mr-2">✓</span>
                <span>{t('Subscription:plans.features.advancedAnalytics')}</span>
              </li>
              
              {subscription?.plan === SubscriptionPlanType.YEARLY && (
                <li className="flex items-start">
                  <span className="h-5 w-5 text-green-500 mr-2">✓</span>
                  <span>{t('Subscription:plans.features.prioritySupport')}</span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
