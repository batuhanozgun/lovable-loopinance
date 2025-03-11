
import { CurrencyType } from "../../../types";
import { TransactionFormData } from "../validation/schema";
import { AccountTransaction } from "../../../types";

/**
 * İşlem formu bileşeni için prop tipleri
 */
export interface TransactionFormProps {
  statementId: string;
  accountId: string;
  currency: CurrencyType;
  isOpen: boolean;
  onClose: () => void;
  transaction?: AccountTransaction;
}

/**
 * Tarih alanı için prop tipleri
 */
export interface DateFieldProps {
  date: Date;
  setDate: (date: Date) => void;
  time: { hour: string; minute: string };
  setTime: (time: { hour: string; minute: string }) => void;
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
  currency: CurrencyType;
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
  isEditMode?: boolean;
}

/**
 * Kategori alanı için prop tipleri
 */
export interface CategoryFieldProps {
  control: any;
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

/**
 * Alt kategori alanı için prop tipleri
 */
export interface SubcategoryFieldProps {
  control: any;
  selectedCategoryId: string;
}

/**
 * Zaman tipi
 */
export interface TimeInput {
  hour: string;
  minute: string;
}
