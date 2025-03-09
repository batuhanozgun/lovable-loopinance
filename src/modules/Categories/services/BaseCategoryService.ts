
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';

/**
 * Kategoriler için temel servis sınıfı
 * Diğer kategori servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryService {
  protected logger: ModuleLogger;
  protected supabaseClient = supabase;
  
  constructor(moduleName: string) {
    this.logger = createLogger(moduleName);
  }
  
  /**
   * Kategori verisini doğrula
   */
  validateCategoryData(data: any): boolean {
    return !!data && typeof data.name === 'string' && data.name.trim().length > 0;
  }
  
  /**
   * Alt kategori verisini doğrula
   */
  validateSubCategoryData(data: any): boolean {
    return !!data && 
      typeof data.name === 'string' && 
      data.name.trim().length > 0 &&
      typeof data.category_id === 'string';
  }
  
  /**
   * Veritabanı hatasını işleyip uygun şekilde loglayan yardımcı metod
   */
  protected handleDbError(error: any, operation: string, additionalData?: Record<string, any>): never {
    this.logger.error(`${operation} sırasında hata oluştu`, error, additionalData);
    throw new Error(`${operation} sırasında hata: ${error.message || 'Bilinmeyen hata'}`);
  }
}

// default export yerine named export kullanıyoruz
export default BaseCategoryService;
