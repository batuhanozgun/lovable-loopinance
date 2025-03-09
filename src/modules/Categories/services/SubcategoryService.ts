import { BaseCategoryService } from './BaseCategoryService';
import { serviceLogger } from '../logging';
import type { 
  ISubCategory,
  ICreateSubCategoryData,
  IUpdateSubCategoryData
} from '../types';

/**
 * Alt kategori işlemleri servisi
 */
export class SubcategoryService extends BaseCategoryService {
  constructor() {
    super('Categories.Subcategory');
  }

  /**
   * Yeni bir alt kategori oluşturur
   */
  async createSubCategory(data: ICreateSubCategoryData): Promise<ISubCategory> {
    try {
      serviceLogger.debug('Yeni alt kategori oluşturuluyor', { subCategoryData: data });
      
      const { data: subCategory, error } = await this.supabaseClient
        .from('sub_categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori oluşturma', { subCategoryData: data });
      }
      
      serviceLogger.debug('Alt kategori başarıyla oluşturuldu', { subCategoryId: subCategory.id });
      return subCategory;
    } catch (error) {
      return this.handleDbError(error instanceof Error ? error : new Error('Bilinmeyen hata'), 'Alt kategori oluşturma');
    }
  }
  
  /**
   * Bir alt kategoriyi günceller
   */
  async updateSubCategory(id: string, data: IUpdateSubCategoryData): Promise<ISubCategory> {
    try {
      serviceLogger.debug('Alt kategori güncelleniyor', { subCategoryId: id, updateData: data });
      
      const { data: subCategory, error } = await this.supabaseClient
        .from('sub_categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori güncelleme', { subCategoryId: id, updateData: data });
      }
      
      serviceLogger.debug('Alt kategori başarıyla güncellendi', { subCategoryId: id });
      return subCategory;
    } catch (error) {
      return this.handleDbError(error instanceof Error ? error : new Error('Bilinmeyen hata'), 'Alt kategori güncelleme', { subCategoryId: id });
    }
  }
  
  /**
   * Bir alt kategoriyi siler (soft delete)
   */
  async deleteSubCategory(id: string): Promise<void> {
    try {
      serviceLogger.debug('Alt kategori siliniyor', { subCategoryId: id });
      
      const { error } = await this.supabaseClient
        .from('sub_categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori silme', { subCategoryId: id });
      }
      
      serviceLogger.debug('Alt kategori başarıyla silindi', { subCategoryId: id });
    } catch (error) {
      this.handleDbError(error instanceof Error ? error : new Error('Bilinmeyen hata'), 'Alt kategori silme', { subCategoryId: id });
    }
  }
}
