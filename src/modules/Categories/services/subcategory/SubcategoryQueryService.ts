
import { BaseCategoryService } from '../base/BaseCategoryService';
import type { ISubCategory } from '../../types';

/**
 * Alt kategori sorgulama işlemleri
 */
export class SubcategoryQueryService extends BaseCategoryService {
  constructor() {
    super('Subcategory.Query');
  }
  
  /**
   * Belirli bir kategoriye ait tüm alt kategorileri getirir
   */
  async getSubCategoriesByCategoryId(categoryId: string): Promise<ISubCategory[]> {
    try {
      this.logger.debug('Kategoriye ait alt kategoriler getiriliyor', { categoryId });
      
      const subCategories = await this.queryUtils.getSubCategories(categoryId);
      
      this.logger.debug('Alt kategoriler başarıyla getirildi', { 
        categoryId, 
        count: subCategories.length 
      });
      
      return subCategories;
    } catch (error) {
      this.logger.error('Alt kategorileri getirme hatası', 
        this.errorHandler.normalizeError(error), 
        { categoryId }
      );
      return [];
    }
  }
}
