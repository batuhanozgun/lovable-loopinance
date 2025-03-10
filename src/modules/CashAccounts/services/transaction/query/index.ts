
import { AccountTransactionQueries } from './AccountTransactionQueries';
import { StatementTransactionQueries } from './StatementTransactionQueries';
import { SingleTransactionQueries } from './SingleTransactionQueries';

/**
 * Tüm işlem sorgu servisleri için ana erişim noktası
 */
export class TransactionQueryService {
  static getTransactionById = SingleTransactionQueries.getTransactionById;
  static getTransactionsByAccountId = AccountTransactionQueries.getTransactionsByAccountId;
  static getTransactionsByStatementId = StatementTransactionQueries.getTransactionsByStatementId;
}
