
import { useState, useEffect, useCallback } from 'react';
import { SessionService } from '@/modules/UserManagement/auth/services/SessionService';
import { subscriptionLogger } from '../logging';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

/**
 * Mevcut kullanıcı oturum bilgisini almak için hook
 */
export const useSessionUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { t } = useTranslation(['Subscription', 'common']);
  const { toast } = useToast();

  // Kullanıcı kimliğini yeniden yükleme fonksiyonu
  const refreshUserSession = useCallback(async (forceRetry = false) => {
    try {
      setIsSessionLoading(true);
      
      if (forceRetry) {
        // Yeni bir deneme başlatılıyorsa, deneme sayacını artır
        setRetryCount(prev => prev + 1);
      }
      
      subscriptionLogger.debug('Oturum bilgisi alınıyor', { 
        retryCount: forceRetry ? retryCount + 1 : retryCount
      });
      
      const sessionResponse = await SessionService.getCurrentSession();
      
      if (!sessionResponse.success || !sessionResponse.user) {
        const errorMsg = t('Subscription:errors.session.error');
        subscriptionLogger.error('Oturum bilgisi alınamadı', { 
          error: sessionResponse.error || 'Kullanıcı bilgisi bulunamadı',
          retryAttempt: retryCount 
        });
        
        // Eğer deneme sayısı 2'den az ise, tekrar dene
        if (retryCount < 2 && !sessionResponse.error?.includes('network')) {
          subscriptionLogger.debug('Oturum bilgisi yeniden alınmaya çalışılacak', {
            retryCount: retryCount + 1 
          });
          
          // Kısa bir bekleme süresi sonra tekrar dene
          setTimeout(() => {
            refreshUserSession(true);
          }, 500);
          return;
        }
        
        setSessionError(errorMsg);
        setUserId(null);
        
        // Kullanıcıya sorun hakkında bilgi ver
        if (retryCount >= 2) {
          toast({
            title: t('common:error'),
            description: t('Subscription:errors.session.missing'),
            variant: "destructive",
          });
        }
      } else {
        subscriptionLogger.debug('Oturum bilgisi başarıyla alındı', { 
          userId: sessionResponse.user.id,
          retryAttempt: retryCount 
        });
        setUserId(sessionResponse.user.id);
        setSessionError(null);
        // Başarılı olursa deneme sayısını sıfırla
        setRetryCount(0);
      }
    } catch (error) {
      const errorMsg = t('Subscription:errors.session.error');
      subscriptionLogger.error('Oturum bilgisi yüklenirken beklenmeyen hata', {
        error,
        retryAttempt: retryCount
      });
      
      // Eğer deneme sayısı 2'den az ise, tekrar dene
      if (retryCount < 2) {
        subscriptionLogger.debug('Hata sonrası oturum bilgisi yeniden alınmaya çalışılacak', {
          retryCount: retryCount + 1 
        });
        
        // Kısa bir bekleme süresi sonra tekrar dene
        setTimeout(() => {
          refreshUserSession(true);
        }, 500);
        return;
      }
      
      setSessionError(errorMsg);
      setUserId(null);
      
      // Son denemede de başarısız olursa kullanıcıya bildir
      toast({
        title: t('common:error'),
        description: t('Subscription:errors.session.missing'),
        variant: "destructive",
      });
    } finally {
      if (retryCount >= 2 || userId !== null) {
        setIsSessionLoading(false);
      }
    }
  }, [retryCount, t, toast, userId]);

  // İlk yükleme ve komponent mount olduğunda çalış
  useEffect(() => {
    refreshUserSession();
  }, [refreshUserSession]);

  return { 
    userId, 
    isSessionLoading, 
    sessionError, 
    refreshUserSession 
  };
};
