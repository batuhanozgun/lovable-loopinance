
import { BaseCategoryService } from './BaseCategoryService';
import type { 
  ICategory, 
  ICreateCategoryData,
  IUpdateCategoryData
} from '../types';

/**
 * Kategori CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlemleri
 */
export class CategoryManagementService extends BaseCategoryService {
  constructor() {
    super('Categories.Management');
  }

  /**
   * Yeni bir kategori oluşturur
   */
  async createCategory(data: ICreateCategoryData): Promise<ICategory> {
    try {
      this.logger.debug('Yeni kategori oluşturuluyor', { categoryData: data });
      
      if (!this.validateCategoryData(data)) {
        throw new Error('Geçersiz kategori verisi');
      }
      
      const { data: category, error } = await this.supabaseClient
        .from('categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        return this.handleDbError(error, 'Kategori oluşturma', { categoryData: data });
      }
      
      this.logger.debug('Kategori başarıyla oluşturuldu', { categoryId: category.id });
      return { ...category, sub_categories: [] };
    } catch (error) {
      return this.handleDbError(error, 'Kategori oluşturma');
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
        return this.handleDbError(error, 'Kategori güncelleme', { categoryId: id, updateData: data });
      }
      
      this.logger.debug('Kategori başarıyla güncellendi', { categoryId: id });
      
      // Güncellenmiş kategori için alt kategorileri getir
      const subCategories = await this.getSubCategories(id);
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      return this.handleDbError(error, 'Kategori güncelleme', { categoryId: id });
    }
  }
  
  /**
   * Belirli bir kategori detaylarını getirir
   * Bu metod zaten CategoryQueryService'de var, burada duplicate
   * ama refactoring yaparken silmiyoruz, belki diğer kod buna bağlıdır
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
      const subCategories = await this.getSubCategories(id);
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      this.logger.error('Kategori detayları getirme hatası', 
        this.normalizeError(error), 
        { categoryId: id }
      );
      return null;
    }
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
        return this.handleDbError(subCategoryError, 'Alt kategori silme', { categoryId: id });
      }
      
      // Kategoriyi soft-delete yapalım
      const { error } = await this.supabaseClient
        .from('categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        return this.handleDbError(error, 'Kategori silme', { categoryId: id });
      }
      
      this.logger.debug('Kategori başarıyla silindi', { categoryId: id });
    } catch (error) {
      this.handleDbError(error, 'Kategori silme', { categoryId: id });
    }
  }
}
