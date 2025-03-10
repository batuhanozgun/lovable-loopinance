
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * İşlem hata mesajlarını yönetmek için hook
 */
export const useTransactionErrors = () => {
  const { t } = useTranslation(['CashAccounts', 'common']);
  const { toast } = useToast();

  /**
   * Hata mesajını gösterir
   */
  const showErrorToast = (error?: string) => {
    toast({
      variant: 'destructive',
      title: t('common:error'),
      description: error || t('CashAccounts:errors.transaction.list.failed'),
    });
  };

  return { showErrorToast };
};
