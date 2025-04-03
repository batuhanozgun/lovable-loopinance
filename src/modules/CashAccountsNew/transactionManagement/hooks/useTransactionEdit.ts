
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Transaction, CreateTransactionData, TransactionFormData } from "../types";
import { StatementFinderService } from "../services/StatementFinderService";
import { TransactionUpdateService } from "../services/TransactionUpdateService";
import { format } from "date-fns";

/**
 * İşlem düzenleme hook'u
 */
export const useTransactionEdit = () => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * İşlem verisini form datasına dönüştürür
   */
  const prepareFormData = (transaction: Transaction): TransactionFormData => {
    try {
      // Transaction date ve time değerlerini ayır
      const transactionDate = new Date(transaction.transaction_date);
      const [hour, minute] = transaction.transaction_time.substring(0, 5).split(':');

      return {
        amount: transaction.amount.toString(),
        transactionType: transaction.transaction_type,
        transactionDate: transactionDate,
        transactionTime: {
          hour,
          minute
        },
        description: transaction.description || '',
        categoryId: transaction.category_id || 'no-category',
        subcategoryId: transaction.subcategory_id || 'no-subcategory'
      };
    } catch (error) {
      console.error('Error preparing form data:', error);
      toast.error(t('common:errors.unexpectedError', { ns: 'common' }));
      throw error;
    }
  };

  /**
   * Form verilerini API formatına dönüştür
   */
  const prepareUpdateData = (
    formData: TransactionFormData,
    accountId: string,
    statementId: string
  ): CreateTransactionData => {
    try {
      // Form değerlerini API formatına dönüştür
      const { hour, minute } = formData.transactionTime;
      const transactionTime = `${hour}:${minute}:00`;
      
      // Tarihi formatla (YYYY-MM-DD)
      const formattedDate = format(formData.transactionDate, 'yyyy-MM-dd');
      
      return {
        account_id: accountId,
        statement_id: statementId,
        amount: parseFloat(formData.amount.replace(',', '.')),
        transaction_type: formData.transactionType,
        transaction_date: formattedDate,
        transaction_time: transactionTime,
        description: formData.description,
        category_id: formData.categoryId !== 'no-category' ? formData.categoryId : null,
        subcategory_id: formData.subcategoryId !== 'no-subcategory' ? formData.subcategoryId : null
      };
    } catch (error) {
      console.error('Error preparing update data:', error);
      toast.error(t('common:errors.unexpectedError', { ns: 'common' }));
      throw error;
    }
  };

  /**
   * Form submit işlevi - işlem günceller
   */
  const handleUpdateTransaction = async (
    transactionId: string,
    updateData: Partial<CreateTransactionData>,
    oldStatementId: string,
    newStatementId: string,
    accountId: string
  ): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      console.log('Updating transaction:', { transactionId, updateData, oldStatementId, newStatementId });
      
      // Ekstre değişimi var mı?
      if (oldStatementId !== newStatementId) {
        console.log('Statement change detected. Old:', oldStatementId, 'New:', newStatementId);
        
        // Önce ekstre değişimi yap
        const statementChangeResult = await TransactionUpdateService.changeTransactionStatement(
          transactionId,
          newStatementId,
          accountId
        );
        
        if (!statementChangeResult.success) {
          console.error('Failed to change transaction statement:', statementChangeResult.error);
          toast.error(t('errors.transaction.update.failed'));
          return false;
        }
        
        console.log('Statement changed successfully. Now updating other fields.');
        
        // statement_id'yi güncelleme verilerinden çıkar (zaten değiştirildi)
        const { statement_id, ...otherData } = updateData;
        
        // Diğer alanları güncelle
        if (Object.keys(otherData).length > 0) {
          const updateResult = await TransactionUpdateService.updateTransaction(transactionId, otherData);
          
          if (!updateResult.success) {
            console.error('Failed to update transaction details:', updateResult.error);
            toast.error(t('errors.transaction.update.failed'));
            return false;
          }
        }
      } else {
        // Ekstre değişimi yoksa, direkt güncelle
        console.log('No statement change, updating transaction directly');
        const updateResult = await TransactionUpdateService.updateTransaction(transactionId, updateData);
        
        if (!updateResult.success) {
          console.error('Failed to update transaction:', updateResult.error);
          toast.error(t('errors.transaction.update.failed'));
          return false;
        }
      }
      
      // Başarılı güncelleme
      toast.success(t('transaction.updateSuccess'));
      return true;
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error(t('errors.transaction.update.failed'));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Tarih değiştiğinde ilgili ekstreyi bul
   */
  const findStatementForDate = async (
    accountId: string,
    date: Date
  ): Promise<string | null> => {
    try {
      const statement = await StatementFinderService.findStatementForDate(accountId, date);
      return statement?.id || null;
    } catch (error) {
      console.error('Error finding statement for date:', error);
      return null;
    }
  };

  return {
    isSubmitting,
    prepareFormData,
    prepareUpdateData,
    handleUpdateTransaction,
    findStatementForDate
  };
};
