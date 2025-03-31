
/**
 * Ekstre işlemleri için ana servis
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { StatementCreationService } from './core/creation/StatementCreationService';
import { StatementPeriodService } from './core/period/StatementPeriodService';
import { StatementQueryService } from './core/query/StatementQueryService';
import { StatementUpdateService } from './core/update/StatementUpdateService';
import { StatementChainUpdateService } from './core/update/StatementChainUpdateService';
import { CashAccount } from '../../cashAccountHomepage/types';
import { 
  AccountStatement, 
  CreateAccountStatementData, 
  SingleStatementResponse, 
  StatementListResponse, 
  StatementStatus 
} from '../types';

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
   * Bir ekstreden başlayarak tüm sonraki ekstreleri günceller
   * @param accountId Hesap ID
   * @param startStatementId Başlangıç ekstre ID'si
   * @param balanceChange Bakiye değişim miktarı (+ gelir, - gider)
   */
  static async updateStatementChain(
    accountId: string,
    startStatementId: string,
    balanceChange: number
  ): Promise<boolean> {
    return await StatementChainUpdateService.updateStatementChain(
      accountId,
      startStatementId,
      balanceChange
    );
  }
}
