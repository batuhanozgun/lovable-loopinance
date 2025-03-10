
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { categoryLogger } from './CategoryLoggingService';
import type { ISubCategory } from '../../types';

/**
 * Kategori sorguları için yardımcı fonksiyonlar
 */
export class CategoryQueryUtils {
  private logger: ModuleLogger;
  protected supabaseClient = supabase;
  
  constructor() {
    this.logger = categoryLogger.createLogger('QueryUtils');
  }
  
  /**
   * Alt kategorileri getir
   */
  public async getSubCategories(categoryId: string): Promise<ISubCategory[]> {
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
      this.logger.error('Alt kategorileri getirme hatası', 
        error instanceof Error ? error : new Error('Bilinmeyen hata'), 
        { categoryId }
      );
      return [];
    }
  }
}

// Singleton instance
export const categoryQueryUtils = new CategoryQueryUtils();
