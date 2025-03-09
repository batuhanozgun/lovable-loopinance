
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SubscriptionPlanType } from '../../../../../../types/ISubscription';
import { PriceDisplay } from '../../../shared/components/PriceDisplay';
import { useSubscriptionPrice } from '../../../shared/hooks/useSubscriptionPrice';
import { useSubscriptionLocale } from '../../../shared/hooks/useSubscriptionLocale';

interface PlanFeature {
  name: string;
  highlight?: boolean;
}

interface PlanCardProps {
  planType: SubscriptionPlanType;
  features: PlanFeature[];
  isCurrentPlan: boolean;
  isTrial: boolean;
  discount?: number;
  onSelectPlan: (planType: SubscriptionPlanType) => void;
  variant?: 'default' | 'highlighted';
}

export const PlanCard: React.FC<PlanCardProps> = ({
  planType,
  features,
  isCurrentPlan,
  isTrial,
  discount,
  onSelectPlan,
  variant = 'default'
}) => {
  const { t } = useTranslation(['Subscription']);
  const { formatPrice } = useSubscriptionPrice();
  const { locale, currency, yearlyPrice, monthlyPrice } = useSubscriptionLocale();
  
  // Buton metni belirle
  const getButtonText = () => {
    // Eğer şu anda aynı plana sahipse "Mevcut Plan" yaz
    if (isCurrentPlan) {
      return t('Subscription:subscription.plan.current', { plan: '' }).replace(':', '');
    }
    
    // Eğer deneme sürümündeyse "Yükselt"
    if (isTrial) {
      return t('Subscription:actions.upgrade');
    }
    
    // Diğer durumlar için "Plan Değiştir" yaz
    return t('Subscription:actions.changePlan');
  };
  
  // Yıllık plan için toplam tutarı göster
  const renderYearlyTotal = () => {
    if (planType !== SubscriptionPlanType.YEARLY) return null;
    
    return (
      <>
        <p className="text-sm text-muted-foreground">
          {t('Subscription:plans.pricing.billedAnnually')}
        </p>
        <p className="text-sm font-medium text-primary mt-1">
          {locale.startsWith('tr') ? 'Yıllık toplam: ' : 'Yearly total: '}
          {formatPrice(yearlyPrice * 12)}
        </p>
      </>
    );
  };
  
  return (
    <Card className={`border ${variant === 'highlighted' ? 'border-primary' : 'border-border'}`}>
      <CardHeader>
        {discount && (
          <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
            {t('Subscription:plans.discount', { percentage: discount })}
          </div>
        )}
        <CardTitle>{t(`Subscription:plans.${planType}`)}</CardTitle>
        <CardDescription>
          {t(`Subscription:payment.plan.${planType}.description`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">
            <PriceDisplay plan={planType} className="text-3xl font-bold" />
          </p>
          {renderYearlyTotal()}
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className={feature.highlight ? "font-medium" : ""}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={variant === 'highlighted' ? "gradient" : "default"}
          onClick={() => onSelectPlan(planType)}
          disabled={isCurrentPlan}
        >
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
};
