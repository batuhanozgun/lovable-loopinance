
import { BaseCategoryService } from './BaseCategoryService';
import type { ICategory } from '../types';

/**
 * Kategori ve alt kategorileri sorgulama işlemleri
 */
export class CategoryQueryService extends BaseCategoryService {
  constructor() {
    super('Categories.Query');
  }

  /**
   * Kullanıcının tüm kategorilerini ve alt kategorilerini getirir
   * N+1 sorunu yerine daha verimli bir yaklaşım kullanır
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
      
      if (!categories || categories.length === 0) {
        return [];
      }
      
      // Tüm kategori ID'lerini al
      const categoryIds = categories.map(category => category.id);
      
      // Tek bir sorgu ile ilgili tüm alt kategorileri getir
      const { data: allSubCategories, error: subCategoryError } = await this.supabaseClient
        .from('sub_categories')
        .select('*')
        .in('category_id', categoryIds)
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        this.logger.error('Alt kategorileri getirme hatası', subCategoryError);
        // Alt kategori hatası olsa bile kategorileri gösterebiliriz
        return categories.map(category => ({ ...category, sub_categories: [] }));
      }
      
      // Alt kategorileri ana kategorilere göre gruplandır
      const subCategoriesByParent = (allSubCategories || []).reduce((acc, subCategory) => {
        const categoryId = subCategory.category_id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(subCategory);
        return acc;
      }, {} as Record<string, typeof allSubCategories>);
      
      // Her kategori için alt kategorileri ekle
      const result = categories.map(category => ({
        ...category,
        sub_categories: subCategoriesByParent[category.id] || []
      }));
      
      this.logger.debug('Kategoriler başarıyla getirildi', { 
        categoriesCount: result.length,
        subCategoriesCount: allSubCategories?.length || 0
      });
      
      return result;
    } catch (error) {
      return this.handleDbError(error, 'Kategori listesi getirme');
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
      const subCategories = await this.getSubCategories(id);
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      this.logger.error('Kategori detayları getirme işlemi başarısız oldu', 
        this.normalizeError(error), 
        { categoryId: id }
      );
      return null;
    }
  }
}
