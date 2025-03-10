
import { BaseCategoryService } from '../base/BaseCategoryService';
import type { 
  ICategory, 
  ICreateCategoryData,
  IUpdateCategoryData
} from '../../types';

/**
 * Kategori oluşturma ve güncelleme işlemleri
 */
export class CategoryWriteService extends BaseCategoryService {
  constructor() {
    super('Management.Write');
  }

  /**
   * Yeni bir kategori oluşturur
   */
  async createCategory(data: ICreateCategoryData): Promise<ICategory> {
    try {
      this.logger.debug('Yeni kategori oluşturuluyor', { categoryData: data });
      
      if (!this.validator.validateCategoryData(data)) {
        throw new Error('Geçersiz kategori verisi');
      }
      
      const { data: category, error } = await this.supabaseClient
        .from('categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Kategori oluşturma', { categoryData: data });
      }
      
      this.logger.debug('Kategori başarıyla oluşturuldu', { categoryId: category.id });
      return { ...category, sub_categories: [] };
    } catch (error) {
      return this.errorHandler.handleDbError(error, 'Kategori oluşturma');
    }
  }
  
  /**
   * Bir kategoriyi günceller
   */
  async updateCategory(id: string, data: IUpdateCategoryData): Promise<ICategory> {
    try {
      this.logger.debug('Kategori güncelleniyor', { categoryId: id, updateData: data });
      
      if (data.name && data.name.trim() === '') {
        throw new Error('Kategori adı boş olamaz');
      }
      
      const { data: category, error } = await this.supabaseClient
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Kategori güncelleme', { categoryId: id, updateData: data });
      }
      
      this.logger.debug('Kategori başarıyla güncellendi', { categoryId: id });
      
      // Güncellenmiş kategori için alt kategorileri getir
      const subCategories = await this.queryUtils.getSubCategories(id);
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      return this.errorHandler.handleDbError(error, 'Kategori güncelleme', { categoryId: id });
    }
  }
}
