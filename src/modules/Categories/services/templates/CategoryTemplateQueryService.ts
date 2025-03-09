
import { BaseCategoryTemplateService } from './BaseCategoryTemplateService';
import type { ICategoryTemplate } from '../../types/template';

/**
 * Kategori şablonları ve alt kategori şablonlarını sorgulama işlemleri
 */
export class CategoryTemplateQueryService extends BaseCategoryTemplateService {
  constructor() {
    super('Categories.TemplateQuery');
  }

  /**
   * Tüm kategori şablonlarını ve alt kategori şablonlarını getirir
   */
  async getAllCategoryTemplates(language = 'tr'): Promise<ICategoryTemplate[]> {
    try {
      this.logger.debug('Kategori şablonları getiriliyor', { language });
      
      // Ana kategori şablonlarını getir
      const { data: categoryTemplates, error: categoryError } = await this.supabaseClient
        .from('category_templates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (categoryError) {
        return this.handleDbError(categoryError, 'Kategori şablonları listesi getirme');
      }
      
      if (!categoryTemplates) {
        return [];
      }
      
      // Her kategori şablonu için alt kategori şablonlarını getir
      const result = await Promise.all(
        categoryTemplates.map(async (categoryTemplate) => {
          const { data: subCategoryTemplates, error: subCategoryError } = await this.supabaseClient
            .from('subcategory_templates')
            .select('*')
            .eq('category_template_id', categoryTemplate.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true });
          
          if (subCategoryError) {
            this.logger.error('Alt kategori şablonlarını getirme hatası', subCategoryError, { categoryTemplateId: categoryTemplate.id });
            return { ...categoryTemplate, sub_categories: [] };
          }
          
          return { 
            ...categoryTemplate, 
            sub_categories: subCategoryTemplates?.map(subTemplate => ({
              ...subTemplate
            })) || [] 
          };
        })
      );
      
      this.logger.debug('Kategori şablonları başarıyla getirildi', { count: result.length });
      return result;
    } catch (error) {
      return this.handleDbError(error instanceof Error ? error : new Error('Bilinmeyen hata'), 'Kategori şablonları listesi getirme');
    }
  }
  
  /**
   * Belirli bir kategori şablonunu detaylarıyla getirir
   */
  async getCategoryTemplateById(id: string, language = 'tr'): Promise<ICategoryTemplate | null> {
    try {
      this.logger.debug('Kategori şablonu detayları getiriliyor', { categoryTemplateId: id, language });
      
      // Kategori şablonunu getir
      const { data: categoryTemplate, error: categoryError } = await this.supabaseClient
        .from('category_templates')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();
      
      if (categoryError) {
        if (categoryError.code === 'PGRST116') {
          this.logger.warn('Kategori şablonu bulunamadı', { categoryTemplateId: id });
          return null;
        }
        this.logger.error('Kategori şablonu detayları getirme hatası', categoryError, { categoryTemplateId: id });
        return null;
      }
      
      // Alt kategori şablonlarını getir
      const { data: subCategoryTemplates, error: subCategoryError } = await this.supabaseClient
        .from('subcategory_templates')
        .select('*')
        .eq('category_template_id', id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        this.logger.error('Alt kategori şablonları detayları getirme hatası', subCategoryError, { categoryTemplateId: id });
        return { ...categoryTemplate, sub_categories: [] };
      }
      
      return { 
        ...categoryTemplate, 
        sub_categories: subCategoryTemplates || [] 
      };
    } catch (error) {
      this.logger.error('Kategori şablonu detayları getirme işlemi başarısız oldu', error instanceof Error ? error : new Error('Bilinmeyen hata'), { categoryTemplateId: id });
      return null;
    }
  }
}

export default CategoryTemplateQueryService;
