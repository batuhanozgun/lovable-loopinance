
import { supabase } from '@/integrations/supabase/client';
import { categoriesLogger } from '../logging';
import type { 
  ICategory, 
  ISubCategory,
  ICreateCategoryData,
  IUpdateCategoryData,
  ICreateSubCategoryData,
  IUpdateSubCategoryData
} from '../types';

/**
 * Kategori servis sınıfı
 * Kategorilerle ilgili tüm CRUD işlemlerini yönetir
 */
export class CategoryService {
  /**
   * Kullanıcının tüm kategorilerini ve alt kategorilerini getirir
   */
  static async getAllCategories(): Promise<ICategory[]> {
    try {
      categoriesLogger.debug('Kullanıcının kategorileri getiriliyor');
      
      // Ana kategorileri getir
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (categoryError) {
        categoriesLogger.error('Kategorileri getirme hatası', categoryError);
        throw categoryError;
      }
      
      // Her kategori için alt kategorileri getir
      const result = await Promise.all(
        categories.map(async (category) => {
          const { data: subCategories, error: subCategoryError } = await supabase
            .from('sub_categories')
            .select('*')
            .eq('category_id', category.id)
            .eq('is_deleted', false)
            .order('sort_order', { ascending: true });
          
          if (subCategoryError) {
            categoriesLogger.error('Alt kategorileri getirme hatası', subCategoryError, { categoryId: category.id });
            return { ...category, sub_categories: [] };
          }
          
          return { ...category, sub_categories: subCategories };
        })
      );
      
      categoriesLogger.debug('Kategoriler başarıyla getirildi', { count: result.length });
      return result;
    } catch (error) {
      categoriesLogger.error('Kategori getirme işlemi başarısız oldu', error);
      throw error;
    }
  }
  
