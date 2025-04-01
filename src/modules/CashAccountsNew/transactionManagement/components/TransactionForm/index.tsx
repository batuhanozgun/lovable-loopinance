
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { TransactionFormContent } from './components/TransactionFormContent';
import { FormActions } from './components/FormActions';
import { StatementInfoSection } from './components/StatementInfoSection';
import { useTransactionForm } from '../../hooks/useTransactionForm';
import { useTransactionFormSetup } from '../../hooks/useTransactionFormSetup';
import { Transaction, TransactionFormProps } from '../../types';
import { useTransactionUpdate } from '../../hooks/useTransactionUpdate';

export const TransactionForm: React.FC<TransactionFormProps> = ({
  accountId,
  statementId,
  currency,
  isOpen,
  onClose,
  transaction
}) => {
  const { t } = useTranslation('TransactionManagement');
  const isEditMode = !!transaction;
  
  const { transactionToFormData } = useTransactionUpdate();
  
  // Form kurulumu
  const {
    form,
    statement,
    isLoading,
    handleSubmit,
    isStatementLocked,
    toggleStatementLock,
    onStatementSelect,
  } = useTransactionFormSetup({
    accountId,
    statementId,
    initialFormValues: isEditMode && transaction ? 
      transactionToFormData(transaction as Transaction) : 
      undefined
  });
  
  // İşlem formu kancası
  const { submitTransaction, isSubmitting } = useTransactionForm();
  
  // İşlem güncelleme kancası
  const { updateTransaction, isUpdating } = useTransactionUpdate();

  // Form gönderimi işlemi
  const onSubmit = async (data: any) => {
    if (!statement) return;
    
    let success = false;
    
    if (isEditMode && transaction) {
      // İşlem güncelleme
      success = await updateTransaction(transaction.id, data);
    } else {
      // Yeni işlem oluşturma
      success = await submitTransaction({
        ...data,
        accountId,
        statementId: statement.id,
      });
    }
    
    if (success) {
      onClose(true); // true parametresi, işlemin başarıyla tamamlandığını belirtir
    }
  };
  
  // Dialog kapatıldığında formu sıfırla
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t('transaction.edit') : t('transaction.add')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Ekstre bilgisi ve kilitleme */}
          <StatementInfoSection
            statement={statement}
            isLoading={isLoading}
            isLocked={isStatementLocked}
            onToggleLock={toggleStatementLock}
            onStatementSelect={onStatementSelect}
            accountId={accountId}
            selectedStatementId={statementId}
          />
          
          {/* İşlem formu içeriği */}
          <TransactionFormContent
            form={form}
            currency={currency}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>
        
        <DialogFooter>
          <FormActions
            onCancel={() => onClose()}
            isSubmitting={isSubmitting || isUpdating}
            isEditMode={isEditMode}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
