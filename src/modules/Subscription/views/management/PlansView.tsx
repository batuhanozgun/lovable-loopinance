
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SubscriptionPlanType } from '../../types/ISubscription';
import { formatCurrency } from '@/modules/Payment/utils/currencyUtils';
import { SubscriptionPaymentDialog } from '../../components/PaymentDialog/StepAdapter';
import { viewsLogger } from '../../logging';

export const SubscriptionPlansView: React.FC = () => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const { subscription, isLoading } = useSubscription();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(SubscriptionPlanType.MONTHLY);
  
  useEffect(() => {
    viewsLogger.debug('Abonelik planları sayfası görüntülendi');
  }, []);
  
  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  const monthlyPrice = i18n.language.startsWith('tr') ? 49 : 4.99;
  const yearlyPrice = i18n.language.startsWith('tr') ? 39 : 3.99;
  
  const handlePlanSelect = (planType: SubscriptionPlanType) => {
    viewsLogger.debug('Plan seçildi', { planType, currentPlan: subscription?.plan });
    
    // Eğer zaten aynı plana sahipse işlem yapma
    if (subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive) {
      return;
    }
    
    setSelectedPlan(planType);
    setPaymentOpen(true);
  };
  
  const getButtonText = (planType: SubscriptionPlanType) => {
    // Eğer şu anda aynı plana sahipse "Mevcut Plan" yaz
    if (subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive) {
      return t('Subscription:subscription.plan.current', { plan: '' }).replace(':', '');
    }
    
    // Eğer deneme sürümündeyse "Yükselt"
    if (subscription?.isTrial) {
      return t('Subscription:actions.upgrade');
    }
    
    // Diğer durumlar için "Plan Değiştir" yaz
    return t('Subscription:actions.changePlan');
  };
  
  // Buton disable durumunu belirle
  const isButtonDisabled = (planType: SubscriptionPlanType) => {
    return subscription?.plan === planType && subscription.status !== 'trial' && subscription.isActive;
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('Subscription:plans.title')}</h1>
        <p className="text-muted-foreground">{t('Subscription:description')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Aylık Plan */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>{t('Subscription:plan.monthly')}</CardTitle>
            <CardDescription>
              {t('Subscription:payment.plan.monthly.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                {formatCurrency(monthlyPrice, locale, currency)}
                <span className="text-sm text-muted-foreground ml-1">
                  {t('Subscription:plans.pricing.period.month')}
                </span>
              </p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.allAccess')}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.unlimitedAccounts')}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.advancedAnalytics')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => handlePlanSelect(SubscriptionPlanType.MONTHLY)}
              disabled={isButtonDisabled(SubscriptionPlanType.MONTHLY)}
            >
              {getButtonText(SubscriptionPlanType.MONTHLY)}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Yıllık Plan */}
        <Card className="border border-primary">
          <CardHeader>
            <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
              {t('Subscription:plans.discount', { percentage: 20 })}
            </div>
            <CardTitle>{t('Subscription:plan.yearly')}</CardTitle>
            <CardDescription>
              {t('Subscription:payment.plan.yearly.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                {formatCurrency(yearlyPrice, locale, currency)}
                <span className="text-sm text-muted-foreground ml-1">
                  {t('Subscription:plans.pricing.period.month')}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {t('Subscription:plans.pricing.billedAnnually')}
              </p>
              <p className="text-sm font-medium text-primary mt-1">
                {i18n.language.startsWith('tr') ? 'Yıllık toplam: ' : 'Yearly total: '}
                {formatCurrency(yearlyPrice * 12, locale, currency)}
              </p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.allAccess')}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.unlimitedAccounts')}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{t('Subscription:plans.features.advancedAnalytics')}</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="font-medium">{t('Subscription:plans.features.prioritySupport')}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              variant="gradient"
              onClick={() => handlePlanSelect(SubscriptionPlanType.YEARLY)}
              disabled={isButtonDisabled(SubscriptionPlanType.YEARLY)}
            >
              {getButtonText(SubscriptionPlanType.YEARLY)}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <SubscriptionPaymentDialog 
        open={paymentOpen} 
        onOpenChange={setPaymentOpen} 
        selectedPlan={selectedPlan} 
      />
    </div>
  );
};
