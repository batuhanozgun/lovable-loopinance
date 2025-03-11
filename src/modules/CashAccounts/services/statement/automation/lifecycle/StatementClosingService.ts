
/**
 * Ekstre kapatma ve yeni dönem başlatma servisi
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { BatchStatementProcessResult } from '../../shared/types';
import { SingleAccountStatementService } from '../checking/SingleAccountStatementService';
import { ExpiredStatementFinder } from './finders/ExpiredStatementFinder';
import { StatementClosingProcessor } from './processors/StatementClosingProcessor';
import { NextPeriodProcessor } from './processors/NextPeriodProcessor';
import { ClosingResultCollector } from './collectors/ClosingResultCollector';
import { StatementPeriodCheckService } from '../checking/StatementPeriodCheckService';
import { StatementUpdateService } from '../../core/update/StatementUpdateService';
import { StatementPeriodService } from '../../core/period/StatementPeriodService';
import { StatementCreationService } from '../../core/creation/StatementCreationService';
import { StatementStatusManagerService } from './StatementStatusManagerService';

export class StatementClosingService {
  private logger: ILogger;
  private expiredStatementFinder: ExpiredStatementFinder;
  private statementClosingProcessor: StatementClosingProcessor;
  private nextPeriodProcessor: NextPeriodProcessor;
  private resultCollector: ClosingResultCollector;
  private singleAccountService: SingleAccountStatementService;

  constructor(
    logger: ILogger = serviceLogger,
    updateService: typeof StatementUpdateService = StatementUpdateService,
    periodService: typeof StatementPeriodService = StatementPeriodService,
    creationService: typeof StatementCreationService = StatementCreationService,
    expiredStatementFinder?: ExpiredStatementFinder,
    statementClosingProcessor?: StatementClosingProcessor,
    periodCheckService?: StatementPeriodCheckService,
    statusManagerService?: StatementStatusManagerService,
    nextPeriodProcessor?: NextPeriodProcessor,
    resultCollector?: ClosingResultCollector,
    singleAccountService?: SingleAccountStatementService
  ) {
    this.logger = logger;
    
    // Alt servisleri oluştur veya enjekte edilenleri kullan
    const periodCheckSvc = periodCheckService || new StatementPeriodCheckService(logger, periodService);
    const statusManagerSvc = statusManagerService || new StatementStatusManagerService(logger, updateService);
    
    this.expiredStatementFinder = expiredStatementFinder || new ExpiredStatementFinder(logger);
    this.statementClosingProcessor = statementClosingProcessor || new StatementClosingProcessor(logger, updateService);
    this.nextPeriodProcessor = nextPeriodProcessor || new NextPeriodProcessor(
      logger, 
      periodCheckSvc, 
      creationService, 
      statusManagerSvc
    );
    this.resultCollector = resultCollector || new ClosingResultCollector(logger);
    this.singleAccountService = singleAccountService || new SingleAccountStatementService(
      logger, 
      periodService, 
      creationService, 
      updateService,
      periodCheckSvc,
      statusManagerSvc
    );
  }

  /**
   * Dönem sonu gelmiş ekstreleri kapat ve yeni dönem için ekstre oluştur
   */
  async closeExpiredStatementsAndCreateNew() {
    try {
      this.logger.debug('Dönem sonu gelmiş ekstreleri kapatma işlemi başlatıldı');
      
      // Bugünün tarihini al
      const today = new Date();
      
      // Bitiş tarihi geçmiş açık ekstreleri bul
      const expiredStatements = await this.expiredStatementFinder.findExpiredStatements(today);
      
      if (!expiredStatements) {
        return { 
          success: false, 
          message: 'Süresi geçmiş ekstreleri bulurken hata oluştu' 
        };
      }
      
      if (expiredStatements.length === 0) {
        return { 
          success: true, 
          message: 'Kapatılacak süresi geçmiş ekstre bulunamadı' 
        };
      }
      
      // Sonuç koleksiyoncuyu temizle
      this.resultCollector.clear();
      
      // Her bir süresi geçmiş ekstre için
      for (const statement of expiredStatements) {
        try {
          // Ekstre durumunu kapat
          const closeResult = await this.statementClosingProcessor.closeStatement(statement);
          this.resultCollector.addResult(closeResult);
          
          // Başarılı kapatılamadıysa sonraki işlemleri yapma
          if (!closeResult.success) {
            continue;
          }
          
          // Yeni dönem için ekstre oluştur
          const account = statement.cash_accounts;
          if (!account) {
            this.logger.error('Ekstre için hesap bilgisi bulunamadı', { 
              statementId: statement.id, 
              accountId: statement.account_id 
            });
            
            this.resultCollector.addResult({
              statementId: statement.id,
              accountId: statement.account_id,
              action: 'create_new',
              success: false,
              message: 'Ekstre için hesap bilgisi bulunamadı'
            });
            
            continue;
          }
          
          // Bir sonraki ay için ekstre oluştur
          const nextPeriodResult = await this.nextPeriodProcessor.processNextPeriod(account, statement, today);
          this.resultCollector.addResult(nextPeriodResult);
          
          // Hesap için mevcut dönem ekstresini kontrol et
          const createResult = await this.singleAccountService.checkAndCreateStatementForAccount(account);
          
          this.resultCollector.addResult({
            accountId: account.id,
            action: 'create_new',
            success: createResult.success,
            message: createResult.message,
            newStatementId: createResult.statementId
          });
        } catch (statementError) {
          this.logger.error('Ekstre işlemleri sırasında hata', { 
            statementId: statement.id, 
            error: statementError 
          });
          
          this.resultCollector.addResult({
            statementId: statement.id,
            accountId: statement.account_id,
            success: false,
            message: statementError instanceof Error ? statementError.message : 'Bilinmeyen hata'
          });
        }
      }
      
      // İşlem sonuçlarını toplu olarak döndür
      return this.resultCollector.prepareBatchResult(expiredStatements.length * 2); // Kapatma ve yeni oluşturma
    } catch (error) {
      return this.resultCollector.prepareErrorResult(error);
    }
  }
}
