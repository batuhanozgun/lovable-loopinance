
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SessionService } from '@/modules/UserManagement/auth';
import { SubscriptionService } from '../services/SubscriptionService';
import { ISubscription } from '../types/ISubscription';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        setIsLoading(true);
        
        // Mevcut kullanıcıyı al
        const currentUser = await SessionService.getCurrentUser();
        
        if (!currentUser) {
          setError('Kullanıcı bilgisi bulunamadı');
          return;
        }
        
        // Kullanıcının abonelik durumunu kontrol et
        const response = await SubscriptionService.checkSubscriptionStatus(currentUser.id);
        
        if (!response.success) {
          setError(response.error || 'Abonelik bilgileri alınamadı');
          return;
        }
        
        setSubscription(response.subscription || null);
        setDaysRemaining(response.daysRemaining || 0);
        setError(null);
      } catch (err) {
        console.error('Abonelik bilgileri yüklenirken hata oluştu:', err);
        setError('Abonelik bilgileri yüklenirken bir hata oluştu');
        
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Abonelik bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, [toast]);

  return {
    subscription,
    isLoading,
    error,
    daysRemaining,
    isActive: subscription?.status === 'active' || subscription?.status === 'trial',
    isExpired: subscription?.status === 'expired',
    isCancelled: subscription?.status === 'cancelled',
    isTrial: subscription?.status === 'trial'
  };
};
