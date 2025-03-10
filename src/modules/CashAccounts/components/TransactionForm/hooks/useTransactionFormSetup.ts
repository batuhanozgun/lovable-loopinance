
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { TransactionType } from "../../../types";
import { useTransactionForm } from "../../../hooks/useTransactionForm";
import { createTransactionFormSchema, TransactionFormData } from "../validation/schema";

/**
 * İşlem formu kurulumu için hook
 */
export const useTransactionFormSetup = (
  accountId: string,
  statementId: string
) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleCreateTransaction, isSubmitting } = useTransactionForm();
  const [date, setDate] = useState<Date>(new Date());

  // Form doğrulama şeması
  const formSchema = createTransactionFormSchema(t);

  // React Hook Form kurulumu
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionType: TransactionType.INCOME,
    },
  });

  // Form gönderme işlemi
  const onSubmit = async (data: TransactionFormData) => {
    // İşlem verisini formatla
    const transaction = {
      account_id: accountId,
      statement_id: statementId,
      amount: Number(data.amount),
      description: data.description || null,
      transaction_type: data.transactionType,
      transaction_date: format(date, "yyyy-MM-dd"),
      transaction_time: format(new Date(), "HH:mm:ss"),
    };

    const success = await handleCreateTransaction(transaction);
    if (success) {
      form.reset();
      return true;
    }
    
    return false;
  };

  return {
    form,
    date,
    setDate,
    onSubmit,
    isSubmitting,
  };
};
