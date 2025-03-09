
// Kategori servisleri için merkezi export dosyası
import { CategoryQueryService } from './CategoryQueryService';
import { CategoryManagementService } from './CategoryManagementService';
import { CategoryOrganizationService } from './CategoryOrganizationService';
import { SubcategoryService } from './SubcategoryService';
import { BaseCategoryService } from './BaseCategoryService';

// Tüm servisleri export et
export {
  BaseCategoryService,
  CategoryQueryService,
  CategoryManagementService,
  CategoryOrganizationService,
  SubcategoryService
};

// Yeni tarzda export için basit factory
export const createCategoryServices = () => ({
  query: new CategoryQueryService(),
  management: new CategoryManagementService(),
  organization: CategoryOrganizationService, // Statik metodları olan bir sınıf
  subcategory: new SubcategoryService()
});

// Geriye uyumluluk için
export default BaseCategoryService;
