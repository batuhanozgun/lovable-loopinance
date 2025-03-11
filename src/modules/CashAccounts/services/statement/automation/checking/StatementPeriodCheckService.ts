
/**
 * Ekstre dönem kontrol servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { AccountStatement, CashAccount } from '../../../../types';
import { PeriodCalculationResult } from '../../shared/types';
import { StatementPeriodService } from '../../core/period/StatementPeriodService';
import { formatDateToString } from '../../shared/utils';

export class StatementPeriodCheckService {
  private logger: ILogger;
  private periodService: typeof StatementPeriodService;

  constructor(
    logger: ILogger = serviceLogger,
    periodService: typeof StatementPeriodService = StatementPeriodService
  ) {
    this.logger = logger;
    this.periodService = periodService;
  }

  /**
   * Belirli bir dönem için ekstre var mı kontrol eder
   */
  async checkExistingStatementsForPeriod(
    accountId: string,
    period: PeriodCalculationResult
  ): Promise<AccountStatement[] | null> {
    try {
      this.logger.debug('Dönem için mevcut ekstre kontrolü', { 
        accountId, 
        period: `${formatDateToString(period.startDate)} - ${formatDateToString(period.endDate)}` 
      });
      
      const { data: statements, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .gte('start_date', formatDateToString(period.startDate))
        .lte('end_date', formatDateToString(period.endDate))
        .order('created_at', { ascending: false });
      
      if (error) {
        this.logger.error('Mevcut ekstreleri kontrol ederken hata', { 
          accountId, 
          error 
        });
        return null;
      }
      
      return statements as AccountStatement[];
    } catch (error) {
      this.logger.error('Dönem ekstre kontrolünde beklenmeyen hata', { 
        accountId, 
        error 
      });
      return null;
    }
  }

  /**
   * Hesabın son ekstresini getirir
   */
  async getLastStatement(accountId: string): Promise<AccountStatement | null> {
    try {
      this.logger.debug('Son ekstre bilgisi getiriliyor', { accountId });
      
      const { data: statement, error } = await supabase
        .from('account_statements')
        .select('*')
        .eq('account_id', accountId)
        .order('end_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        this.logger.error('Son ekstre getirilirken hata', { accountId, error });
        return null;
      }
      
      return statement as AccountStatement;
    } catch (error) {
      this.logger.error('Son ekstre getirilirken beklenmeyen hata', { accountId, error });
      return null;
    }
  }

  /**
   * Belirli bir hesap için sonraki dönem kontrolü
   */
  async checkNextMonthPeriod(
    account: CashAccount,
    currentDate: Date
  ): Promise<{exists: boolean, statement?: AccountStatement, period?: PeriodCalculationResult}> {
    try {
      const nextMonthPeriod = this.periodService.calculateNextMonthPeriod(account, currentDate);
      
      const statements = await this.checkExistingStatementsForPeriod(account.id, nextMonthPeriod);
      
      if (!statements || statements.length === 0) {
        return { exists: false, period: nextMonthPeriod };
      }
      
      return { exists: true, statement: statements[0], period: nextMonthPeriod };
    } catch (error) {
      this.logger.error('Sonraki ay dönemi kontrolünde hata', { accountId: account.id, error });
      return { exists: false };
    }
  }
}
