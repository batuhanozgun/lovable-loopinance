
import { useQuery } from '@tanstack/react-query';
import { CashAccountService } from '../services/CashAccountService';
import { CashAccount } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Kullanıcının nakit hesaplarını getiren hook
 */
export const useCashAccounts = () => {
  const { t } = useTranslation(['CashAccountHomepage', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountsNew'],
    queryFn: async (): Promise<CashAccount[]> => {
      const response = await CashAccountService.getUserCashAccounts();
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('errors.account.list.failed'),
        });
        return [];
      }
      
      return response.data as CashAccount[];
    },
    // İşlem sonrası otomatik yenileme için ayarlar
    staleTime: 0, // Verileri her zaman güncel olarak işaretle
    refetchOnWindowFocus: true, // Pencere odaklandığında otomatik olarak yenile
  });
};
