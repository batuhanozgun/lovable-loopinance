
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';

/**
 * Kategori şablonları için temel servis sınıfı
 * Diğer şablon servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryTemplateService {
  protected logger: ModuleLogger;
  protected supabaseClient = supabase;
  
  constructor(moduleName: string) {
    this.logger = createLogger(moduleName);
  }
  
  /**
   * Veritabanı hatasını işleyip uygun şekilde loglayan yardımcı metod
   */
  protected handleDbError(error: any, operation: string, additionalData?: Record<string, any>): never {
    this.logger.error(`${operation} sırasında hata oluştu`, error, additionalData);
    throw new Error(`${operation} sırasında hata: ${error.message || 'Bilinmeyen hata'}`);
  }
}

export default BaseCategoryTemplateService;
