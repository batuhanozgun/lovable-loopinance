
import { z } from 'zod';
import { CurrencyType, ClosingDayType } from '../../../shared/types';

// Nakit hesap formu validasyon şeması
export const cashAccountSchema = z.object({
  name: z.string()
    .min(1, { message: 'validation:accountForm.name.required' })
    .max(100, { message: 'validation:accountForm.name.maxLength' }),
  initialBalance: z.object({
    whole: z.string(),
    decimal: z.string()
  }),
  currency: z.nativeEnum(CurrencyType, {
    errorMap: () => ({ message: 'validation:accountForm.currency.required' })
  }),
  description: z.string()
    .max(250, { message: 'validation:accountForm.description.maxLength' })
    .optional(),
  closingDayType: z.nativeEnum(ClosingDayType, {
    errorMap: () => ({ message: 'validation:accountForm.closingDayType.required' })
  }),
  closingDayValue: z.number()
    .min(1, { message: 'validation:accountForm.closingDayValue.range' })
    .max(28, { message: 'validation:accountForm.closingDayValue.range' })
    .optional()
    .nullable()
});

export type CashAccountFormSchema = z.infer<typeof cashAccountSchema>;
