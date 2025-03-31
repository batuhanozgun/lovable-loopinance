
/**
 * Gelecek ekstre oluşturma servisi
 */
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { AccountStatement } from '../../types';
import { REQUIRED_FUTURE_STATEMENTS } from './future-statements/constants';
import { 
  createFutureStatements,
  createRemainingFutureStatements,
  checkAndCreateMissingFutureStatements,
  FutureStatementResult
} from './future-statements';

/**
 * Gelecek dönem ekstre oluşturma servisi
 */
export class FutureStatementService {
  private static logger = new ModuleLogger('CashAccountsNew.FutureStatementService');

  /**
   * Hesap için gelecek ekstreleri oluşturur
   * @param accountId Hesap ID'si
   * @param currentStatement Mevcut ekstre (ekstre yoksa hesabın ilk ekstresidir)
   */
  static async createFutureStatements(
    accountId: string,
    currentStatement: AccountStatement
  ): Promise<FutureStatementResult> {
    return await createFutureStatements(accountId, currentStatement, REQUIRED_FUTURE_STATEMENTS);
  }

  /**
   * Eksik gelecek ekstreleri kontrol eder ve gerekirse oluşturur
   */
  static async checkAndCreateMissingFutureStatements(
    accountId: string
  ): Promise<FutureStatementResult> {
    return await checkAndCreateMissingFutureStatements(accountId);
  }

  /**
   * Kalan gelecek ekstreleri oluşturur
   */
  private static async createRemainingFutureStatements(
    accountId: string,
    referenceStatement: AccountStatement,
    countToCreate: number
  ): Promise<FutureStatementResult> {
    return await createRemainingFutureStatements(accountId, referenceStatement, countToCreate);
  }
}
