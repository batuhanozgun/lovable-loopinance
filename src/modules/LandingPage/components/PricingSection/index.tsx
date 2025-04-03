
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, BadgePercent, Shield, Clock, Star } from 'lucide-react';
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
    <section id="pricing" className="py-12 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3">{t('pricing.title')}</h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-2 py-1 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {t('pricing.trial.info')}
            </Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly Plan Card */}
          <Card className="border border-border flex flex-col h-full">
            <CardHeader className="pb-1 p-4">
              <CardTitle className="text-lg">{t('pricing.monthly.title')}</CardTitle>
              <CardDescription className="text-xs">{t('pricing.monthly.description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-4">
                <p className="text-2xl font-bold">
                  {formattedMonthlyPrice}
                  <span className="text-xs text-muted-foreground ml-1">
                    {t('pricing.monthly.period')}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('pricing.monthly.billing')}
                </p>
              </div>
              
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full text-xs py-1 h-8" size="sm" asChild>
                <Link to="/signup?plan=monthly">
                  {t('pricing.cta.getStarted')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Yearly Plan Card */}
          <Card className="border-2 border-primary flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] py-0.5 px-2 rounded-bl-lg">
              {t('pricing.recommended')}
            </div>
            
            <CardHeader className="pb-1 p-4">
              <div className="flex items-center gap-1.5 mb-0.5">
                <CardTitle className="text-lg">{t('pricing.yearly.title')}</CardTitle>
                <BadgePercent className="h-4 w-4 text-primary" />
              </div>
              <CardDescription className="text-xs">{t('pricing.yearly.description')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="mb-4">
                <div className="flex items-center gap-1.5">
                  <p className="text-2xl font-bold">
                    {formattedYearlyPrice}
                    <span className="text-xs text-muted-foreground ml-1">
                      {t('pricing.yearly.period')}
                    </span>
                  </p>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-[10px] px-1.5 py-0.5 rounded-full">
                    {t('pricing.yearly.discount', { percent: yearlyDiscount })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('pricing.yearly.billing')}
                </p>
                <p className="text-xs text-primary font-medium mt-1.5">
                  {t('pricing.yearly.save')} {formattedYearlySavings}
                </p>
              </div>
              
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button variant="gradient" className="w-full text-xs py-1 h-8" size="sm" asChild>
                <Link to="/signup?plan=yearly">
                  {t('pricing.cta.bestValue')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <Star className="h-3 w-3 text-blue-500" />
              <p className="text-xs font-medium">{t('pricing.trial.description')}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{t('pricing.guarantee')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
