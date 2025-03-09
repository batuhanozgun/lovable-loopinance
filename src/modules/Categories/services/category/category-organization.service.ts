
import { supabase } from '@/integrations/supabase/client';
import { operationsLogger } from '../../logging';
import { ICategoryOrder, ISubCategoryOrder } from '../../types';

export class CategoryOrganizationService {
  /**
   * Kategori sıralama güncellemesi
   */
  static async updateCategoryOrder(categories: ICategoryOrder[]): Promise<{ success: boolean; error?: string }> {
    try {
      operationsLogger.debug('Kategori sıralama güncellemesi başlatıldı', { count: categories.length });
      
      // Kategorileri sırayla güncelle
      for (const category of categories) {
        const { error } = await supabase
          .from('categories')
          .update({ 
            order: category.order 
          })
          .eq('id', category.id);
        
        if (error) {
          operationsLogger.error('Kategori sıralama güncellemesi başarısız oldu', { 
            error, 
            categoryId: category.id 
          });
          return { 
            success: false, 
            error: error.message 
          };
        }
      }
      
      operationsLogger.info('Kategori sıralama güncellemesi tamamlandı', { count: categories.length });
      return { success: true };
    } catch (error) {
      operationsLogger.error('Kategori sıralama güncellemesi hatası', { error });
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu' 
      };
    }
  }
  
  /**
   * Alt kategori sıralama güncellemesi
   */
  static async updateSubCategoryOrder(subCategories: ISubCategoryOrder[]): Promise<{ success: boolean; error?: string }> {
    try {
      operationsLogger.debug('Alt kategori sıralama güncellemesi başlatıldı', { count: subCategories.length });
      
      // Alt kategorileri sırayla güncelle
      for (const subCategory of subCategories) {
        const { error } = await supabase
          .from('subcategories')
          .update({ 
            order: subCategory.order 
          })
          .eq('id', subCategory.id);
        
        if (error) {
          operationsLogger.error('Alt kategori sıralama güncellemesi başarısız oldu', { 
            error, 
            subCategoryId: subCategory.id 
          });
          return { 
            success: false, 
            error: error.message 
          };
        }
      }
      
      operationsLogger.info('Alt kategori sıralama güncellemesi tamamlandı', { count: subCategories.length });
      return { success: true };
    } catch (error) {
      operationsLogger.error('Alt kategori sıralama güncellemesi hatası', { error });
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu' 
      };
    }
  }
  
  /**
   * Alt kategorileri taşıma
   */
  static async moveSubCategories(
    sourceId: string,
    targetId: string | null
  ): Promise<{ success: boolean; error?: string }> {
    try {
      operationsLogger.debug('Alt kategorileri taşıma işlemi başlatıldı', { 
        sourceId, 
        targetId: targetId || 'null' 
      });
      
      const { error } = await supabase
        .from('subcategories')
        .update({ 
          parent_id: targetId 
        })
        .eq('parent_id', sourceId);
      
      if (error) {
        operationsLogger.error('Alt kategorileri taşıma işlemi başarısız oldu', { 
          error, 
          sourceId, 
          targetId 
        });
        return { 
          success: false, 
          error: error.message 
        };
      }
      
      operationsLogger.info('Alt kategorileri taşıma işlemi tamamlandı', { 
        sourceId, 
        targetId: targetId || 'null' 
      });
      return { success: true };
    } catch (error) {
      operationsLogger.error('Alt kategorileri taşıma işlemi hatası', { error });
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu' 
      };
    }
  }
}
