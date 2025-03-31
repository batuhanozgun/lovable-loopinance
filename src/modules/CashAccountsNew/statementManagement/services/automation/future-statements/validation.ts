
/**
 * Gelecek ekstre oluşturma servisi için doğrulama işlemleri
 */
import { AccountFutureStatementStatus } from '../../../types';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';

const logger = new ModuleLogger('CashAccountsNew.FutureStatementValidation');

/**
 * AccountFutureStatementStatus tipinin geçerli olup olmadığını kontrol eder
 */
export function isValidFutureStatus(data: unknown): data is AccountFutureStatementStatus {
  if (!data || typeof data !== 'object') return false;
  
  const status = data as Partial<AccountFutureStatementStatus>;
  return (
    typeof status.account_id === 'string' &&
    typeof status.open_count === 'number' &&
    typeof status.future_count === 'number' &&
    typeof status.required_future_count === 'number' &&
    typeof status.needs_future_statements === 'boolean' &&
    typeof status.future_statements_to_create === 'number'
  );
}
