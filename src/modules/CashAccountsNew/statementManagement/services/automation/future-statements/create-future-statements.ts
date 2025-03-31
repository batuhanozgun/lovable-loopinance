
/**
 * Gelecek ekstre oluşturma işlemleri
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
import { format } from 'date-fns';
import { FutureStatementResult } from './types';

const logger = new ModuleLogger('CashAccountsNew.CreateFutureStatements');

/**
 * Hesap için gelecek ekstreleri oluşturur
 * @param accountId Hesap ID'si
 * @param currentStatement Mevcut ekstre (ekstre yoksa hesabın ilk ekstresidir)
 */
export async function createFutureStatements(
  accountId: string,
  currentStatement: AccountStatement,
  requiredCount: number
): Promise<FutureStatementResult> {
  try {
    logger.debug('Hesap için gelecek ekstreleri oluşturuluyor', {
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
      logger.error('Hesap bilgisi alınamadı', { accountId, error });
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
    
    for (let i = 0; i < requiredCount; i++) {
      // Bir sonraki dönemin tarihlerini hesapla 
      const lastEndDate = new Date(lastStatement.end_date);
      const nextStartDate = new Date(lastEndDate);
      nextStartDate.setDate(nextStartDate.getDate() + 1);
      
      // Bir sonraki dönem için hesapla
      const nextPeriod = StatementPeriodService.calculateNextPeriod(cashAccount, nextStartDate);
      
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
        logger.error('Gelecek ekstre oluşturulurken hata', { 
          accountId, 
          error: result.error,
          iteration: i 
        });
        continue;
      }
      
      // Başarılı ise son ekstre olarak ata
      lastStatement = result.data!;
      createdCount++;
      
      logger.debug('Gelecek ekstre oluşturuldu', { 
        accountId, 
        statementId: result.data!.id,
        period: `${result.data!.start_date} - ${result.data!.end_date}`
      });
    }
    
    logger.info('Gelecek ekstre oluşturma tamamlandı', { 
      accountId, 
      createdCount,
      expectedCount: requiredCount
    });
    
    return {
      success: true,
      createdCount
    };
  } catch (error) {
    logger.error('Gelecek ekstre oluşturulurken beklenmeyen hata', { accountId, error });
    return {
      success: false,
      createdCount: 0,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    };
  }
}
