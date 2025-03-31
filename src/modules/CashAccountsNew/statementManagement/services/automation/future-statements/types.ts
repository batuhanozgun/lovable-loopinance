
/**
 * Gelecek ekstre oluşturma servisi için tip tanımlamaları
 */
import { AccountFutureStatementStatus } from '../../../types';

/**
 * Gelecek ekstre oluşturma sonucu
 */
export interface FutureStatementResult {
  success: boolean;
  createdCount: number;
  error?: string;
}
