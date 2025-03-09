
import { BaseCategoryService } from './base-category.service';
import { categoryMutationLogger } from '../../logging';

/**
 * Kategori sıralama ve organizasyon işlemleri
 */
export class CategoryOrganizationService extends BaseCategoryService {
  constructor() {
    super();
    this.logger = categoryMutationLogger.createSubLogger('Organization');
  }

  /**
   * Kategori sıralamasını günceller
   */
  async updateCategoryOrder(categories: { id: string, sort_order: number }[]): Promise<void> {
    try {
      this.logger.debug('Kategori sıralaması güncelleniyor', { categories });
      
      // Batch update için hazırlık
      const updates = categories.map(({ id, sort_order }) => ({
        id,
        sort_order
      }));
      
      // Kategorileri batch olarak güncelle
      const { error } = await this.supabaseClient
        .from('categories')
        .upsert(updates);
      
      if (error) {
        return this.handleDbError(error, 'Kategori sıralama', { categories });
      }
      
      this.logger.debug('Kategori sıralaması başarıyla güncellendi');
    } catch (error) {
      this.handleDbError(error, 'Kategori sıralama');
    }
  }
  
  /**
   * Alt kategori sıralamasını günceller
   */
  async updateSubCategoryOrder(subCategories: { id: string, sort_order: number }[]): Promise<void> {
    try {
      this.logger.debug('Alt kategori sıralaması güncelleniyor', { subCategories });
      
      // Batch update için hazırlık
      const updates = subCategories.map(({ id, sort_order }) => ({
        id,
        sort_order
      }));
      
      // Alt kategorileri batch olarak güncelle
      const { error } = await this.supabaseClient
        .from('sub_categories')
        .upsert(updates);
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori sıralama', { subCategories });
      }
      
      this.logger.debug('Alt kategori sıralaması başarıyla güncellendi');
    } catch (error) {
      this.handleDbError(error, 'Alt kategori sıralama');
    }
  }
  
  /**
   * Alt kategorileri başka bir kategoriye taşır
   */
  async moveSubCategories(sourceId: string, targetId: string, subCategoryIds: string[]): Promise<void> {
    try {
      this.logger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, subCategoryIds });
      
      // Alt kategorileri taşı
      const { error } = await this.supabaseClient
        .from('sub_categories')
        .update({ category_id: targetId })
        .in('id', subCategoryIds);
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori taşıma', { sourceId, targetId, subCategoryIds });
      }
      
      this.logger.debug('Alt kategoriler başarıyla taşındı');
    } catch (error) {
      this.handleDbError(error, 'Alt kategori taşıma');
    }
  }
}
