
/**
 * Statement servislerinde kullanılan ortak tipler
 */
import { AccountStatement, CashAccount, StatementStatus } from '../../../types';

/**
 * Dönem hesaplama sonucu
 */
export interface PeriodCalculationResult {
  startDate: Date;
  endDate: Date;
}

/**
 * Ekstre kontrol sonucu
 */
export interface StatementCheckResult {
  success: boolean;
  message: string;
  statementId?: string;
  isNew?: boolean;
}

/**
 * Hesap ekstresi işlemi sonucu
 */
export interface AccountStatementProcessResult {
  accountId: string;
  accountName?: string;
  action?: string;
  success: boolean;
  message: string;
  statementId?: string;
  newStatementId?: string;
  existingStatementId?: string;
}

/**
 * Çoklu ekstre işlem sonucu
 */
export interface BatchStatementProcessResult {
  success: boolean;
  message: string;
  totalAccounts?: number;
  successCount?: number;
  errorCount?: number;
  details?: AccountStatementProcessResult[];
}

/**
 * Tekil ekstre cevap tipi
 */
export interface SingleStatementResponse {
  success: boolean;
  data?: AccountStatement | null;
  error?: string;
}

/**
 * Ekstre listesi cevap tipi
 */
export interface StatementListResponse {
  success: boolean;
  data?: AccountStatement[];
  error?: string;
}
