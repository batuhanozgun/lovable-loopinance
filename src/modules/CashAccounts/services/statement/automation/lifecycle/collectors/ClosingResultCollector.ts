
/**
 * Ekstre kapatma sonuçlarını toplayan ve formatlayan sınıf
 */
import { ILogger } from '@/modules/Logging/interfaces/ILogger';
import { serviceLogger } from '../../../../../logging';
import { AccountStatementProcessResult, BatchStatementProcessResult } from '../../../shared/types';

export class ClosingResultCollector {
  private logger: ILogger;
  private results: AccountStatementProcessResult[] = [];

  constructor(logger: ILogger = serviceLogger) {
    this.logger = logger;
  }

  /**
   * Sonuç ekler
   */
  addResult(result: AccountStatementProcessResult): void {
    this.results.push(result);
  }

  /**
   * Birden fazla sonuç ekler
   */
  addResults(results: AccountStatementProcessResult[]): void {
    this.results = [...this.results, ...results];
  }

  /**
   * Tüm sonuçları temizler
   */
  clear(): void {
    this.results = [];
  }

  /**
   * Toplu işlem sonucunu hazırlar
   */
  prepareBatchResult(totalProcessed: number): BatchStatementProcessResult {
    const successCount = this.results.filter(r => r.success).length;
    const errorCount = this.results.length - successCount;
    
    this.logger.info('Dönem sonu gelmiş ekstrelerin kapatılma işlemi tamamlandı', { 
      totalProcessed,
      successCount,
      errorCount
    });
    
    return {
      success: true,
      message: `${totalProcessed} ekstre için işlem yapıldı, ${successCount} işlem başarılı`,
      totalAccounts: totalProcessed,
      successCount,
      errorCount,
      details: this.results
    };
  }

  /**
   * Hata sonucu hazırlar
   */
  prepareErrorResult(error: unknown): BatchStatementProcessResult {
    this.logger.error('Ekstreleri kapatma işlemi sırasında beklenmeyen hata', { error });
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Bilinmeyen hata'
    };
  }
}
