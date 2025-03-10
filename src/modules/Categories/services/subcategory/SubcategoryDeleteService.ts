
import { BaseCategoryService } from '../base/BaseCategoryService';

/**
 * Alt kategori silme işlemleri
 */
export class SubcategoryDeleteService extends BaseCategoryService {
  constructor() {
    super('Subcategory.Delete');
  }
  
  /**
   * Bir alt kategoriyi siler (soft delete)
   */
  async deleteSubCategory(id: string): Promise<void> {
    try {
      this.logger.debug('Alt kategori siliniyor', { subCategoryId: id });
      
      const { error } = await this.supabaseClient
        .from('sub_categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Alt kategori silme', { subCategoryId: id });
      }
      
      this.logger.debug('Alt kategori başarıyla silindi', { subCategoryId: id });
    } catch (error) {
      this.errorHandler.handleDbError(this.errorHandler.normalizeError(error), 'Alt kategori silme', { subCategoryId: id });
    }
  }
}
