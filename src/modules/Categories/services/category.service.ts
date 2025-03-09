
import { apiLogger } from '../logging';
import type { 
  ICategory, 
  ICreateCategoryData, 
  ICreateSubCategoryData, 
  ISubCategory, 
  IUpdateCategoryData, 
  IUpdateSubCategoryData 
} from '../types';

/**
 * Kategori Servis API
 * Bu modül, kategori işlemleri için bir facade (ön yüz) sağlar.
 */
export class CategoryService {
  /**
   * Tüm kategorileri getirir
   */
  static async getAllCategories(): Promise<ICategory[]> {
    apiLogger.debug('Tüm kategoriler getiriliyor');
    // API çağrısı simülasyonu
    return [];
  }

  /**
   * ID'ye göre kategori getirir
   */
  static async getCategoryById(id: string): Promise<ICategory> {
    apiLogger.debug('ID ile kategori getiriliyor', { id });
    // API çağrısı simülasyonu
    return {
      id,
      name: 'Test Kategori',
      icon: null,
      user_id: 'user-123',
      sort_order: 0,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sub_categories: []
    };
  }

  /**
   * Yeni kategori oluşturur
   */
  static async createCategory(data: ICreateCategoryData): Promise<ICategory> {
    apiLogger.debug('Kategori oluşturuluyor', { data });
    // API çağrısı simülasyonu
    return {
      id: 'new-category-id',
      name: data.name,
      icon: data.icon || null,
      user_id: data.user_id,
      sort_order: 0,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Kategori günceller
   */
  static async updateCategory(id: string, data: IUpdateCategoryData): Promise<ICategory> {
    apiLogger.debug('Kategori güncelleniyor', { id, data });
    // API çağrısı simülasyonu
    return {
      id,
      name: data.name || 'Updated Category',
      icon: data.icon || null,
      user_id: 'user-123',
      sort_order: data.sort_order || 0,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Kategori siler
   */
  static async deleteCategory(id: string): Promise<void> {
    apiLogger.debug('Kategori siliniyor', { id });
    // API çağrısı simülasyonu
  }

  /**
   * Alt kategori oluşturur
   */
  static async createSubCategory(data: ICreateSubCategoryData): Promise<ISubCategory> {
    apiLogger.debug('Alt kategori oluşturuluyor', { data });
    // API çağrısı simülasyonu
    return {
      id: 'new-subcategory-id',
      name: data.name,
      category_id: data.category_id,
      sort_order: 0,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Alt kategori günceller
   */
  static async updateSubCategory(id: string, data: IUpdateSubCategoryData): Promise<ISubCategory> {
    apiLogger.debug('Alt kategori güncelleniyor', { id, data });
    // API çağrısı simülasyonu
    return {
      id,
      name: data.name || 'Updated Subcategory',
      category_id: data.category_id || 'category-id',
      sort_order: data.sort_order || 0,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Alt kategori siler
   */
  static async deleteSubCategory(id: string): Promise<void> {
    apiLogger.debug('Alt kategori siliniyor', { id });
    // API çağrısı simülasyonu
  }

  /**
   * Kategori sıralamasını günceller
   */
  static async updateCategoryOrder(categories: { id: string, sort_order: number }[]): Promise<void> {
    apiLogger.debug('Kategori sıralaması güncelleniyor', { count: categories.length });
    // API çağrısı simülasyonu
  }

  /**
   * Alt kategori sıralamasını günceller
   */
  static async updateSubCategoryOrder(subCategories: { id: string, sort_order: number }[]): Promise<void> {
    apiLogger.debug('Alt kategori sıralaması güncelleniyor', { count: subCategories.length });
    // API çağrısı simülasyonu
  }

  /**
   * Alt kategorileri taşır
   */
  static async moveSubCategories(sourceId: string, targetId: string, subCategoryIds: string[]): Promise<void> {
    apiLogger.debug('Alt kategoriler taşınıyor', { sourceId, targetId, count: subCategoryIds.length });
    // API çağrısı simülasyonu
  }
}
