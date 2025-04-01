
/**
 * İşlem silme için özel hook
 */
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TransactionDeletionService } from '../services/TransactionDeletionService';

export const useTransactionDeletion = () => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  /**
   * İşlemi siler
   */
  const deleteTransaction = async (transactionId: string): Promise<boolean> => {
    try {
      setIsDeleting(true);
      
      // İşlemi sil
      const result = await TransactionDeletionService.deleteTransaction(transactionId);
      
      if (!result.success) {
        // Hata durumunda bildirim göster
        toast({
          title: t('common:error', { ns: 'common' }),
          description: t(`errors.transaction.delete.${result.error}`, { 
            ns: 'TransactionManagement',
            defaultValue: result.error || t('errors.transaction.delete.failed', { ns: 'TransactionManagement' })
          }),
          variant: 'destructive',
        });
        return false;
      }
      
      // Başarılı bildirim göster
      toast({
        title: t('common:success', { ns: 'common' }),
        description: t('transaction.deleteSuccess', { ns: 'TransactionManagement' }),
      });
      
      return true;
    } catch (error) {
      // Beklenmeyen hata durumunda bildirim göster
      toast({
        title: t('common:error', { ns: 'common' }),
        description: t('errors.transaction.delete.failed', { ns: 'TransactionManagement' }),
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };
  
  return {
    deleteTransaction,
    isDeleting
  };
};