  /**
   * Belirli bir kategoriyi detaylarıyla getirir
   */
  static async getCategoryById(id: string): Promise<ICategory | null> {
    try {
      categoriesLogger.debug('Kategori detayları getiriliyor', { categoryId: id });
      
      // Kategoriyi getir
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .eq('is_deleted', false)
        .single();
      
      if (categoryError) {
        categoriesLogger.error('Kategori detayları getirme hatası', categoryError, { categoryId: id });
        return null;
      }
      
      // Alt kategorileri getir
      const { data: subCategories, error: subCategoryError } = await supabase
        .from('sub_categories')
        .select('*')
        .eq('category_id', id)
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        categoriesLogger.error('Alt kategori detayları getirme hatası', subCategoryError, { categoryId: id });
        return { ...category, sub_categories: [] };
      }
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      categoriesLogger.error('Kategori detayları getirme işlemi başarısız oldu', error, { categoryId: id });
      throw error;
    }
  }
  
  /**
   * Yeni bir kategori oluşturur
   */
  static async createCategory(data: ICreateCategoryData): Promise<ICategory> {
    try {
      categoriesLogger.debug('Yeni kategori oluşturuluyor', { categoryData: data });
      
      const { data: category, error } = await supabase
        .from('categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        categoriesLogger.error('Kategori oluşturma hatası', error, { categoryData: data });
        throw error;
      }
      
      categoriesLogger.debug('Kategori başarıyla oluşturuldu', { categoryId: category.id });
      return { ...category, sub_categories: [] };
    } catch (error) {
      categoriesLogger.error('Kategori oluşturma işlemi başarısız oldu', error);
      throw error;
    }
  }
  
  /**
   * Bir kategoriyi günceller
   */
  static async updateCategory(id: string, data: IUpdateCategoryData): Promise<ICategory> {
    try {
      categoriesLogger.debug('Kategori güncelleniyor', { categoryId: id, updateData: data });
      
      const { data: category, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        categoriesLogger.error('Kategori güncelleme hatası', error, { categoryId: id, updateData: data });
        throw error;
      }
      
      categoriesLogger.debug('Kategori başarıyla güncellendi', { categoryId: id });
      
      // Güncellenmiş kategori için alt kategorileri getir
      const { data: subCategories, error: subCategoryError } = await supabase
        .from('sub_categories')
        .select('*')
        .eq('category_id', id)
        .eq('is_deleted', false)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        categoriesLogger.error('Alt kategori detayları getirme hatası', subCategoryError, { categoryId: id });
        return { ...category, sub_categories: [] };
      }
      
      return { ...category, sub_categories: subCategories };
    } catch (error) {
      categoriesLogger.error('Kategori güncelleme işlemi başarısız oldu', error, { categoryId: id });
      throw error;
    }
  }
  
  /**
   * Bir kategoriyi siler (soft delete)
   */
  static async deleteCategory(id: string): Promise<void> {
    try {
      categoriesLogger.debug('Kategori siliniyor', { categoryId: id });
      
      // Alt kategorileri soft-delete yapalım
      const { error: subCategoryError } = await supabase
        .from('sub_categories')
        .update({ is_deleted: true })
        .eq('category_id', id);
      
      if (subCategoryError) {
        categoriesLogger.error('Alt kategori silme hatası', subCategoryError, { categoryId: id });
        throw subCategoryError;
      }
      
      // Kategoriyi soft-delete yapalım
      const { error } = await supabase
        .from('categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        categoriesLogger.error('Kategori silme hatası', error, { categoryId: id });
        throw error;
      }
      
      categoriesLogger.debug('Kategori başarıyla silindi', { categoryId: id });
    } catch (error) {
      categoriesLogger.error('Kategori silme işlemi başarısız oldu', error, { categoryId: id });
      throw error;
    }
  }
  
  /**
   * Yeni bir alt kategori oluşturur
   */
  static async createSubCategory(data: ICreateSubCategoryData): Promise<ISubCategory> {
    try {
      categoriesLogger.debug('Yeni alt kategori oluşturuluyor', { subCategoryData: data });
      
      const { data: subCategory, error } = await supabase
        .from('sub_categories')
        .insert(data)
        .select()
        .single();
      
      if (error) {
        categoriesLogger.error('Alt kategori oluşturma hatası', error, { subCategoryData: data });
        throw error;
      }
      
      categoriesLogger.debug('Alt kategori başarıyla oluşturuldu', { subCategoryId: subCategory.id });
      return subCategory;
    } catch (error) {
      categoriesLogger.error('Alt kategori oluşturma işlemi başarısız oldu', error);
      throw error;
    }
  }
  
  /**
   * Bir alt kategoriyi günceller
   */
  static async updateSubCategory(id: string, data: IUpdateSubCategoryData): Promise<ISubCategory> {
    try {
      categoriesLogger.debug('Alt kategori güncelleniyor', { subCategoryId: id, updateData: data });
      
      const { data: subCategory, error } = await supabase
        .from('sub_categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        categoriesLogger.error('Alt kategori güncelleme hatası', error, { subCategoryId: id, updateData: data });
        throw error;
      }
      
      categoriesLogger.debug('Alt kategori başarıyla güncellendi', { subCategoryId: id });
      return subCategory;
    } catch (error) {
      categoriesLogger.error('Alt kategori güncelleme işlemi başarısız oldu', error, { subCategoryId: id });
      throw error;
    }
  }
  
  /**
   * Bir alt kategoriyi siler (soft delete)
   */
  static async deleteSubCategory(id: string): Promise<void> {
    try {
      categoriesLogger.debug('Alt kategori siliniyor', { subCategoryId: id });
      
      const { error } = await supabase
        .from('sub_categories')
        .update({ is_deleted: true })
        .eq('id', id);
      
      if (error) {
        categoriesLogger.error('Alt kategori silme hatası', error, { subCategoryId: id });
        throw error;
      }
      
      categoriesLogger.debug('Alt kategori başarıyla silindi', { subCategoryId: id });
    } catch (error) {
      categoriesLogger.error('Alt kategori silme işlemi başarısız oldu', error, { subCategoryId: id });
      throw error;
    }
  }
  
  /**
   * Kategori sıralamasını günceller
   */
  static async updateCategoryOrder(categories: { id: string, sort_order: number }[]): Promise<void> {
    try {
      categoriesLogger.debug('Kategori sıralaması güncelleniyor', { categories });
      
      // Batch update için hazırlık
      const updates = categories.map(({ id, sort_order }) => ({
        id,
        sort_order
      }));
      
      // Kategorileri batch olarak güncelle
      const { error } = await supabase
        .from('categories')
        .upsert(updates);
      
      if (error) {
        categoriesLogger.error('Kategori sıralama hatası', error, { categories });
        throw error;
      }
      
      categoriesLogger.debug('Kategori sıralaması başarıyla güncellendi');
    } catch (error) {
      categoriesLogger.error('Kategori sıralama işlemi başarısız oldu', error);
      throw error;
    }
  }
  
  /**
   * Alt kategori sıralamasını günceller
   */
  static async updateSubCategoryOrder(subCategories: { id: string, sort_order: number }[]): Promise<void> {
    try {
      categoriesLogger.debug('Alt kategori sıralaması güncelleniyor', { subCategories });
      
      // Batch update için hazırlık
      const updates = subCategories.map(({ id, sort_order }) => ({
        id,
        sort_order
      }));
      
      // Alt kategorileri batch olarak güncelle
      const { error } = await supabase
        .from('sub_categories')
        .upsert(updates);
      
      if (error) {
        categoriesLogger.error('Alt kategori sıralama hatası', error, { subCategories });
        throw error;
      }
      
      categoriesLogger.debug('Alt kategori sıralaması başarıyla güncellendi');
    } catch (error) {
      categoriesLogger.error('Alt kategori sıralama işlemi başarısız oldu', error);
      throw error;
    }
  }
  
  /**
   * Alt kategorileri başka bir kategoriye taşır
   */
  static async moveSubCategories(sourceId: string, targetId: string, subCategoryIds: string[]): Promise<void> {
    try {
      categoriesLogger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, subCategoryIds });
      
      // Alt kategorileri taşı
      const { error } = await supabase
        .from('sub_categories')
        .update({ category_id: targetId })
        .in('id', subCategoryIds);
      
      if (error) {
        categoriesLogger.error('Alt kategori taşıma hatası', error, { sourceId, targetId, subCategoryIds });
        throw error;
      }
      
      categoriesLogger.debug('Alt kategoriler başarıyla taşındı');
    } catch (error) {
      categoriesLogger.error('Alt kategori taşıma işlemi başarısız oldu', error);
      throw error;
    }
  }
}
