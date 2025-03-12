
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { TransactionType } from "../../../../types";
import { TransactionFormData } from "../../validation/schema";

/**
 * Form sıfırlama işlemleri için hook
 */
export const useFormReset = (
  form: UseFormReturn<TransactionFormData>,
  isSuccess: boolean
) => {
  // Başarılı form gönderiminden sonra formu sıfırlama
  const resetForm = () => {
    if (isSuccess) {
      form.reset({
        amount: "",
        description: "",
        transactionType: TransactionType.INCOME,
        transactionDate: new Date(),
        transactionTime: {
          hour: format(new Date(), "HH"),
          minute: format(new Date(), "mm")
        },
        categoryId: "no-category",
        subcategoryId: "no-subcategory",
      });
    }
  };

  return {
    resetForm
  };
};
