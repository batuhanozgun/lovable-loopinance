
import { BaseCategoryService } from '../base/BaseCategoryService';

/**
 * Kategori silme işlemleri
 */
export class CategoryDeleteService extends BaseCategoryService {
  constructor() {
    super('Management.Delete');
  }

  /**
   * Bir kategoriyi siler (soft delete)
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      this.logger.debug('Kategori siliniyor', { categoryId: id });
      
      // Alt kategorileri soft-delete yapalım
      const { error: subCategoryError } = await this.supabaseClient
        .from('sub_categories')
        .update({ is_deleted: true })
        .eq('category_id', id);
      
      if (subCategoryError) {
        return this.errorHandler.handleDbError(subCategoryError, 'Alt kategori silme', { categoryId: id });
      }
      
      // Kategoriyi soft-delete yapalım
      const { error } = await this.supabaseClient
        .from('categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Kategori silme', { categoryId: id });
      }
      
      this.logger.debug('Kategori başarıyla silindi', { categoryId: id });
    } catch (error) {
      this.errorHandler.handleDbError(error, 'Kategori silme', { categoryId: id });
    }
  }
}
