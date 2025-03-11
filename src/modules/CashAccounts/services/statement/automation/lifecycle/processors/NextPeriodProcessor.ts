
/**
 * Sonraki dönem işlemleri için işlemci
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../../logging';
import { AccountStatement, CashAccount, StatementStatus } from '../../../../../types';
import { AccountStatementProcessResult } from '../../../shared/types';
import { StatementPeriodCheckService } from '../../checking/StatementPeriodCheckService';
import { StatementCreationService } from '../../../core/creation/StatementCreationService';
import { StatementStatusManagerService } from '../StatementStatusManagerService';

export class NextPeriodProcessor {
  private logger: ILogger;
  private periodCheckService: StatementPeriodCheckService;
  private creationService: typeof StatementCreationService;
  private statusManagerService: StatementStatusManagerService;

  constructor(
    logger: ILogger = serviceLogger,
    periodCheckService: StatementPeriodCheckService,
    creationService: typeof StatementCreationService = StatementCreationService,
    statusManagerService: StatementStatusManagerService
  ) {
    this.logger = logger;
    this.periodCheckService = periodCheckService;
    this.creationService = creationService;
    this.statusManagerService = statusManagerService;
  }

  /**
   * Sonraki dönem için ekstre oluşturur
   */
  async processNextPeriod(account: CashAccount, statement: AccountStatement, currentDate: Date): Promise<AccountStatementProcessResult> {
    try {
      // Bir sonraki ay için ekstre oluştur
      const nextMonthResult = await this.periodCheckService.checkNextMonthPeriod(account, currentDate);
      
      if (!nextMonthResult.exists && nextMonthResult.period) {
        const createResult = await this.creationService.createNextStatement(
          account.id,
          nextMonthResult.period.startDate,
          nextMonthResult.period.endDate,
          statement as AccountStatement
        );
        
        if (!createResult.success) {
          this.logger.error('Sonraki dönem ekstresi oluşturulurken hata', { 
            accountId: account.id, 
            error: createResult.error 
          });
          
          return {
            accountId: account.id,
            action: 'create_next_period',
            success: false,
            message: 'Sonraki dönem ekstresi oluşturulurken hata: ' + createResult.error
          };
        }
        
        // Future statüsü ata
        await this.statusManagerService.updateStatementStatusBasedOnDate(
          createResult.data!.id, 
          nextMonthResult.period.startDate, 
          currentDate
        );
        
        return {
          accountId: account.id,
          action: 'create_next_period',
          success: true,
          message: 'Sonraki dönem ekstresi oluşturuldu',
          newStatementId: createResult.data?.id
        };
      } else if (nextMonthResult.exists && nextMonthResult.statement) {
        return {
          accountId: account.id,
          action: 'check_next_period',
          success: true,
          message: 'Sonraki dönem ekstresi zaten mevcut',
          existingStatementId: nextMonthResult.statement.id
        };
      }
      
      return {
        accountId: account.id,
        action: 'check_next_period',
        success: true,
        message: 'Sonraki dönem için işlem yapılmadı'
      };
    } catch (error) {
      this.logger.error('Sonraki dönem işlemi sırasında beklenmeyen hata', { 
        accountId: account.id, 
        error 
      });
      
      return {
        accountId: account.id,
        action: 'create_next_period',
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
