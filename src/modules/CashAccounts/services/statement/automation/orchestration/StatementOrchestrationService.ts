
/**
 * Ekstre işlemlerini orkestrasyon servisi
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../logging';
import { CashAccount } from '../../../../types';
import { StatementStatusManagerService } from '../lifecycle/StatementStatusManagerService';
import { StatementClosingService } from '../lifecycle/StatementClosingService';
import { AccountStatementCheckService } from '../checking/AccountStatementCheckService';
import { SingleAccountStatementService } from '../checking/SingleAccountStatementService';

export class StatementOrchestrationService {
  private logger: ILogger;
  private statusManagerService: StatementStatusManagerService;
  private closingService: StatementClosingService;
  private accountCheckService: AccountStatementCheckService;
  private singleAccountService: SingleAccountStatementService;

  constructor(
    logger: ILogger = serviceLogger,
    statusManagerService?: StatementStatusManagerService,
    closingService?: StatementClosingService,
    accountCheckService?: AccountStatementCheckService,
    singleAccountService?: SingleAccountStatementService
  ) {
    this.logger = logger;
    this.statusManagerService = statusManagerService || new StatementStatusManagerService(logger);
    this.closingService = closingService || new StatementClosingService(logger);
    this.accountCheckService = accountCheckService || new AccountStatementCheckService(logger);
    this.singleAccountService = singleAccountService || new SingleAccountStatementService(logger);
  }

  /**
   * Tüm aktif hesaplar için dönem kontrol ve ekstre yaratma işlemini başlatır
   */
  async checkAndCreateStatementsForAllAccounts() {
    return await this.accountCheckService.checkAndCreateStatementsForAllAccounts();
  }

  /**
   * Belirli bir hesap için dönem kontrolü ve ekstre yaratma işlemini başlatır
   */
  async checkAndCreateStatementForAccount(account: CashAccount) {
    return await this.singleAccountService.checkAndCreateStatementForAccount(account);
  }

  /**
   * Dönem sonu gelmiş ekstreleri kapat ve yeni dönem için ekstre oluştur
   */
  async closeExpiredStatementsAndCreateNew() {
    return await this.closingService.closeExpiredStatementsAndCreateNew();
  }

  /**
   * FUTURE statüsündeki ekstreleri kontrol eder ve tarihi gelenler için OPEN statüsüne geçirir
   */
  async updateFutureStatementsStatus() {
    return await this.statusManagerService.updateFutureStatements();
  }
}
