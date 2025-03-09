
import { BaseCategoryService } from './base-category.service';
import { categoryQueryLogger } from '../../logging';
import type { ICategory } from '../../types';

/**
 * Kategori ve alt kategorileri sorgulama işlemleri
 */
export class CategoryQueryService extends BaseCategoryService {
  constructor() {
    super(categoryQueryLogger);
  }

  /**
   * Kullanıcının tüm kategorilerini ve alt kategorilerini getirir
   */
  async getAllCategories(): Promise<ICategory[]> {
    try {
      this.logger.debug('Kullanıcının kategorileri getiriliyor');
      
      // Ana kategorileri getir
      const { data: categories, error: categoryError } = await this.supabaseClient
        .from('categories')
        .select('*')
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (categoryError) {
        return this.handleDbError(categoryError, 'Kategori listesi getirme');
      }
      
      if (!categories) {
        return [];
      }
      
      // Her kategori için alt kategorileri getir
      const result = await Promise.all(
        categories.map(async (category) => {
          const { data: subCategories, error: subCategoryError } = await this.supabaseClient
            .from('sub_categories')
            .select('*')
            .eq('category_id', category.id)
            .eq('is_deleted', false)
            .order('sort_order', { ascending: true });
          
          if (subCategoryError) {
            this.logger.error('Alt kategorileri getirme hatası', subCategoryError, { categoryId: category.id });
            return { ...category, sub_categories: [] };
          }
          
          return { ...category, sub_categories: subCategories || [] };
        })
      );
      
      this.logger.debug('Kategoriler başarıyla getirildi', { count: result.length });
      return result;
    } catch (error) {
      return this.handleDbError(error instanceof Error ? error : new Error('Bilinmeyen hata'), 'Kategori listesi getirme');
    }
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
      const { data: subCategories, error: subCategoryError } = await this.supabaseClient
        .from('sub_categories')
        .select('*')
        .eq('category_id', id)
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        this.logger.error('Alt kategori detayları getirme hatası', subCategoryError, { categoryId: id });
        return { ...category, sub_categories: [] };
      }
      
      return { ...category, sub_categories: subCategories || [] };
    } catch (error) {
      this.logger.error('Kategori detayları getirme işlemi başarısız oldu', error instanceof Error ? error : new Error('Bilinmeyen hata'), { categoryId: id });
      return null;
    }
  }
}
