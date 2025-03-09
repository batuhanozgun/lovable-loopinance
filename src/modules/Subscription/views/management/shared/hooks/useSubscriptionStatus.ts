
import { useTranslation } from 'react-i18next';
import { ISubscriptionSummary, SubscriptionStatus } from '../../../../types/ISubscription';

/**
 * Abonelik durumu ile ilgili bilgileri sağlayan hook
 */
export const useSubscriptionStatus = (subscription: ISubscriptionSummary | null) => {
  const { t } = useTranslation(['Subscription', 'common']);

  // Abonelik durumuna göre rozet variantını belirle
  const getStatusBadgeVariant = () => {
    if (!subscription) return 'outline';
    
    switch (subscription.status) {
      case SubscriptionStatus.ACTIVE:
        return 'success';
      case SubscriptionStatus.TRIAL:
        return subscription.daysRemaining <= 7 ? 'destructive' : 'default';
      case SubscriptionStatus.EXPIRED:
        return 'destructive';
      case SubscriptionStatus.CANCELED:
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  // Durum metni
  const getStatusText = () => {
    if (!subscription) return '';
    return t(`Subscription:status.${subscription.status}`);
  };
  
  // Abonelik bilgi metni
  const getSubscriptionInfoText = () => {
    if (!subscription) return '';
    
    if (subscription.status === SubscriptionStatus.TRIAL) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.trialRemaining', { days: subscription.daysRemaining })
        : t('Subscription:info.trialExpired');
    }
    
    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return subscription.daysRemaining > 0
        ? t('Subscription:info.subscriptionRemaining', { days: subscription.daysRemaining })
        : '';
    }
    
    if (subscription.status === SubscriptionStatus.EXPIRED) {
      return t('Subscription:info.expired');
    }
    
    return '';
  };

  return {
    getStatusBadgeVariant,
    getStatusText,
    getSubscriptionInfoText
  };
};
