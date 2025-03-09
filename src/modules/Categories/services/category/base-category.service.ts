
import { supabase } from '@/integrations/supabase/client';
import { categoryServiceLogger } from '../../logging';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Temel kategori servis yapılandırması
 * Kategori ve alt kategori işlemleri için ortak yapıları içerir
 */
export class BaseCategoryService {
  protected supabaseClient = supabase;
  protected logger: ModuleLogger;
  
  constructor(customLogger?: ModuleLogger) {
    this.logger = customLogger || categoryServiceLogger;
  }
  
  /**
   * Kayıt bulunamadı durumunu kontrol eden yardımcı metod
   */
  protected handleNotFound<T>(data: T | null, entityType: string, id: string): T {
    if (!data) {
      const errorMessage = `${entityType} bulunamadı: ${id}`;
      this.logger.warn(errorMessage, { entityType, id });
      throw new Error(errorMessage);
    }
    return data;
  }
  
  /**
   * Veritabanı hataları için standart işleyici
   */
  protected handleDbError(error: Error | PostgrestError, operation: string, details?: Record<string, unknown>): never {
    this.logger.error(`Veritabanı hatası: ${operation} başarısız oldu`, error, details);
    throw error;
  }
}
