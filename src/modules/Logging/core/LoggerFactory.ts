
import { ModuleLogger } from './ModuleLogger';

/**
 * Logger factory singleton sınıfı
 */
export class LoggerFactory {
  private static instance: LoggerFactory;
  private loggers: Map<string, ModuleLogger> = new Map();
  
  private constructor() {}
  
  /**
   * Singleton instance'ı döndürür
   */
  public static getInstance(): LoggerFactory {
    if (!LoggerFactory.instance) {
      LoggerFactory.instance = new LoggerFactory();
    }
    return LoggerFactory.instance;
  }
  
  /**
   * Belirtilen modül için logger oluşturur veya mevcut olanı döndürür
   */
  public getLogger(moduleName: string): ModuleLogger {
    if (!this.loggers.has(moduleName)) {
      this.loggers.set(moduleName, new ModuleLogger(moduleName));
    }
    return this.loggers.get(moduleName)!;
  }
  
  /**
   * Tüm logger'ları sıfırlar
   */
  public resetLoggers(): void {
    this.loggers.clear();
  }
  
  /**
   * Kayıtlı logger sayısını döndürür
   */
  public getLoggersCount(): number {
    return this.loggers.size;
  }
}
