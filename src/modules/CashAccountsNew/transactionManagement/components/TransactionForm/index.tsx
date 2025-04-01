
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
  const setupOptions = isEditMode && transaction 
    ? { 
        initialFormValues: transactionToFormData(transaction as Transaction)
      }
    : {};
  
  const {
    form,
    date,
    setDate,
    time,
    setTime,
    selectedCategoryId,
    handleCategoryChange,
    onSubmit,
    isSubmitting,
    statement,
    statementId: currentStatementId,
    isLoadingStatement,
    statementError,
    lockStatement,
    toggleStatementLock
  } = useTransactionFormSetup(accountId, statementId);
  
  // İşlem formu kancası
  const { handleCreateTransaction, prepareTransactionData } = useTransactionForm();
  
  // İşlem güncelleme kancası
  const { updateTransaction, isUpdating } = useTransactionUpdate();

  // Form gönderimi işlemi
  const handleSubmit = async (data: any) => {
    if (!currentStatementId) return;
    
    let success = false;
    
    if (isEditMode && transaction) {
      // İşlem güncelleme
      success = await updateTransaction(transaction.id, data);
    } else {
      // Yeni işlem oluşturma
      const transactionData = prepareTransactionData(data, accountId, currentStatementId);
      success = await handleCreateTransaction(transactionData);
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
            isLoading={isLoadingStatement}
            isLocked={lockStatement}
            onToggleLock={toggleStatementLock}
            accountId={accountId}
            selectedStatementId={currentStatementId || ''}
            statement={statement}
          />
          
          {/* İşlem formu içeriği */}
          <TransactionFormContent
            form={form}
            currency={currency}
            onSubmit={form.handleSubmit(handleSubmit)}
          />
        </div>
        
        <DialogFooter>
          <FormActions
            isSubmitting={isSubmitting || isUpdating}
            isEditMode={isEditMode}
            handleCancel={() => onClose()}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
