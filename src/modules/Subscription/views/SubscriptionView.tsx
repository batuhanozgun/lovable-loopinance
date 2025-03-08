
import React, { useEffect } from 'react';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { useTranslation } from 'react-i18next';
import { viewsLogger } from '../logging';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionPlanType } from '../types/ISubscription';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const SubscriptionView: React.FC = () => {
  const { t } = useTranslation(['Subscription', 'common']);
  const { subscription, updatePlan, isLoading } = useSubscription();
  
  useEffect(() => {
    viewsLogger.debug('Abonelik sayfası görüntülendi');
  }, []);
  
  const handleUpgrade = async (planType: SubscriptionPlanType) => {
    viewsLogger.debug('Plan yükseltme isteği', { planType });
    await updatePlan(planType);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{t('Subscription:subscription.status.title')}</h1>
      
      <div className="grid gap-6">
        <SubscriptionCard />
        
        {!isLoading && subscription && !subscription.isActive && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">{t('Subscription:plans.title')}</h2>
            <Separator className="my-4" />
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium">{t('Subscription:plan.monthly')}</h3>
                <p className="text-2xl font-bold mt-2">₺49<span className="text-sm text-muted-foreground font-normal">/ay</span></p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Tüm özelliklere erişim
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Sınırsız hesap
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Gelişmiş analizler
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handleUpgrade(SubscriptionPlanType.MONTHLY)}
                >
                  {t('Subscription:actions.subscribe')}
                </Button>
              </div>
              
              <div className="border border-primary rounded-lg p-6 bg-card">
                <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full inline-block mb-2">
                  %20 İndirim
                </div>
                <h3 className="text-lg font-medium">{t('Subscription:plan.yearly')}</h3>
                <p className="text-2xl font-bold mt-2">₺39<span className="text-sm text-muted-foreground font-normal">/ay</span></p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Tüm özelliklere erişim
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Sınırsız hesap
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Gelişmiş analizler
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="mr-2">✓</span> Öncelikli destek
                  </li>
                </ul>
                <Button 
                  className="w-full mt-6"
                  variant="gradient"
                  onClick={() => handleUpgrade(SubscriptionPlanType.YEARLY)}
                >
                  {t('Subscription:actions.subscribe')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
