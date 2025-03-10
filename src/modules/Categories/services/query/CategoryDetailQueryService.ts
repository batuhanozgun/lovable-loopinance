
import { BaseCategoryService } from '../base/BaseCategoryService';
import type { ICategory } from '../../types';

/**
 * Kategori detayları sorgulama işlemleri
 */
export class CategoryDetailQueryService extends BaseCategoryService {
  constructor() {
    super('Query.Detail');
  }

  /**
   * Belirli bir kategoriyi detaylarıyla getirir
   */
  async getCategoryById(id: string): Promise<ICategory | null> {
    try {
      this.logger.debug('Kategori detayları getiriliyor', { categoryId: id });
      
      // Kategoriyi getir
      const { data: category, error: categoryError } = await this.supabaseClient
        .from('categories')
        .select('*')
        .eq('id', id)
        .eq('is_deleted', false)
        .single();
      
      if (categoryError) {
        if (categoryError.code === 'PGRST116') {
          this.logger.warn('Kategori bulunamadı', { categoryId: id });
          return null;
        }
        this.logger.error('Kategori detayları getirme hatası', categoryError, { categoryId: id });
        return null;
      }
      
      // Alt kategorileri getir
      const subCategories = await this.queryUtils.getSubCategories(id);
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      this.logger.error('Kategori detayları getirme işlemi başarısız oldu', 
        this.errorHandler.normalizeError(error), 
        { categoryId: id }
      );
      return null;
    }
  }
}
