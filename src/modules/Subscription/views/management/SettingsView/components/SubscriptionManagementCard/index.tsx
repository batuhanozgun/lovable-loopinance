
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ISubscriptionSummary, SubscriptionStatus } from '../../../../../../types/ISubscription';

interface SubscriptionManagementCardProps {
  subscription: ISubscriptionSummary | null;
  onCancelClick: () => void;
  onReactivateClick: () => void;
}

export const SubscriptionManagementCard: React.FC<SubscriptionManagementCardProps> = ({
  subscription,
  onCancelClick,
  onReactivateClick
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const isturkish = i18n.language.startsWith('tr');
  
  if (!subscription) return null;
  
  const isCanceled = subscription.status === SubscriptionStatus.CANCELED;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">
          {isturkish ? 'Abonelik Yönetimi' : 'Subscription Management'}
        </CardTitle>
        <CardDescription>
          {isturkish
            ? 'Aboneliğinizi iptal etmek veya yeniden etkinleştirmek için bu bölümü kullanın'
            : 'Use this section to cancel or reactivate your subscription'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          {isCanceled
            ? t('Subscription:settings.canceledDescription')
            : t('Subscription:settings.cancelDescription')}
        </p>
      </CardContent>
      <CardFooter>
        {isCanceled ? (
          <Button
            variant="default"
            onClick={onReactivateClick}
          >
            {t('Subscription:settings.reactivateSubscription')}
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={onCancelClick}
          >
            {t('Subscription:settings.cancelSubscription')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
