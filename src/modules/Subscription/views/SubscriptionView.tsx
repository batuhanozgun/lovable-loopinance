
import React, { useEffect, useRef, useState } from 'react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useTranslation } from 'react-i18next';
import { viewsLogger } from '../logging';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionPlanType } from '../types/ISubscription';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { SubscriptionPaymentDialog } from '../components/PaymentDialog/StepAdapter';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';

export const SubscriptionView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common', 'SubscriptionErrors']);
  const { subscription, isLoading, isTrial } = useSubscription();
  const plansRef = useRef<HTMLDivElement>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(SubscriptionPlanType.MONTHLY);
  
  useEffect(() => {
    viewsLogger.debug('Abonelik sayfası görüntülendi');
  }, []);
  
  const handleUpgrade = async (planType: SubscriptionPlanType) => {
    viewsLogger.debug('Abonelik planı yükseltme istendi', { planType });
    setSelectedPlan(planType);
    setPaymentOpen(true);
  };

  // Planlar bölümüne kaydır
  const scrollToPlans = () => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      viewsLogger.debug('Planlar bölümüne kaydırıldı');
    }
  };

  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  const monthlyPrice = i18n.language.startsWith('tr') ? 49 : 4.99;
  const yearlyPrice = i18n.language.startsWith('tr') ? 39 : 3.99;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <div className="grid gap-6">
        <SubscriptionCard onActionClick={scrollToPlans} />
        
        {!isLoading && subscription && ((!subscription.isActive) || isTrial) && (
          <div className="mt-6" ref={plansRef}>
            <h2 className="text-xl font-semibold mb-4">{t('plans.title')}</h2>
            <Separator className="my-4" />
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium">{t('plan.monthly')}</h3>
                <p className="text-2xl font-bold mt-2">
                  {formatCurrency(monthlyPrice, locale, currency)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {t('plans.pricing.period.month')}
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.allAccess')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.unlimitedAccounts')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.advancedAnalytics')}
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUpgrade(SubscriptionPlanType.MONTHLY)}
                >
                  {isTrial ? t('actions.upgrade') : t('actions.subscribe')}
                </Button>
              </div>
              
              <div className="border border-primary rounded-lg p-6 bg-card relative">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
                  {t('plans.discount', { percentage: 20 })}
                </div>
                <h3 className="text-lg font-medium">{t('plan.yearly')}</h3>
                <p className="text-2xl font-bold mt-2">
                  {formatCurrency(yearlyPrice, locale, currency)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {t('plans.pricing.period.month')}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('plans.pricing.billedAnnually')}: {formatCurrency(yearlyPrice * 12, locale, currency)}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.allAccess')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.unlimitedAccounts')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.advancedAnalytics')}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 flex-shrink-0" /> 
                    {t('plans.features.prioritySupport')}
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6"
                  variant="gradient"
                  onClick={() => handleUpgrade(SubscriptionPlanType.YEARLY)}
                >
                  {isTrial ? t('actions.upgrade') : t('actions.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Adaptör üzerinden Payment modülünün PaymentDialog'unu kullan */}
      <SubscriptionPaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen} 
        selectedPlan={selectedPlan} 
      />
    </div>
  );
};
