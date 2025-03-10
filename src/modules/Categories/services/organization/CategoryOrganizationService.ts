
import { BaseCategoryService } from '../base/BaseCategoryService';
import { ICategoryOrder, ISubCategoryOrder, ICategoryMoveOperation } from '../../types';

/**
 * Kategori ve alt kategorilerin organizasyonunu yöneten servis
 */
export class CategoryOrganizationService extends BaseCategoryService {
  constructor() {
    super('Organization');
  }

  /**
   * Kategorilerin sıralama bilgisini günceller
   */
  async reorderCategories(categoryOrders: ICategoryOrder[]): Promise<{success: boolean; error?: string}> {
    try {
      this.logger.debug('reorderCategories işlemi başlatılıyor', { count: categoryOrders.length });
      
      // Supabase ile uyumlu olması için transaction içinde her bir kategori güncellenir
      const promises = categoryOrders.map(order => {
        return this.supabaseClient
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
        this.logger.error(errorMessage);
        return { 
          success: false,
          error: errorMessage
        };
      }
      
      this.logger.info('Kategori sıralaması başarıyla güncellendi', { 
        count: categoryOrders.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      this.logger.error('Kategori sıralaması güncellenirken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Alt kategorilerin sıralama bilgisini günceller
   */
  async reorderSubCategories(subCategoryOrders: ISubCategoryOrder[]): Promise<{success: boolean; error?: string}> {
    try {
      this.logger.debug('reorderSubCategories işlemi başlatılıyor', { 
        count: subCategoryOrders.length 
      });
      
      // Supabase ile uyumlu olması için transaction içinde her bir alt kategori güncellenir
      const promises = subCategoryOrders.map(order => {
        return this.supabaseClient
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
        this.logger.error(errorMessage);
        return { 
          success: false,
          error: errorMessage
        };
      }
      
      this.logger.info('Alt kategori sıralaması başarıyla güncellendi', { 
        count: subCategoryOrders.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      this.logger.error('Alt kategori sıralaması güncellenirken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Alt kategorileri bir kategoriden diğerine taşır
   */
  async moveSubCategoriesToCategory(
    sourceId: string,
    targetId: string,
    subCategoryIds: string[]
  ): Promise<{success: boolean; error?: string}> {
    try {
      this.logger.debug('moveSubCategoriesToCategory işlemi başlatılıyor', { 
        sourceId, 
        targetId, 
        subCategoryIds 
      });
      
      const { error } = await this.supabaseClient
        .from('sub_categories')
        .update({ category_id: targetId })
        .in('id', subCategoryIds);
      
      if (error) {
        this.logger.error('Alt kategoriler taşınırken hata oluştu', { error });
        return {
          success: false,
          error: error.message
        };
      }
      
      this.logger.info('Alt kategoriler başarıyla taşındı', { 
        sourceId, 
        targetId, 
        count: subCategoryIds.length 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      this.logger.error('Alt kategoriler taşınırken hata oluştu', { error });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
