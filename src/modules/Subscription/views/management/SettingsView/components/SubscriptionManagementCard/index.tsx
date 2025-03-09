
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ISubscriptionSummary, SubscriptionStatus } from '@/modules/Subscription/types/ISubscription';
import { CancellationDialog } from '../CancellationDialog';

interface SubscriptionManagementCardProps {
  subscription: ISubscriptionSummary | null;
}

export const SubscriptionManagementCard: React.FC<SubscriptionManagementCardProps> = ({
  subscription
}) => {
  const { t } = useTranslation(['Subscription']);
  const [isAutoRenew, setIsAutoRenew] = useState(true);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  
  // If no subscription data, return null or loading state
  if (!subscription) return null;
  
  // Check if subscription is canceled
  const isCanceled = subscription.status === SubscriptionStatus.CANCELED;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t('Subscription:settings.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('Subscription:settings.autoRenew')}</p>
              <p className="text-sm text-muted-foreground">
                {isAutoRenew 
                  ? "Aboneliğiniz otomatik olarak yenilenecek" 
                  : "Aboneliğiniz dönem sonunda sona erecek"}
              </p>
            </div>
            <Switch 
              checked={isAutoRenew} 
              onCheckedChange={setIsAutoRenew}
              disabled={isCanceled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('Subscription:settings.notifications')}</p>
              <p className="text-sm text-muted-foreground">
                Fatura ve abonelikle ilgili bildirimler
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="border-t pt-4">
            {!isCanceled ? (
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => setIsCancellationOpen(true)}
              >
                {t('Subscription:settings.cancelSubscription')}
              </Button>
            ) : (
              <Button variant="default" className="w-full">
                {t('Subscription:settings.reactivateSubscription')}
              </Button>
            )}
          </div>
          
          {isCanceled && (
            <p className="text-sm text-muted-foreground">
              {t('Subscription:settings.canceledDescription')}
            </p>
          )}
        </div>
      </CardContent>
      
      <CancellationDialog 
        open={isCancellationOpen} 
        onOpenChange={setIsCancellationOpen}
      />
    </Card>
  );
};
