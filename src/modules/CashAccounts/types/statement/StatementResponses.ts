
import { AccountStatement } from '../../types';

/**
 * Tek bir ekstre yanıtı için tip tanımı
 */
export interface SingleStatementResponse {
  success: boolean;
  data?: AccountStatement | null;
  error?: string;
}

/**
 * Ekstre listesi yanıtı için tip tanımı
 */
export interface StatementListResponse {
  success: boolean;
  data?: AccountStatement[];
  error?: string;
}
