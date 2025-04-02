
/**
 * Eksik gelecek ekstreleri oluşturma işlemleri
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { CashAccount } from '../../../../cashAccountHomepage/types';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  StatementStatus
} from '../../../types';
import { StatementCreationService } from '../../core/creation/StatementCreationService';
import { StatementPeriodService } from '../../core/period/StatementPeriodService';
import { format, addMonths } from 'date-fns';
import { FutureStatementResult } from './types';

const logger = new ModuleLogger('CashAccountsNew.CreateRemainingStatements');

/**
 * Kalan gelecek ekstreleri oluşturur
 */
export async function createRemainingFutureStatements(
  accountId: string,
  referenceStatement: AccountStatement,
  countToCreate: number
): Promise<FutureStatementResult> {
  try {
    // Hesap bilgilerini al
    const { data: account, error } = await supabase
      .from('cash_accounts')
      .select('*')
      .eq('id', accountId)
      .single();
    
    if (error) {
      logger.error('Hesap bilgisi alınamadı', { accountId, error });
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
    
    // Referans ekstre tarihini başlangıç noktası olarak al
    let referenceDate = new Date(lastStatement.end_date);
    
    for (let i = 0; i < countToCreate; i++) {
      // Her bir ayı bir sonraki aya ilerlet
      referenceDate = addMonths(referenceDate, 1);
      
      // İlgili ayın başlangıç ve bitiş tarihlerini hesapla
      const nextPeriod = StatementPeriodService.calculateNextPeriod(cashAccount, referenceDate);
      
      // Hata ayıklama için dönem bilgilerini logla
      logger.debug('Gelecek ekstre dönem hesaplaması', {
        accountId,
        iteration: i,
        referenceDate: format(referenceDate, 'yyyy-MM-dd'),
        calculatedPeriodStart: format(nextPeriod.startDate, 'yyyy-MM-dd'),
        calculatedPeriodEnd: format(nextPeriod.endDate, 'yyyy-MM-dd'),
        closingDayType: cashAccount.closing_day_type,
        closingDayValue: cashAccount.closing_day_value
      });
      
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
        logger.error('Kalan gelecek ekstre oluşturulurken hata', { 
          accountId, 
          error: result.error,
          iteration: i 
        });
        continue;
      }
      
      // Başarılı ise son ekstre olarak ata
      lastStatement = result.data!;
      createdCount++;
      
      logger.debug('Kalan gelecek ekstre oluşturuldu', { 
        accountId, 
        statementId: result.data!.id,
        period: `${result.data!.start_date} - ${result.data!.end_date}`
      });
    }
    
    logger.info('Kalan gelecek ekstre oluşturma tamamlandı', { 
      accountId, 
      createdCount,
      requestedCount: countToCreate
    });
    
    return {
      success: true,
      createdCount
    };
  } catch (error) {
    logger.error('Kalan gelecek ekstre oluşturulurken beklenmeyen hata', { accountId, error });
    return {
      success: false,
      createdCount: 0,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    };
  }
}
