
import { supabase } from '@/integrations/supabase/client';
import { categoryServiceLogger } from '../../logging';

/**
 * Temel kategori servis yapılandırması
 * Kategori ve alt kategori işlemleri için ortak yapıları içerir
 */
export class BaseCategoryService {
  protected supabaseClient = supabase;
  protected logger = categoryServiceLogger;
  
  /**
   * Kayıt bulunamadı durumunu kontrol eden yardımcı metod
   */
  protected handleNotFound(data: any | null, entityType: string, id: string): any {
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
  protected handleDbError(error: any, operation: string, details?: Record<string, any>): never {
    this.logger.error(`Veritabanı hatası: ${operation} başarısız oldu`, error, details);
    throw error;
  }
}
