
import { supabase } from "@/integrations/supabase/client";
import { createLogger } from "@/modules/Logging";
import { ICategoryOrder, ISubCategoryOrder } from "../types";

const logger = createLogger('Categories.Organization');

/**
 * Kategori ve alt kategorilerin organizasyonunu yöneten servis
 */
export class CategoryOrganizationService {
  /**
   * Kategorilerin sıralama bilgisini günceller
   */
  static async updateCategoryOrder(categoryOrders: ICategoryOrder[]): Promise<{success: boolean; error?: string}> {
    try {
      logger.debug('updateCategoryOrder işlemi başlatılıyor', { count: categoryOrders.length });
      
      // Supabase ile uyumlu olması için transaction içinde her bir kategori güncellenir
      const promises = categoryOrders.map(order => {
        return supabase
          .from('categories')
          .update({ sort_order: order.sort_order })
          .eq('id', order.id);
      });
      
      const results = await Promise.all(promises);
      
      // Hata kontrolü
      const errors = results
        .filter(result => result.error)
        .map(result => result.error?.message);
      
      if (errors.length > 0) {
        const errorMessage = `Kategori sıralaması güncellenirken hatalar oluştu: ${errors.join(', ')}`;
        logger.error(errorMessage);
        return { 
          success: false,
          error: errorMessage
        };
      }
      
      logger.info('Kategori sıralaması başarıyla güncellendi', { 
        count: categoryOrders.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      logger.error('Kategori sıralaması güncellenirken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Alt kategorilerin sıralama bilgisini günceller
   */
  static async updateSubCategoryOrder(subCategoryOrders: ISubCategoryOrder[]): Promise<{success: boolean; error?: string}> {
    try {
      logger.debug('updateSubCategoryOrder işlemi başlatılıyor', { 
        count: subCategoryOrders.length 
      });
      
      // Supabase ile uyumlu olması için transaction içinde her bir alt kategori güncellenir
      const promises = subCategoryOrders.map(order => {
        return supabase
          .from('sub_categories')
          .update({ sort_order: order.sort_order })
          .eq('id', order.id);
      });
      
      const results = await Promise.all(promises);
      
      // Hata kontrolü
      const errors = results
        .filter(result => result.error)
        .map(result => result.error?.message);
      
      if (errors.length > 0) {
        const errorMessage = `Alt kategori sıralaması güncellenirken hatalar oluştu: ${errors.join(', ')}`;
        logger.error(errorMessage);
        return { 
          success: false,
          error: errorMessage
        };
      }
      
      logger.info('Alt kategori sıralaması başarıyla güncellendi', { 
        count: subCategoryOrders.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      logger.error('Alt kategori sıralaması güncellenirken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Alt kategorileri bir kategoriden diğerine taşır
   */
  static async moveSubCategoriesToCategory(
    sourceId: string,
    targetId: string,
    subCategoryIds: string[]
  ): Promise<{success: boolean; error?: string}> {
    try {
      logger.debug('moveSubCategoriesToCategory işlemi başlatılıyor', { 
        sourceId, 
        targetId, 
        subCategoryIds 
      });
      
      const { error } = await supabase
        .from('sub_categories')
        .update({ category_id: targetId })
        .in('id', subCategoryIds);
      
      if (error) {
        logger.error('Alt kategoriler taşınırken hata oluştu', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      logger.info('Alt kategoriler başarıyla taşındı', { 
        sourceId, 
        targetId, 
        count: subCategoryIds.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      logger.error('Alt kategoriler taşınırken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
