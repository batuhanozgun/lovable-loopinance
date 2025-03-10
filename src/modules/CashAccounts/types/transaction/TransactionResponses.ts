
import { AccountTransaction } from '../../types';

/**
 * Tek bir işlem yanıtı için tip tanımı
 */
export interface SingleTransactionResponse {
  success: boolean;
  data?: AccountTransaction | null;
  error?: string;
}

/**
 * İşlem listesi yanıtı için tip tanımı
 */
export interface TransactionListResponse {
  success: boolean;
  data?: AccountTransaction[];
  error?: string;
}
