
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

const logger = LoggerService.getInstance("SubscriptionError");

/**
 * Abonelik hata yönetim hook'u
 */
export const useSubscriptionError = (error: string | null) => {
  const { toast } = useToast();
  
  useEffect(() => {
    if (error) {
      showErrorToast();
      logger.error("Abonelik hatası oluştu", { error });
    }
  }, [error]);
  
  const showErrorToast = () => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Abonelik bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      });
    }
  };
  
  const clearError = () => {
    // Bu fonksiyon, error state'ini temizlemek için kullanılabilir
    // Örneğin: setError(null) şeklinde bir state güncelleme fonksiyonu
    // ancak şu an için kullanılmıyor
  };
  
  return {
    showErrorToast,
    clearError,
    hasError: !!error
  };
};
