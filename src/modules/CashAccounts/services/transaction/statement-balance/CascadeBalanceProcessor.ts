
import { supabase } from '@/integrations/supabase/client';
import { serviceLogger } from '../../../logging';
import { StatementBalanceCalculator } from './StatementBalanceCalculator';
import { StatementStartBalanceUpdater } from './StatementStartBalanceUpdater';

/**
 * Cascade bakiye güncelleme servisi
 */
export class CascadeBalanceProcessor {
  private static logger = serviceLogger;

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
        await StatementBalanceCalculator.updateStatementBalance(previousStatement.id);
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
        await StatementStartBalanceUpdater.updateStatementStartBalance(currentStatement.id, previousStatement.end_balance);
        
        // Mevcut ekstrenin bakiyesini güncelle
        await StatementBalanceCalculator.updateStatementBalance(currentStatement.id);
        
        // Sonraki döngü için önceki ekstre olarak mevcut ekstreyi ayarla
        previousStatement = currentStatement;
      }
      
      this.logger.info('Cascade balance update completed successfully', { accountId, startStatementId });
    } catch (error) {
      this.logger.error('Unexpected error during cascade balance update', { accountId, startStatementId, error });
    }
  }
}
