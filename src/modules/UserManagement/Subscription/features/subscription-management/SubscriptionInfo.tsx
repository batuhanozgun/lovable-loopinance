
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../hooks/useSubscription';
import { SubscriptionStatusDisplay } from '../status/components/SubscriptionStatusDisplay';
import { TrialInfoDisplay } from '../trial/components/TrialInfoDisplay';
import { PaymentInfoDisplay } from '../payment/components/PaymentInfoDisplay';

export const SubscriptionInfo: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { subscription, isLoading, daysRemaining, isTrial, isActive, isExpired } = useSubscription();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Abonelik Bilgisi</CardTitle>
          <CardDescription>Abonelik durumunuz yükleniyor...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-20 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Abonelik Bilgisi</CardTitle>
          <CardDescription>Abonelik bilgisi bulunamadı</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Abonelik bilgileriniz şu anda görüntülenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Abonelik Bilgisi</CardTitle>
            <CardDescription>Mevcut abonelik durumunuz</CardDescription>
          </div>
          <SubscriptionStatusDisplay 
            status={subscription.status} 
            planType={subscription.plan_type} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isTrial && (
            <TrialInfoDisplay 
              trialEndsAt={subscription.trial_ends_at}
              daysRemaining={daysRemaining || 0}
            />
          )}

          {isActive && !isTrial && (
            <PaymentInfoDisplay 
              planType={subscription.plan_type}
              periodEndsAt={subscription.current_period_ends_at}
              daysRemaining={daysRemaining || 0}
            />
          )}

          {isExpired && (
            <>
              <p className="text-destructive font-medium">
                Aboneliğinizin süresi dolmuştur. Uygulamaya erişim için lütfen aboneliğinizi yenileyin.
              </p>
              <div className="mt-6">
                <Button className="w-full" variant="default" asChild>
                  <Link to="/pricing">Aboneliği Yenile</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
