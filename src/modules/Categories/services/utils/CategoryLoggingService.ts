
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { createLogger } from '@/modules/Logging';

/**
 * Kategori servisleri için merkezi loglama servisi
 */
export class CategoryLoggingService {
  /**
   * Verilen isimde bir logger oluşturur
   */
  public createLogger(moduleName: string): ModuleLogger {
    return createLogger(`Categories.${moduleName}`);
  }
}

// Singleton instance
export const categoryLogger = new CategoryLoggingService();
