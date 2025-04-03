
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { toast } from "sonner";
import { TransactionFormData, Transaction } from "../types";
import { TransactionUpdateService } from "../services/TransactionUpdateService";
import { StatementFinderService } from "../services/StatementFinderService";

/**
 * İşlem düzenleme işlemlerini yöneten hook
 */
export const useTransactionEdit = () => {
  const { t } = useTranslation(["TransactionManagement", "common"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Güncellenen işlem verilerini hazırla
  const prepareUpdateData = (
    formData: TransactionFormData,
    accountId: string,
    statementId: string
  ): Transaction => {
    // İşlem tarihini ISO formatına dönüştür
    const formattedDate = format(formData.transactionDate, "yyyy-MM-dd");
    // İşlem saatini ISO formatına dönüştür
    const formattedTime = `${formData.transactionTime.hour}:${formData.transactionTime.minute}:00`;

    // Kategori ve alt kategori ID'leri
    const categoryId = formData.categoryId !== "no-category" ? formData.categoryId : null;
    const subcategoryId = formData.subcategoryId !== "no-subcategory" ? formData.subcategoryId : null;

    // API'ye gönderilecek veriyi hazırla
    return {
      id: "",  // Bu alan güncelleme sırasında servis tarafından değiştirilecek
      account_id: accountId,
      statement_id: statementId,
      amount: parseFloat(formData.amount.replace(",", ".")),
      transaction_type: formData.transactionType,
      transaction_date: formattedDate,
      transaction_time: formattedTime,
      description: formData.description || "",
      category_id: categoryId,
      subcategory_id: subcategoryId,
      created_at: "",  // Bu alan güncelleme sırasında servis tarafından değiştirilecek
      updated_at: "",  // Bu alan güncelleme sırasında servis tarafından değiştirilecek
    };
  };

  // Tarih değişikliği için uygun ekstreyi bul
  const findStatementForDate = async (accountId: string, date: Date): Promise<string | null> => {
    try {
      const statement = await StatementFinderService.findStatementForDate(accountId, date);
      return statement ? statement.id : null;
    } catch (error) {
      console.error("Error finding statement for date:", error);
      return null;
    }
  };

  // İşlem güncelleme
  const handleUpdateTransaction = async (
    transactionId: string,
    updateData: Transaction,
    oldStatementId: string,
    newStatementId: string,
    accountId: string
  ): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      console.log("Updating transaction with data:", {
        transactionId,
        updateData,
        oldStatementId,
        newStatementId,
        isStatementChanged: oldStatementId !== newStatementId,
      });

      const response = await TransactionUpdateService.updateTransaction(
        transactionId,
        updateData,
        oldStatementId !== newStatementId,
        accountId
      );

      if (response.success) {
        toast.success(t("TransactionManagement:transaction.updateSuccess"));
        return true;
      } else {
        toast.error(
          response.error || t("TransactionManagement:errors.transaction.updateFailed")
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error(t("TransactionManagement:errors.transaction.updateFailed"));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    prepareUpdateData,
    handleUpdateTransaction,
    findStatementForDate,
    isSubmitting,
  };
};
