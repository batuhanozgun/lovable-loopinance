
import { z } from "zod";
import { TransactionType } from "../../../types";

/**
 * İşlem formu doğrulama şeması oluşturma fonksiyonu
 * @param t Çeviri fonksiyonu
 * @returns Zod validasyon şeması
 */
export const createTransactionFormSchema = (t: (key: string) => string) => {
  return z.object({
    amount: z.string()
      .min(1, {
        message: t("CashAccounts:validation.transaction.amount.required"),
      })
      .refine((val) => {
        // Sayı formatını kontrol et (noktalar ve virgüller olabilir)
        const cleaned = val.replace(/\./g, '').replace(',', '.');
        const num = parseFloat(cleaned);
        return !isNaN(num) && num > 0;
      }, {
        message: t("CashAccounts:validation.transaction.amount.min"),
      }),
    description: z.string().optional(),
    transactionType: z.enum([TransactionType.INCOME, TransactionType.EXPENSE], {
      required_error: t("CashAccounts:validation.transaction.type.required"),
    }),
    categoryId: z.string().optional(),
    subcategoryId: z.string().optional(),
  });
};

/**
 * İşlem formu doğrulama şeması tipi
 */
export type TransactionFormSchema = ReturnType<typeof createTransactionFormSchema>;

/**
 * İşlem formu veri tipi
 */
export type TransactionFormData = z.infer<TransactionFormSchema>;
