
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { SupportedLanguage } from '../../types/template';
import { Json } from '@/integrations/supabase/types';
import { getLocalizedName, safeJsonToStringRecord } from '../../utils/languageUtils';

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

  /**
   * İsim alanlarından çoklu dil desteği için belirli dilde isim döndürür
   * Eğer belirtilen dilde bir isim yoksa, varsayılan dil (tr) veya mevcut herhangi bir dil döndürülür
   */
  protected getNameForLanguage(nameObject: Json | null | undefined, language: SupportedLanguage = 'tr'): string {
    // Json tipini Record<string, string> tipine dönüştür
    const nameRecord = safeJsonToStringRecord(nameObject);
    
    // Yardımcı fonksiyonu kullan
    return getLocalizedName(nameRecord, language, '');
  }
}

export default BaseCategoryTemplateService;
