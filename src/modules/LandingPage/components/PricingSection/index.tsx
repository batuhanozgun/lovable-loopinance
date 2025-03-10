
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, BadgePercent, Shield, Clock } from 'lucide-react';
import { useSubscriptionPrice } from '@/modules/Subscription/views/management/shared/hooks/useSubscriptionPrice';
import { useSubscriptionLocale } from '@/modules/Subscription/views/management/shared/hooks/useSubscriptionLocale';
import { formatPrice } from '@/modules/Subscription/views/management/shared/utils/formatters';
import { Badge } from '@/components/ui/badge';

export const PricingSection = () => {
  const { t } = useTranslation('LandingPage');
  const { locale, currency, isTurkish } = useSubscriptionLocale();
  const { monthlyPrice, yearlyPrice, yearlyTotalPrice, yearlyDiscount } = useSubscriptionPrice();
  
  const formattedMonthlyPrice = formatPrice(monthlyPrice, locale, currency);
  const formattedYearlyPrice = formatPrice(yearlyPrice, locale, currency);
  const formattedYearlySavings = formatPrice((monthlyPrice * 12) - yearlyTotalPrice, locale, currency);
  
  const features = [
    t('pricing.features.allFeatures'),
    t('pricing.features.unlimitedAccounts'),
    t('pricing.features.analytics'),
    t('pricing.features.sync'),
    t('pricing.features.prioritySupport'),
    t('pricing.features.extendedHistory')
  ];
  
  return (
    <section id="pricing" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="info" className="text-xs py-1">
              <Clock className="h-3 w-3 mr-1" />
              {t('pricing.trial.info')}
            </Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan Card */}
          <Card className="border border-border flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle>{t('pricing.monthly.title')}</CardTitle>
              <CardDescription>{t('pricing.monthly.description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <p className="text-3xl font-bold">
                  {formattedMonthlyPrice}
                  <span className="text-sm text-muted-foreground ml-1">
                    {t('pricing.monthly.period')}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('pricing.monthly.billing')}
                </p>
              </div>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/signup?plan=monthly">
                  {t('pricing.cta.getStarted')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Yearly Plan Card */}
          <Card className="border-2 border-primary flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-bl-lg">
              {t('pricing.recommended')}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle>{t('pricing.yearly.title')}</CardTitle>
                <BadgePercent className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>{t('pricing.yearly.description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">
                    {formattedYearlyPrice}
                    <span className="text-sm text-muted-foreground ml-1">
                      {t('pricing.yearly.period')}
                    </span>
                  </p>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded-full">
                    {t('pricing.yearly.discount', { percent: yearlyDiscount })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('pricing.yearly.billing')}
                </p>
                <p className="text-sm text-primary font-medium mt-2">
                  {t('pricing.yearly.save')} {formattedYearlySavings}
                </p>
              </div>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="gradient" className="w-full" asChild>
                <Link to="/signup?plan=yearly">
                  {t('pricing.cta.bestValue')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <p className="text-sm">{t('pricing.trial.description')}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t('pricing.guarantee')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
