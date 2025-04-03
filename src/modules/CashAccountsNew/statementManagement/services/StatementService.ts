
/**
 * Ekstre işlemleri için ana servis
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementCreationService } from './core/creation/StatementCreationService';
import { StatementPeriodService } from './core/period/StatementPeriodService';
import { StatementQueryService } from './core/query/StatementQueryService';
import { StatementUpdateService } from './core/update/StatementUpdateService';
import { StatementBalanceCalculationService } from './core/calculation/StatementBalanceCalculationService';
import { StatementCascadeUpdateService } from './core/cascade/StatementCascadeUpdateService';
import { TransactionDeleteService } from './transaction/TransactionDeleteService';
import { CashAccount } from '../../cashAccountHomepage/types';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  SingleStatementResponse, 
  StatementListResponse, 
  StatementStatus 
} from '../types';
import { StatementTransactionResponse } from '../types/transaction';

/**
 * Ekstre yönetim servisi
 * Tüm ekstre işlemlerini organize eder
 */
export class StatementService {
  private static logger = new ModuleLogger('CashAccountsNew.StatementService');

  /**
   * Yeni bir hesap ekstresi oluşturur
   */
  static async createStatement(data: CreateAccountStatementData): Promise<SingleStatementResponse> {
    return await StatementCreationService.createStatement(data);
  }

  /**
   * Belirli bir hesap için yeni bir dönem başlatır (ekstre oluşturur)
   * Önceki dönemin bitiş bakiyesini kullanır
   */
  static async createNextStatement(
    accountId: string,
    startDate: Date,
    endDate: Date,
    previousStatement?: AccountStatement
  ): Promise<SingleStatementResponse> {
    return await StatementCreationService.createNextStatement(
      accountId,
      startDate,
      endDate,
      previousStatement
    );
  }

  /**
   * Bir sonraki dönem için başlangıç ve bitiş tarihlerini hesaplar
   */
  static calculateNextPeriod(
    account: CashAccount,
    currentDate: Date = new Date()
  ): { startDate: Date; endDate: Date } {
    return StatementPeriodService.calculateNextPeriod(account, currentDate);
  }

  /**
   * Belirli bir hesaba ait tüm ekstreleri getirir
   */
  static async getStatementsByAccountId(accountId: string): Promise<StatementListResponse> {
    return await StatementQueryService.getStatementsByAccountId(accountId);
  }

  /**
   * ID'ye göre belirli bir hesap ekstresini getirir
   */
  static async getStatementById(id: string): Promise<SingleStatementResponse> {
    return await StatementQueryService.getStatementById(id);
  }

  /**
   * Belirli bir hesap için mevcut aktif dönem ekstresini getirir
   */
  static async getCurrentStatement(accountId: string): Promise<SingleStatementResponse> {
    return await StatementQueryService.getCurrentStatement(accountId);
  }

  /**
   * Hesap ekstresinin durumunu günceller
   */
  static async updateStatementStatus(id: string, status: StatementStatus): Promise<SingleStatementResponse> {
    return await StatementUpdateService.updateStatementStatus(id, status);
  }

  /**
   * Hesap ekstresinin gelir, gider ve bakiye bilgilerini günceller
   */
  static async updateStatementBalances(
    id: string, 
    income: number, 
    expenses: number,
    endBalance: number
  ): Promise<SingleStatementResponse> {
    return await StatementUpdateService.updateStatementBalances(id, income, expenses, endBalance);
  }

  /**
   * Belirtilen ekstrenin bakiyelerini yeniden hesaplar ve günceller
   * @param cascadeUpdate sonraki ekstreleri de güncelle
   */
  static async recalculateStatementBalance(
    statementId: string,
    accountId: string,
    cascadeUpdate: boolean = true
  ): Promise<SingleStatementResponse> {
    return await StatementBalanceCalculationService.calculateAndUpdateStatementBalance(
      statementId,
      accountId,
      cascadeUpdate
    );
  }

  /**
   * Belirtilen ekstreden sonraki tüm ekstrelerin bakiyelerini zincirleme olarak günceller
   */
  static async updateSubsequentStatements(
    statementId: string,
    accountId: string
  ): Promise<SingleStatementResponse> {
    return await StatementCascadeUpdateService.updateSubsequentStatements(
      statementId,
      accountId
    );
  }

  /**
   * Belirtilen işlemi siler
   */
  static async deleteTransaction(id: string): Promise<StatementTransactionResponse> {
    return await TransactionDeleteService.deleteTransaction(id);
  }
}
