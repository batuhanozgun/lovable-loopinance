
import { useQuery } from '@tanstack/react-query';
import { CashAccountService } from '../services/CashAccountService';
import { CashAccount } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Kullanıcının nakit hesaplarını getiren hook
 */
export const useCashAccounts = () => {
  const { t } = useTranslation(['CashAccountsNew', 'common']);
  const { toast } = useToast();

  return useQuery({
    queryKey: ['cashAccountsNew'],
    queryFn: async (): Promise<CashAccount[]> => {
      const response = await CashAccountService.getUserCashAccounts();
      
      if (!response.success) {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: response.error || t('CashAccountsNew:errors.account.list.failed'),
        });
        return [];
      }
      
      return response.data as CashAccount[];
    }
  });
};
