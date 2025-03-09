
import React, { useEffect } from 'react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useTranslation } from 'react-i18next';
import { viewsLogger } from '../logging';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionPlanType } from '../types/ISubscription';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, updatePlan, isLoading, isTrial } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug(t('Subscription:debug.pageViewed'));
  }, [t]);
  
  const handleUpgrade = async (planType: SubscriptionPlanType) => {
    viewsLogger.debug(t('Subscription:debug.planUpgradeRequested'), { planType });
    await updatePlan(planType);
  };

  // Format currency based on locale
  const formatCurrency = (price: number, currency: string = '₺') => {
    return new Intl.NumberFormat(i18n.language === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: currency === '₺' ? 'TRY' : currency,
      minimumFractionDigits: 0,
    }).format(price).replace('TRY', '₺');
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{t('Subscription:status.title')}</h1>
      
      <div className="grid gap-6">
        <SubscriptionCard />
        
        {!isLoading && subscription && ((!subscription.isActive) || isTrial) && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">{t('Subscription:plans.title')}</h2>
            <Separator className="my-4" />
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium">{t('Subscription:plan.monthly')}</h3>
                <p className="text-2xl font-bold mt-2">
                  {t('Subscription:plans.pricing.monthly', {
                    price: formatCurrency(49),
                    currency: '',
                    period: t('Subscription:plans.pricing.period.month')
                  })}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.allAccess')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.unlimitedAccounts')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.advancedAnalytics')}
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUpgrade(SubscriptionPlanType.MONTHLY)}
                >
                  {isTrial ? t('Subscription:actions.upgrade') : t('Subscription:actions.subscribe')}
                </Button>
              </div>
              
              <div className="border border-primary rounded-lg p-6 bg-card relative">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
                  {t('Subscription:plans.discount', { percentage: 20 })}
                </div>
                <h3 className="text-lg font-medium">{t('Subscription:plan.yearly')}</h3>
                <p className="text-2xl font-bold mt-2">
                  {t('Subscription:plans.pricing.monthly', {
                    price: formatCurrency(39),
                    currency: '',
                    period: t('Subscription:plans.pricing.period.month')
                  })}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.allAccess')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.unlimitedAccounts')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.advancedAnalytics')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('Subscription:plans.features.prioritySupport')}
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6"
                  variant="gradient"
                  onClick={() => handleUpgrade(SubscriptionPlanType.YEARLY)}
                >
                  {isTrial ? t('Subscription:actions.upgrade') : t('Subscription:actions.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
