
import { SubscriptionStatus, ISubscriptionSummary } from "../../../../types/ISubscription";

/**
 * Abonelik durumuna göre UI davranışlarını belirleyen hook
 */
export const useSubscriptionStatus = (subscription: ISubscriptionSummary | null) => {
  /**
   * Durum badge'ı için variant döndürür
   */
  const getStatusBadgeVariant = (): string => {
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
  
  return {
    getStatusBadgeVariant,
    isActive: subscription?.isActive || false,
    isTrial: subscription?.isTrial || false,
    daysRemaining: subscription?.daysRemaining || 0
  };
};
