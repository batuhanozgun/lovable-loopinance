
import { useToast } from '@/hooks/use-toast';

/**
 * Abonelik hata yönetim hook'u
 */
export const useSubscriptionError = (error: string | null) => {
  const { toast } = useToast();
  
  const showErrorToast = () => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Abonelik bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      });
    }
  };
  
  return {
    showErrorToast
  };
};
