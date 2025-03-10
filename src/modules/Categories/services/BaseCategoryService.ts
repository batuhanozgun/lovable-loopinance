
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { PostgrestError } from '@supabase/supabase-js';

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
   * Alt kategorileri getir
   */
  protected async getSubCategories(categoryId: string) {
    try {
      const { data: subCategories, error } = await this.supabaseClient
        .from('sub_categories')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });

      if (error) {
        this.logger.error('Alt kategorileri getirme hatası', error, { categoryId });
        return [];
      }

      return subCategories || [];
    } catch (error) {
      this.logger.error('Alt kategorileri getirme hatası', error instanceof Error ? error : new Error('Bilinmeyen hata'), { categoryId });
      return [];
    }
  }
  
  /**
   * Veritabanı hatasını işleyip uygun şekilde loglayan yardımcı metod
   */
  protected handleDbError(error: PostgrestError | Error | unknown, operation: string, additionalData?: Record<string, any>): never {
    let errorMessage: string;
    let errorObject: Error;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorObject = error;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String((error as { message: unknown }).message);
      errorObject = new Error(errorMessage);
    } else {
      errorMessage = 'Bilinmeyen hata';
      errorObject = new Error(errorMessage);
    }

    this.logger.error(`${operation} sırasında hata oluştu`, errorObject, additionalData);
    throw new Error(`${operation} sırasında hata: ${errorMessage}`);
  }

  /**
   * Yakalanan hataları standart hale getirme
   */
  protected normalizeError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(typeof error === 'string' ? error : 'Bilinmeyen hata');
  }
}

// default export yerine named export kullanıyoruz
export default BaseCategoryService;
