
import { BaseCategoryService } from './BaseCategoryService';
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
      this.logger.debug('Yeni alt kategori oluşturuluyor', { subCategoryData: data });
      
      if (!this.validateSubCategoryData(data)) {
        throw new Error('Geçersiz alt kategori verisi');
      }
      
      const { data: subCategory, error } = await this.supabaseClient
        .from('sub_categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        return this.handleDbError(error, 'Alt kategori oluşturma', { subCategoryData: data });
      }
      
      this.logger.debug('Alt kategori başarıyla oluşturuldu', { subCategoryId: subCategory.id });
      return subCategory;
    } catch (error) {
      return this.handleDbError(this.normalizeError(error), 'Alt kategori oluşturma');
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
        return this.handleDbError(error, 'Alt kategori güncelleme', { subCategoryId: id, updateData: data });
      }
      
      this.logger.debug('Alt kategori başarıyla güncellendi', { subCategoryId: id });
      return subCategory;
    } catch (error) {
      return this.handleDbError(this.normalizeError(error), 'Alt kategori güncelleme', { subCategoryId: id });
    }
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
        return this.handleDbError(error, 'Alt kategori silme', { subCategoryId: id });
      }
      
      this.logger.debug('Alt kategori başarıyla silindi', { subCategoryId: id });
    } catch (error) {
      this.handleDbError(this.normalizeError(error), 'Alt kategori silme', { subCategoryId: id });
    }
  }
  
  /**
   * Belirli bir kategoriye ait tüm alt kategorileri getirir
   */
  async getSubCategoriesByCategoryId(categoryId: string): Promise<ISubCategory[]> {
    try {
      this.logger.debug('Kategoriye ait alt kategoriler getiriliyor', { categoryId });
      
      const subCategories = await this.getSubCategories(categoryId);
      
      this.logger.debug('Alt kategoriler başarıyla getirildi', { 
        categoryId, 
        count: subCategories.length 
      });
      
      return subCategories;
    } catch (error) {
      this.logger.error('Alt kategorileri getirme hatası', 
        this.normalizeError(error), 
        { categoryId }
      );
      return [];
    }
  }
}
