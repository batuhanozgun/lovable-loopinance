
import { supabase } from '@/integrations/supabase/client';
import { 
  AccountTransaction, 
  AccountTransactionResponse,
  CreateAccountTransactionData,
  TransactionType
} from '../types';
import { serviceLogger } from '../logging';
import { StatementService } from './StatementService';

/**
 * Hesap işlemlerini yönetmek için servis
 */
export class TransactionService {
  private static logger = serviceLogger;

  /**
   * Yeni bir hesap işlemi oluşturur
   */
  static async createTransaction(data: CreateAccountTransactionData): Promise<AccountTransactionResponse> {
    try {
      this.logger.debug('Creating new account transaction', { data });
      
      const { data: transactionData, error } = await supabase
        .from('account_transactions')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        this.logger.error('Failed to create account transaction', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      // İşlemi ekledikten sonra ilgili ekstrenin bakiyesini güncelleme
      await this.updateStatementBalance(transactionData.statement_id);
      
      this.logger.info('Account transaction created successfully', { id: transactionData.id });
      return {
        success: true,
        data: transactionData as AccountTransaction
      };
    } catch (error) {
      this.logger.error('Unexpected error creating account transaction', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir ekstre için tüm işlemleri getirir
   */
  static async getTransactionsByStatementId(statementId: string): Promise<AccountTransactionResponse> {
    try {
      this.logger.debug('Fetching transactions for statement', { statementId });
      
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('statement_id', statementId)
        .order('transaction_date', { ascending: false })
        .order('transaction_time', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch statement transactions', { statementId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Statement transactions fetched successfully', { statementId, count: transactions.length });
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching statement transactions', { statementId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * ID'ye göre belirli bir işlemi getirir
   */
  static async getTransactionById(id: string): Promise<AccountTransactionResponse> {
    try {
      this.logger.debug('Fetching transaction by ID', { id });
      
      const { data: transaction, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        this.logger.error('Failed to fetch transaction by ID', { id, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Transaction fetched successfully', { id });
      return {
        success: true,
        data: transaction as AccountTransaction
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching transaction by ID', { id, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Belirli bir hesap için tüm işlemleri getirir
   */
  static async getTransactionsByAccountId(accountId: string): Promise<AccountTransactionResponse> {
    try {
      this.logger.debug('Fetching transactions for account', { accountId });
      
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('account_id', accountId)
        .order('transaction_date', { ascending: false })
        .order('transaction_time', { ascending: false });
      
      if (error) {
        this.logger.error('Failed to fetch account transactions', { accountId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Account transactions fetched successfully', { accountId, count: transactions.length });
      return {
        success: true,
        data: transactions as AccountTransaction[]
      };
    } catch (error) {
      this.logger.error('Unexpected error fetching account transactions', { accountId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * İşlemleri kullanarak ekstre bakiyesini günceller
   */
  private static async updateStatementBalance(statementId: string): Promise<void> {
    try {
      this.logger.debug('Updating statement balance', { statementId });
      
      // Ekstre içindeki tüm işlemleri al
      const { data: transactions, error } = await supabase
        .from('account_transactions')
        .select('*')
        .eq('statement_id', statementId);
      
      if (error) {
        this.logger.error('Failed to fetch transactions for balance update', { statementId, error });
        return;
      }
      
      // Ekstrenin detaylarını al
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Failed to fetch statement for balance update', { statementId });
        return;
      }
      
      const statement = statementResponse.data;
      
      // Gelir ve gider toplamlarını hesaplama
      let totalIncome = 0;
      let totalExpenses = 0;
      
      transactions.forEach(transaction => {
        if (transaction.transaction_type === TransactionType.INCOME) {
          totalIncome += Number(transaction.amount);
        } else if (transaction.transaction_type === TransactionType.EXPENSE) {
          totalExpenses += Number(transaction.amount);
        }
      });
      
      // Bitiş bakiyesini hesaplama
      const endBalance = Number(statement.start_balance) + totalIncome - totalExpenses;
      
      // Ekstre bakiyesini güncelleme
      await StatementService.updateStatementBalances(statementId, totalIncome, totalExpenses, endBalance);
      
      this.logger.info('Statement balance updated successfully', { 
        statementId, 
        totalIncome, 
        totalExpenses, 
        endBalance 
      });
    } catch (error) {
      this.logger.error('Unexpected error updating statement balance', { statementId, error });
    }
  }
}
