
/**
 * Gelecek ekstre oluşturma servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount } from '../../../cashAccountHomepage/types';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  SingleStatementResponse, 
  StatementStatus,
  AccountFutureStatementStatus
} from '../../types';
import { StatementCreationService } from '../core/creation/StatementCreationService';
import { StatementPeriodService } from '../core/period/StatementPeriodService';
import { format, addMonths } from 'date-fns';

/**
 * Gelecek dönem ekstre oluşturma servisi
 */
export class FutureStatementService {
  private static logger = new ModuleLogger('CashAccountsNew.FutureStatementService');
  private static REQUIRED_FUTURE_STATEMENTS = 11;

  /**
   * Hesap için gelecek ekstreleri oluşturur
   * @param accountId Hesap ID'si
   * @param currentStatement Mevcut ekstre (ekstre yoksa hesabın ilk ekstresidir)
   */
  static async createFutureStatements(
    accountId: string,
    currentStatement: AccountStatement
  ): Promise<{ success: boolean; createdCount: number; error?: string }> {
    try {
      this.logger.debug('Hesap için gelecek ekstreleri oluşturuluyor', {
        accountId,
        currentStatementId: currentStatement.id
      });
      
      // Hesap bilgilerini al
      const { data: account, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('id', accountId)
        .single();
      
      if (error) {
        this.logger.error('Hesap bilgisi alınamadı', { accountId, error });
        return {
          success: false,
          createdCount: 0,
          error: error.message
        };
      }
      
      const cashAccount = account as CashAccount;
      
      // Mevcut ekstreden başlayarak gelecek ekstreleri oluştur
      let lastStatement = currentStatement;
      let createdCount = 0;
      
      for (let i = 0; i < this.REQUIRED_FUTURE_STATEMENTS; i++) {
        // Bir sonraki dönemin tarihlerini hesapla 
        const lastEndDate = new Date(lastStatement.end_date);
        const nextStartDate = new Date(lastEndDate);
        nextStartDate.setDate(nextStartDate.getDate() + 1);
        
        // Bir sonraki ay için dönem hesapla
        const nextMonthDate = addMonths(nextStartDate, 1);
        const nextPeriod = StatementPeriodService.calculateNextPeriod(cashAccount, nextMonthDate);
        
        // Gelecek ekstreyi oluştur
        const newStatementData: CreateAccountStatementData = {
          account_id: accountId,
          start_date: format(nextPeriod.startDate, 'yyyy-MM-dd'),
          end_date: format(nextPeriod.endDate, 'yyyy-MM-dd'),
          start_balance: lastStatement.end_balance,
          end_balance: lastStatement.end_balance,
          status: StatementStatus.FUTURE
        };
        
        // Ekstreyi veritabanına kaydet
        const result = await StatementCreationService.createStatement(newStatementData);
        
        if (!result.success) {
          this.logger.error('Gelecek ekstre oluşturulurken hata', { 
            accountId, 
            error: result.error,
            iteration: i 
          });
          continue;
        }
        
        // Başarılı ise son ekstre olarak ata
        lastStatement = result.data!;
        createdCount++;
        
        this.logger.debug('Gelecek ekstre oluşturuldu', { 
          accountId, 
          statementId: result.data!.id,
          period: `${result.data!.start_date} - ${result.data!.end_date}`
        });
      }
      
      this.logger.info('Gelecek ekstre oluşturma tamamlandı', { 
        accountId, 
        createdCount,
        expectedCount: this.REQUIRED_FUTURE_STATEMENTS
      });
      
      return {
        success: true,
        createdCount
      };
    } catch (error) {
      this.logger.error('Gelecek ekstre oluşturulurken beklenmeyen hata', { accountId, error });
      return {
        success: false,
        createdCount: 0,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }

  /**
   * Eksik gelecek ekstreleri kontrol eder ve gerekirse oluşturur
   */
  static async checkAndCreateMissingFutureStatements(
    accountId: string
  ): Promise<{ success: boolean; createdCount: number; error?: string }> {
    try {
      // Hesabın future statement durumunu kontrol et
      const { data, error } = await supabase.rpc('check_account_future_statements', {
        p_account_id: accountId
      });
      
      if (error) {
        this.logger.error('Future statement durumu kontrol edilirken hata', { accountId, error });
        return {
          success: false,
          createdCount: 0,
          error: error.message
        };
      }
      
      // Future statement ihtiyacı yoksa işlem yapma
      const futureStatus = data as AccountFutureStatementStatus;
      if (!futureStatus.needs_future_statements) {
        return {
          success: true,
          createdCount: 0
        };
      }
      
      // Mevcut açık ekstreyi bul
      const { data: statements, error: statementsError } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.OPEN)
        .order('end_date', { ascending: false })
        .limit(1);
      
      if (statementsError || !statements || statements.length === 0) {
        this.logger.error('Mevcut açık ekstre bulunamadı', { accountId, error: statementsError });
        return {
          success: false,
          createdCount: 0,
          error: statementsError?.message || 'Mevcut açık ekstre bulunamadı'
        };
      }
      
      // Son oluşturulan gelecek ekstreleri bul
      const { data: futureStatements, error: futureError } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .eq('status', StatementStatus.FUTURE)
        .order('end_date', { ascending: false })
        .limit(1);
      
      // Ekstre oluşturmaya başlamak için referans ekstreyi belirle
      let referenceStatement: AccountStatement;
      
      if (futureError || !futureStatements || futureStatements.length === 0) {
        // Gelecek ekstre yoksa, açık ekstreden başla
        referenceStatement = statements[0] as AccountStatement;
      } else {
        // Varsa, son gelecek ekstreden devam et
        referenceStatement = futureStatements[0] as AccountStatement;
      }
      
      // Gerekli sayıda gelecek ekstre oluştur
      return await this.createRemainingFutureStatements(
        accountId, 
        referenceStatement, 
        futureStatus.future_statements_to_create
      );
    } catch (error) {
      this.logger.error('Eksik gelecek ekstreleri kontrol edilirken beklenmeyen hata', { accountId, error });
      return {
        success: false,
        createdCount: 0,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }

  /**
   * Kalan gelecek ekstreleri oluşturur
   */
  private static async createRemainingFutureStatements(
    accountId: string,
    referenceStatement: AccountStatement,
    countToCreate: number
  ): Promise<{ success: boolean; createdCount: number; error?: string }> {
    try {
      // Hesap bilgilerini al
      const { data: account, error } = await supabase
        .from('cash_accounts')
        .select('*')
        .eq('id', accountId)
        .single();
      
      if (error) {
        this.logger.error('Hesap bilgisi alınamadı', { accountId, error });
        return {
          success: false,
          createdCount: 0,
          error: error.message
        };
      }
      
      const cashAccount = account as CashAccount;
      
      // Referans ekstreden başlayarak gelecek ekstreleri oluştur
      let lastStatement = referenceStatement;
      let createdCount = 0;
      
      for (let i = 0; i < countToCreate; i++) {
        // Bir sonraki dönemin tarihlerini hesapla 
        const lastEndDate = new Date(lastStatement.end_date);
        const nextStartDate = new Date(lastEndDate);
        nextStartDate.setDate(nextStartDate.getDate() + 1);
        
        // Bir sonraki ay için dönem hesapla
        const nextMonthDate = addMonths(nextStartDate, 1);
        const nextPeriod = StatementPeriodService.calculateNextPeriod(cashAccount, nextMonthDate);
        
        // Gelecek ekstreyi oluştur
        const newStatementData: CreateAccountStatementData = {
          account_id: accountId,
          start_date: format(nextPeriod.startDate, 'yyyy-MM-dd'),
          end_date: format(nextPeriod.endDate, 'yyyy-MM-dd'),
          start_balance: lastStatement.end_balance,
          end_balance: lastStatement.end_balance,
          status: StatementStatus.FUTURE
        };
        
        // Ekstreyi veritabanına kaydet
        const result = await StatementCreationService.createStatement(newStatementData);
        
        if (!result.success) {
          this.logger.error('Kalan gelecek ekstre oluşturulurken hata', { 
            accountId, 
            error: result.error,
            iteration: i 
          });
          continue;
        }
        
        // Başarılı ise son ekstre olarak ata
        lastStatement = result.data!;
        createdCount++;
        
        this.logger.debug('Kalan gelecek ekstre oluşturuldu', { 
          accountId, 
          statementId: result.data!.id,
          period: `${result.data!.start_date} - ${result.data!.end_date}`
        });
      }
      
      this.logger.info('Kalan gelecek ekstre oluşturma tamamlandı', { 
        accountId, 
        createdCount,
        requestedCount: countToCreate
      });
      
      return {
        success: true,
        createdCount
      };
    } catch (error) {
      this.logger.error('Kalan gelecek ekstre oluşturulurken beklenmeyen hata', { accountId, error });
      return {
        success: false,
        createdCount: 0,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
