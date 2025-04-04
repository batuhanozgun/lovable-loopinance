
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, BadgePercent, Shield, Clock, Star } from 'lucide-react';
import { useSubscriptionPrice } from '@/modules/Subscription/views/management/shared/hooks/useSubscriptionPrice';
import { useSubscriptionLocale } from '@/modules/Subscription/views/management/shared/hooks/useSubscriptionLocale';
import { formatPrice } from '@/modules/Subscription/views/management/shared/utils/formatters';

import {
  Section,
  Container,
  Heading,
  Text,
  Grid,
  Badge,
  IconWrapper
} from '@/modules/LandingPage/styles';

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
    <Section id="pricing" variant="pricing" background="none">
      <Container size="default">
        <div className="text-center mb-10">
          <Heading level="h2" className="mb-3">
            {t('pricing.title')}
          </Heading>
          
          <Text variant="muted" className="max-w-xl mx-auto">
            {t('pricing.subtitle')}
          </Text>
          
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-2 py-1 text-xs"
            >
              <IconWrapper variant="primary" size="xs" className="mr-1">
                <Clock />
              </IconWrapper>
              {t('pricing.trial.info')}
            </Badge>
          </div>
        </div>
        
        <Grid cols={2} gap="md" className="max-w-3xl mx-auto">
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
                    <IconWrapper variant="primary" size="xs" className="mr-1.5 mt-0.5">
                      <Check />
                    </IconWrapper>
                    <Text size="xs">{feature}</Text>
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
                <IconWrapper variant="primary" size="xs">
                  <BadgePercent />
                </IconWrapper>
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
                    <IconWrapper variant="primary" size="xs" className="mr-1.5 mt-0.5">
                      <Check />
                    </IconWrapper>
                    <Text size="xs">{feature}</Text>
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
        </Grid>
        
        <div className="mt-8 text-center">
          <div className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <IconWrapper variant="primary" size="xs">
                <Star />
              </IconWrapper>
              <Text size="xs" weight="medium">{t('pricing.trial.description')}</Text>
            </div>
            <div className="flex items-center gap-1.5">
              <IconWrapper variant="muted" size="xs">
                <Shield />
              </IconWrapper>
              <Text size="xs" variant="muted">{t('pricing.guarantee')}</Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
