
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionStatus } from '../../../../../types/ISubscription';

interface SubscriptionManagementCardProps {
  status: SubscriptionStatus | null;
  onCancel: () => void;
  onReactivate: () => void;
}

export const SubscriptionManagementCard: React.FC<SubscriptionManagementCardProps> = ({
  status,
  onCancel,
  onReactivate
}) => {
  const { t, i18n } = useTranslation(['Subscription', 'common']);
  const isTurkish = i18n.language.startsWith('tr');
  
  const isCanceled = status === SubscriptionStatus.CANCELED;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">
          {isTurkish ? 'Abonelik Yönetimi' : 'Subscription Management'}
        </CardTitle>
        <CardDescription>
          {isTurkish
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
            onClick={onReactivate}
          >
            {t('Subscription:settings.reactivateSubscription')}
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={onCancel}
          >
            {t('Subscription:settings.cancelSubscription')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
