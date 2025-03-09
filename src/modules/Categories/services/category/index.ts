
import { CategoryQueryService } from './category-query.service';
import { CategoryManagementService } from './category-management.service';
import { SubcategoryService } from './subcategory.service';
import { CategoryOrganizationService } from './category-organization.service';

// Servis sınıfları için singleton pattern uygulama
const categoryQueryService = new CategoryQueryService();
const categoryManagementService = new CategoryManagementService();
const subcategoryService = new SubcategoryService();
const categoryOrganizationService = new CategoryOrganizationService();

// Tüm servisleri tek bir noktadan export etme
export {
  categoryQueryService,
  categoryManagementService,
  subcategoryService,
  categoryOrganizationService
};

// Servis sınıfları da dışa aktarılabilir (test ve özelleştirme için)
export {
  CategoryQueryService,
  CategoryManagementService,
  SubcategoryService,
  CategoryOrganizationService
};

/**
 * Kategori Servis API
 * 
 * Bu modül, kategori işlemleri için bir facade (ön yüz) sağlar.
 * Tüm kategori işlemleri tek bir noktadan erişilebilir.
 */
export const CategoryService = {
  // Kategori sorgulama işlemleri
  getAllCategories: () => categoryQueryService.getAllCategories(),
  getCategoryById: (id: string) => categoryQueryService.getCategoryById(id),
  
  // Kategori CRUD işlemleri
  createCategory: (data: any) => categoryManagementService.createCategory(data),
  updateCategory: (id: string, data: any) => categoryManagementService.updateCategory(id, data),
  deleteCategory: (id: string) => categoryManagementService.deleteCategory(id),
  
  // Alt kategori işlemleri
  createSubCategory: (data: any) => subcategoryService.createSubCategory(data),
  updateSubCategory: (id: string, data: any) => subcategoryService.updateSubCategory(id, data),
  deleteSubCategory: (id: string) => subcategoryService.deleteSubCategory(id),
  
  // Organizasyon işlemleri
  updateCategoryOrder: (categories: any[]) => 
    categoryOrganizationService.updateCategoryOrder(categories),
  updateSubCategoryOrder: (subCategories: any[]) => 
    categoryOrganizationService.updateSubCategoryOrder(subCategories),
  moveSubCategories: (sourceId: string, targetId: string, subCategoryIds: string[]) => 
    categoryOrganizationService.moveSubCategories(sourceId, targetId, subCategoryIds)
};

// Varsayılan export - tüm API
export default CategoryService;
