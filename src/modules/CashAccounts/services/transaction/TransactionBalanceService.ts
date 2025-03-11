
import { supabase } from '@/integrations/supabase/client';
import { TransactionType } from '../../types';
import { serviceLogger } from '../../logging';
import { StatementService } from '../statement';

/**
 * İşlem bakiye etki hesaplama servisi
 */
export class TransactionBalanceService {
  private static logger = serviceLogger;

  /**
   * İşlemleri kullanarak ekstre bakiyesini günceller
   */
  static async updateStatementBalance(statementId: string): Promise<void> {
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

  /**
   * Ekstre güncellendikten sonra belirtilen ekstreden sonraki tüm ekstreleri yeniden hesaplar
   */
  static async cascadeBalanceUpdates(accountId: string, startStatementId: string): Promise<void> {
    try {
      this.logger.debug('Starting cascade balance updates', { accountId, startStatementId });
      
      // Belirtilen ekstreden sonraki tüm ekstreleri al (ekstre tarihine göre sıralı)
      const { data: affectedStatements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .gte('start_date', (subquery) => {
          return subquery
            .from('account_statements')
            .select('end_date')
            .eq('id', startStatementId)
            .single();
        })
        .order('start_date', { ascending: true });
      
      if (error) {
        this.logger.error('Failed to fetch affected statements for cascade update', { accountId, startStatementId, error });
        return;
      }
      
      if (!affectedStatements || affectedStatements.length === 0) {
        this.logger.info('No subsequent statements to update', { accountId, startStatementId });
        return;
      }
      
      this.logger.info(`Found ${affectedStatements.length} statements to update in cascade`, { 
        accountId, 
        startStatementId 
      });
      
      // İlk etkilenen ekstre, başlangıç ekstresi ise bunu güncelleme (zaten güncellenmiş olmalı)
      const statementsToUpdate = affectedStatements.filter(stmt => stmt.id !== startStatementId);
      
      // Tüm ekstreleri sırayla güncelleyerek ilerle
      let previousStatement = affectedStatements.find(stmt => stmt.id === startStatementId);
      
      // Başlangıç ekstresini bulamazsak, ilk ekstre olarak listedeki ilk öğeyi kullan
      if (!previousStatement && affectedStatements.length > 0) {
        previousStatement = affectedStatements[0];
        // Bu durumda ilk ekstrenin bakiyesini güncelle
        await this.updateStatementBalance(previousStatement.id);
      }
      
      // Her bir etkilenen ekstre için güncelleme yap
      for (const currentStatement of statementsToUpdate) {
        if (!previousStatement) {
          this.logger.error('Missing previous statement in cascade update', { 
            currentStatementId: currentStatement.id 
          });
          continue;
        }
        
        // Mevcut ekstrenin başlangıç bakiyesini, önceki ekstrenin bitiş bakiyesi olarak ayarla
        await this.updateStatementStartBalance(currentStatement.id, previousStatement.end_balance);
        
        // Mevcut ekstrenin bakiyesini güncelle
        await this.updateStatementBalance(currentStatement.id);
        
        // Sonraki döngü için önceki ekstre olarak mevcut ekstreyi ayarla
        previousStatement = currentStatement;
      }
      
      this.logger.info('Cascade balance update completed successfully', { accountId, startStatementId });
    } catch (error) {
      this.logger.error('Unexpected error during cascade balance update', { accountId, startStatementId, error });
    }
  }

  /**
   * Bir ekstre bakiyesi değiştiğinde, sonraki ekstreye yeni başlangıç bakiyesi atar
   */
  static async updateStatementStartBalance(statementId: string, newStartBalance: number): Promise<void> {
    try {
      this.logger.debug('Updating statement start balance', { statementId, newStartBalance });
      
      // Ekstrenin mevcut bilgilerini al
      const statementResponse = await StatementService.getStatementById(statementId);
      if (!statementResponse.success || !statementResponse.data) {
        this.logger.error('Failed to fetch statement for start balance update', { statementId });
        return;
      }
      
      const statement = statementResponse.data;
      
      // Başlangıç bakiyesi zaten aynıysa, işlemi atla
      if (Number(statement.start_balance) === Number(newStartBalance)) {
        this.logger.debug('Statement start balance already up to date', { statementId, newStartBalance });
        return;
      }
      
      // Başlangıç bakiyesi değişikliği ile bitiş bakiyesini yeniden hesapla
      const endBalanceDiff = Number(newStartBalance) - Number(statement.start_balance);
      const newEndBalance = Number(statement.end_balance) + endBalanceDiff;
      
      // Ekstre bakiyelerini güncelle - ama sadece başlangıç bakiyesi ve bitiş bakiyesini
      // Gelir ve gider tutarları aynı kalacak
      await supabase
        .from('account_statements')
        .update({ 
          start_balance: newStartBalance,
          end_balance: newEndBalance
        })
        .eq('id', statementId);
      
      this.logger.info('Statement start balance updated successfully', { 
        statementId, 
        oldStartBalance: statement.start_balance,
        newStartBalance: newStartBalance,
        oldEndBalance: statement.end_balance,
        newEndBalance: newEndBalance
      });
    } catch (error) {
      this.logger.error('Unexpected error updating statement start balance', { statementId, newStartBalance, error });
    }
  }

  /**
   * Belirli bir tarihten sonraki ekstreleri bulur (cascade yeniden hesaplama için)
   */
  static async findStatementsToUpdate(accountId: string, referenceDate: Date): Promise<string[]> {
    try {
      this.logger.debug('Finding statements to update after date', { accountId, referenceDate });
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('id')
        .eq('account_id', accountId)
        .gte('start_date', referenceDate.toISOString().split('T')[0])
        .order('start_date', { ascending: true });
      
      if (error) {
        this.logger.error('Failed to find statements to update', { accountId, referenceDate, error });
        return [];
      }
      
      return statements?.map(s => s.id) || [];
    } catch (error) {
      this.logger.error('Unexpected error finding statements to update', { accountId, referenceDate, error });
      return [];
    }
  }

  /**
   * İşlem değişikliğinin etkisini değerlendirerek bakiye güncellemelerini tetikler
   * Bu fonksiyon, bir işlem eklendiğinde, güncellendiğinde veya silindiğinde çağrılmalıdır
   */
  static async handleTransactionChange(statementId: string, accountId: string, isClosedStatement: boolean = false): Promise<void> {
    try {
      this.logger.debug('Handling transaction change effect', { statementId, accountId, isClosedStatement });
      
      // Önce mevcut ekstrenin bakiyesini güncelle
      await this.updateStatementBalance(statementId);
      
      // Eğer kapalı bir ekstre ise, sonraki tüm ekstrelerin bakiyelerini güncelle
      if (isClosedStatement) {
        await this.cascadeBalanceUpdates(accountId, statementId);
      }
      
      this.logger.info('Transaction change effect handled successfully', { 
        statementId, 
        accountId, 
        cascadePerformed: isClosedStatement 
      });
    } catch (error) {
      this.logger.error('Failed to handle transaction change effect', { statementId, accountId, error });
    }
  }

  /**
   * Hesabın tüm ekstrelerini sırayla yeniden hesaplar
   */
  static async recalculateAllStatements(accountId: string): Promise<void> {
    try {
      this.logger.debug('Starting complete account statements recalculation', { accountId });
      
      // Hesabın tüm ekstrelerini tarih sırasına göre al
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .order('start_date', { ascending: true });
      
      if (error || !statements || statements.length === 0) {
        this.logger.error('Failed to fetch statements for recalculation', { accountId, error });
        return;
      }
      
      this.logger.info(`Found ${statements.length} statements to recalculate`, { accountId });
      
      // Hesabın başlangıç bakiyesini al
      const { data: account, error: accountError } = await supabase
        .from('cash_accounts')
        .select('initial_balance')
        .eq('id', accountId)
        .single();
      
      if (accountError || !account) {
        this.logger.error('Failed to fetch account for recalculation', { accountId, error: accountError });
        return;
      }
      
      // İlk ekstrenin başlangıç bakiyesini hesabın başlangıç bakiyesi olarak ayarla
      let previousEndBalance = Number(account.initial_balance);
      
      // Her bir ekstre için:
      for (const statement of statements) {
        // 1. Başlangıç bakiyesini, önceki ekstrenin bitiş bakiyesi olarak ayarla
        //    (ilk ekstre için hesabın başlangıç bakiyesi)
        await this.updateStatementStartBalance(statement.id, previousEndBalance);
        
        // 2. Ekstrenin gelir, gider ve bitiş bakiyesini yeniden hesapla
        await this.updateStatementBalance(statement.id);
        
        // 3. Bir sonraki ekstre için bu ekstrenin bitiş bakiyesini not al
        const updatedStatement = await StatementService.getStatementById(statement.id);
        if (updatedStatement.success && updatedStatement.data) {
          previousEndBalance = Number(updatedStatement.data.end_balance);
        }
      }
      
      this.logger.info('Complete account statements recalculation finished', { accountId });
    } catch (error) {
      this.logger.error('Unexpected error during complete recalculation', { accountId, error });
    }
  }
}
