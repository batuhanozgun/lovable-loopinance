
/**
 * Tek hesap için ekstre kontrol servisi
 */
import { format, isAfter, startOfDay } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { AccountStatement, CashAccount, StatementStatus } from '../../../../types';
import { PeriodCalculationResult, StatementCheckResult } from '../../shared/types';
import { StatementPeriodService } from '../../core/period/StatementPeriodService';
import { StatementCreationService } from '../../core/creation/StatementCreationService';
import { StatementUpdateService } from '../../core/update/StatementUpdateService';
import { StatementPeriodCheckService } from './StatementPeriodCheckService';
import { StatementStatusManagerService } from '../lifecycle/StatementStatusManagerService';
import { formatDateToString } from '../../shared/utils';

export class SingleAccountStatementService {
  private logger: ILogger;
  private periodService: typeof StatementPeriodService;
  private creationService: typeof StatementCreationService;
  private updateService: typeof StatementUpdateService;
  private periodCheckService: StatementPeriodCheckService;
  private statusManagerService: StatementStatusManagerService;

  constructor(
    logger: ILogger = serviceLogger,
    periodService: typeof StatementPeriodService = StatementPeriodService,
    creationService: typeof StatementCreationService = StatementCreationService,
    updateService: typeof StatementUpdateService = StatementUpdateService,
    periodCheckService?: StatementPeriodCheckService,
    statusManagerService?: StatementStatusManagerService
  ) {
    this.logger = logger;
    this.periodService = periodService;
    this.creationService = creationService;
    this.updateService = updateService;
    this.periodCheckService = periodCheckService || new StatementPeriodCheckService(logger, periodService);
    this.statusManagerService = statusManagerService || new StatementStatusManagerService(logger, updateService);
  }

  /**
   * Bir hesap için dönem kontrolü ve ekstre yaratma
   */
  async checkAndCreateStatementForAccount(account: CashAccount): Promise<StatementCheckResult> {
    try {
      this.logger.debug('Hesap için ekstre kontrol işlemi başlatıldı', { accountId: account.id });
      
      // Mevcut tarihi al
      const now = new Date();
      
      // Hesap için mevcut dönemi hesapla
      const currentPeriod = this.periodService.calculateCurrentPeriod(account, now);
      
      // Mevcut dönem için ekstre var mı kontrol et
      const existingStatements = await this.periodCheckService.checkExistingStatementsForPeriod(
        account.id,
        currentPeriod
      );
      
      if (!existingStatements) {
        return { 
          success: false, 
          message: 'Mevcut ekstreleri kontrol ederken hata oluştu' 
        };
      }
      
      // Eğer mevcut dönem için ekstre yoksa, yeni ekstre oluştur
      if (existingStatements.length === 0) {
        // En son ekstre var mı diye kontrol et
        const lastStatement = await this.periodCheckService.getLastStatement(account.id);
        
        // Ekstre oluştur
        const result = await this.creationService.createNextStatement(
          account.id,
          currentPeriod.startDate,
          currentPeriod.endDate,
          lastStatement || undefined
        );
        
        if (!result.success) {
          this.logger.error('Yeni ekstre oluşturulurken hata', { 
            accountId: account.id, 
            error: result.error 
          });
          return { 
            success: false, 
            message: 'Yeni ekstre oluşturulurken hata: ' + result.error 
          };
        }
        
        // Ekstre başlangıç tarihi ve durumunu güncelle
        await this.statusManagerService.updateStatementStatusBasedOnDate(
          result.data!.id, 
          currentPeriod.startDate, 
          now
        );
        
        // Başlangıç tarihi henüz gelmediyse, gelecek dönem olarak logla
        const isFuturePeriod = isAfter(startOfDay(currentPeriod.startDate), startOfDay(now));
        
        this.logger.info(
          isFuturePeriod 
            ? 'Hesap için gelecek dönem ekstresi oluşturuldu' 
            : 'Hesap için yeni ekstre oluşturuldu', 
          { 
            accountId: account.id, 
            statementId: result.data?.id,
            period: `${formatDateToString(currentPeriod.startDate)} - ${formatDateToString(currentPeriod.endDate)}`,
            status: isFuturePeriod ? StatementStatus.FUTURE : StatementStatus.OPEN
          }
        );
        
        return { 
          success: true, 
          message: 'Yeni ekstre oluşturuldu', 
          statementId: result.data?.id,
          isNew: true
        };
      }
      
      // Mevcut ekstre bulundu, durumunu kontrol et ve gerekiyorsa güncelle
      const existingStatement = existingStatements[0];
      if (existingStatement.status === StatementStatus.FUTURE && 
          !isAfter(startOfDay(currentPeriod.startDate), startOfDay(now))) {
        // Future statüsündeki ekstre dönem başlangıcı geldiyse OPEN statüsüne güncelle
        await this.updateService.updateStatementStatus(
          existingStatement.id, 
          StatementStatus.OPEN
        );
        
        this.logger.info('Hesap için Future statüsündeki ekstre Open statüsüne güncellendi', { 
          accountId: account.id, 
          statementId: existingStatement.id,
          period: `${existingStatement.start_date} - ${existingStatement.end_date}`
        });
      }
      
      this.logger.info('Hesap için mevcut dönemde ekstre bulundu', { 
        accountId: account.id, 
        statementId: existingStatements[0].id,
        period: `${existingStatements[0].start_date} - ${existingStatements[0].end_date}`,
        status: existingStatements[0].status
      });
      
      return { 
        success: true, 
        message: 'Mevcut dönem için ekstre zaten var', 
        statementId: existingStatements[0].id,
        isNew: false
      };
    } catch (error) {
      this.logger.error('Hesap için ekstre kontrolü sırasında beklenmeyen hata', { 
        accountId: account.id, 
        error 
      });
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  }
}
