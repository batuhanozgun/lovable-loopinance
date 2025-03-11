
import { AccountTransaction, TransactionType } from '../../types';
import { serviceLogger } from '../../logging';
import { TransactionService } from '../transaction';
import { StatementService } from './index';

/**
 * Ekstre bakiye hesaplama işlemleri için servis
 */
export class StatementBalanceService {
  private static logger = serviceLogger;

  /**
   * Ekstre bakiyelerini hesaplar ve günceller
   */
  static async recalculateStatementBalances(statementId: string): Promise<boolean> {
    try {
      this.logger.debug('Recalculating statement balances', { statementId });
      
      // Ekstreyi getir
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Statement not found', { statementId });
        return false;
      }
      
      const statement = statementResponse.data;
      
      // Ekstre işlemlerini getir
      const transactionsResponse = await TransactionService.getTransactionsByStatementId(statementId);
      if (!transactionsResponse.success) {
        this.logger.error('Failed to fetch transactions', { 
          statementId, 
          error: transactionsResponse.error 
        });
        return false;
      }
      
      const transactions = transactionsResponse.data || [];
      
      // Gelir ve giderleri hesapla
      const { income, expenses } = this.calculateTransactionTotals(transactions);
      
      // Bitiş bakiyesini hesapla
      const endBalance = statement.start_balance + income - expenses;
      
      // Ekstre bakiyelerini güncelle
      const updateResponse = await StatementService.updateStatementBalances(
        statementId,
        income,
        expenses,
        endBalance
      );
      
      if (!updateResponse.success) {
        this.logger.error('Failed to update statement balances', { 
          statementId, 
          error: updateResponse.error 
        });
        return false;
      }
      
      this.logger.info('Statement balances updated successfully', { 
        statementId,
        income,
        expenses,
        endBalance 
      });
      return true;
    } catch (error) {
      this.logger.error('Unexpected error recalculating statement balances', { 
        statementId, 
        error 
      });
      return false;
    }
  }

  /**
   * İşlemlerin toplam gelir ve giderlerini hesaplar
   */
  static calculateTransactionTotals(transactions: AccountTransaction[]): { income: number; expenses: number } {
    let income = 0;
    let expenses = 0;
    
    for (const transaction of transactions) {
      const amount = Number(transaction.amount);
      
      if (transaction.transaction_type === TransactionType.INCOME) {
        income += amount;
      } else if (transaction.transaction_type === TransactionType.EXPENSE) {
        expenses += amount;
      }
    }
    
    return { income, expenses };
  }

  /**
   * Belirli bir hesabın mevcut toplam bakiyesini hesaplar
   */
  static async calculateAccountCurrentBalance(accountId: string): Promise<number | null> {
    try {
      this.logger.debug('Calculating account current balance', { accountId });
      
      // Hesaba ait en son ekstreyi getir
      const statementsResponse = await StatementService.getStatementsByAccountId(accountId);
      if (!statementsResponse.success || !statementsResponse.data) {
        this.logger.error('Failed to fetch statements', { 
          accountId, 
          error: statementsResponse.error 
        });
        return null;
      }
      
      const statements = statementsResponse.data;
      if (statements.length === 0) {
        this.logger.warn('No statements found for account', { accountId });
        
        // Hesap başlangıç bakiyesini getir
        const accountResponse = await StatementService.getAccountInitialBalance(accountId);
        if (!accountResponse.success) {
          this.logger.error('Failed to fetch account initial balance', { accountId });
          return null;
        }
        
        return accountResponse.data || 0;
      }
      
      // Ekstreleri tarihe göre sırala (en yenisi ilk)
      statements.sort((a, b) => {
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
      });
      
      // En son ekstre bakiyesini döndür
      return statements[0].end_balance;
    } catch (error) {
      this.logger.error('Unexpected error calculating account current balance', { 
        accountId, 
        error 
      });
      return null;
    }
  }
}
