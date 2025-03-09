
import { BaseCategoryTemplateService } from './BaseCategoryTemplateService';
import { CategoryManagementService } from '../CategoryManagementService';
import { SubcategoryService } from '../SubcategoryService';
import type { ICategory, ICreateCategoryData, ICreateSubCategoryData } from '../../types';
import type { ICategoryTemplate, ISubCategoryTemplate, SupportedLanguage } from '../../types/template';
import { Json } from '@/integrations/supabase/types';
import { getLocalizedName, safeJsonToStringRecord } from '../../utils/languageUtils';

/**
 * Şablonlardan kategori oluşturma servisi
 */
export class CategoryTemplateImportService extends BaseCategoryTemplateService {
  private categoryService: CategoryManagementService;
  private subcategoryService: SubcategoryService;

  constructor() {
    super('Categories.TemplateImport');
    this.categoryService = new CategoryManagementService();
    this.subcategoryService = new SubcategoryService();
  }

  /**
   * Şablondan yeni bir kategori oluşturur
   */
  async createCategoryFromTemplate(templateId: string, userId: string, language: SupportedLanguage = 'tr'): Promise<ICategory | null> {
    try {
      this.logger.debug('Şablondan kategori oluşturuluyor', { templateId, userId, language });
      
      // Şablon verisini getir
      const { data: template, error } = await this.supabaseClient
        .from('category_templates')
        .select('*')
        .eq('id', templateId)
        .eq('is_active', true)
        .single();
      
      if (error) {
        this.logger.error('Şablon getirme hatası', error, { templateId });
        return null;
      }
      
      // Alt kategori şablonlarını getir
      const { data: subCategoryTemplates, error: subCategoryError } = await this.supabaseClient
        .from('subcategory_templates')
        .select('*')
        .eq('category_template_id', templateId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (subCategoryError) {
        this.logger.error('Alt kategori şablonları getirme hatası', subCategoryError, { templateId });
        return null;
      }
      
      // Json verisini Record<string, string> tipine dönüştür
      const nameRecord = safeJsonToStringRecord(template.name);
      
      // Çoklu dil desteği için şablon isminden tercihe uygun dildeki ismi al
      const categoryName = getLocalizedName(nameRecord, language, 'Unnamed Template');
      
      // Kategoriyi oluştur
      const categoryData: ICreateCategoryData = {
        name: categoryName,
        icon: template.icon,
        user_id: userId
      };
      
      const category = await this.categoryService.createCategory(categoryData);
      
      // Alt kategorileri oluştur
      if (subCategoryTemplates && subCategoryTemplates.length > 0) {
        this.logger.debug('Şablondan alt kategoriler oluşturuluyor', { 
          categoryId: category.id, 
          subCategoryCount: subCategoryTemplates.length 
        });
        
        await Promise.all(subCategoryTemplates.map(async (subTemplate) => {
          // Json verisini Record<string, string> tipine dönüştür
          const subNameRecord = safeJsonToStringRecord(subTemplate.name);
          
          // Alt kategori için tercih edilen dildeki ismi al
          const subCategoryName = getLocalizedName(subNameRecord, language, 'Unnamed Subcategory');
          
          const subCategoryData: ICreateSubCategoryData = {
            name: subCategoryName,
            category_id: category.id
          };
          
          await this.subcategoryService.createSubCategory(subCategoryData);
        }));
      }
      
      // Güncel kategori verisini döndür
      const updatedCategory = await this.categoryService.getCategoryById(category.id);
      
      this.logger.debug('Şablondan kategori başarıyla oluşturuldu', { 
        categoryId: updatedCategory?.id,
        templateId,
        language
      });
      
      return updatedCategory;
    } catch (error) {
      this.logger.error('Şablondan kategori oluşturma hatası', error instanceof Error ? error : new Error('Bilinmeyen hata'), { templateId, userId, language });
      return null;
    }
  }
}

export default CategoryTemplateImportService;
