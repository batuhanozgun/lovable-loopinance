
import { BaseCategoryService } from '../base/BaseCategoryService';
import type { 
  ISubCategory,
  ICreateSubCategoryData,
  IUpdateSubCategoryData
} from '../../types';

/**
 * Alt kategori oluşturma ve güncelleme işlemleri
 */
export class SubcategoryWriteService extends BaseCategoryService {
  constructor() {
    super('Subcategory.Write');
  }

  /**
   * Yeni bir alt kategori oluşturur
   */
  async createSubCategory(data: ICreateSubCategoryData): Promise<ISubCategory> {
    try {
      this.logger.debug('Yeni alt kategori oluşturuluyor', { subCategoryData: data });
      
      if (!this.validator.validateSubCategoryData(data)) {
        throw new Error('Geçersiz alt kategori verisi');
      }
      
      const { data: subCategory, error } = await this.supabaseClient
        .from('sub_categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Alt kategori oluşturma', { subCategoryData: data });
      }
      
      this.logger.debug('Alt kategori başarıyla oluşturuldu', { subCategoryId: subCategory.id });
      return subCategory;
    } catch (error) {
      return this.errorHandler.handleDbError(this.errorHandler.normalizeError(error), 'Alt kategori oluşturma');
    }
  }
  
  /**
   * Bir alt kategoriyi günceller
   */
  async updateSubCategory(id: string, data: IUpdateSubCategoryData): Promise<ISubCategory> {
    try {
      this.logger.debug('Alt kategori güncelleniyor', { subCategoryId: id, updateData: data });
      
      if (data.name && data.name.trim() === '') {
        throw new Error('Alt kategori adı boş olamaz');
      }
      
      const { data: subCategory, error } = await this.supabaseClient
        .from('sub_categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return this.errorHandler.handleDbError(error, 'Alt kategori güncelleme', { subCategoryId: id, updateData: data });
      }
      
      this.logger.debug('Alt kategori başarıyla güncellendi', { subCategoryId: id });
      return subCategory;
    } catch (error) {
      return this.errorHandler.handleDbError(this.errorHandler.normalizeError(error), 'Alt kategori güncelleme', { subCategoryId: id });
    }
  }
}
