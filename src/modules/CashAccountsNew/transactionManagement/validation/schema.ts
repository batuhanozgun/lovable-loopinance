
import { z } from "zod";
import { TransactionType } from "../types";

/**
 * İşlem formu doğrulama şeması oluşturma fonksiyonu
 * @param t Çeviri fonksiyonu
 * @returns Zod validasyon şeması
 */
export const createTransactionFormSchema = (t: (key: string) => string) => {
  return z.object({
    amount: z.string()
      .min(1, {
        message: t("CashAccountsNew:validation.transaction.amount.required"),
      })
      .refine((val) => {
        // Sayı formatını kontrol et (noktalar ve virgüller olabilir)
        const cleaned = val.replace(/\./g, '').replace(',', '.');
        const num = parseFloat(cleaned);
        return !isNaN(num) && num > 0;
      }, {
        message: t("CashAccountsNew:validation.transaction.amount.min"),
      }),
    transactionType: z.enum([TransactionType.INCOME, TransactionType.EXPENSE], {
      required_error: t("CashAccountsNew:validation.transaction.type.required"),
    }),
    transactionDate: z.date({
      required_error: t("CashAccountsNew:validation.transaction.date.required"),
    }),
    transactionTime: z.object({
      hour: z.string().min(1, t("CashAccountsNew:validation.transaction.time.required")),
      minute: z.string().min(1, t("CashAccountsNew:validation.transaction.time.required")),
    }),
    description: z.string().optional(),
    categoryId: z.string({
      required_error: t("CashAccountsNew:validation.transaction.category.required")
    }),
    subcategoryId: z.string().optional(),
  });
};

export type TransactionFormSchema = ReturnType<typeof createTransactionFormSchema>;
export type TransactionFormData = z.infer<TransactionFormSchema>;
