
import { CurrencyType } from "../../../types";
import { TransactionFormData } from "../validation/schema";

/**
 * İşlem formu bileşeni için prop tipleri
 */
export interface TransactionFormProps {
  statementId: string;
  accountId: string;
  currency: CurrencyType;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Tarih alanı için prop tipleri
 */
export interface DateFieldProps {
  date: Date;
  setDate: (date: Date) => void;
}

/**
 * İşlem türü alanı için prop tipleri
 */
export interface TransactionTypeFieldProps {
  control: any;
}

/**
 * Tutar alanı için prop tipleri
 */
export interface AmountFieldProps {
  control: any;
}

/**
 * Açıklama alanı için prop tipleri
 */
export interface DescriptionFieldProps {
  control: any;
}

/**
 * Form işlemleri için prop tipleri
 */
export interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}
