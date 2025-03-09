
// Kategori servisleri için merkezi export dosyası
import { CategoryQueryService } from './category/category-query.service';
import { CategoryManagementService } from './category/category-management.service';
import { CategoryOrganizationService } from './category/category-organization.service';
import { SubcategoryService } from './category/subcategory.service';
import { BaseCategoryService } from './category/base-category.service';

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
  organization: new CategoryOrganizationService(),
  subcategory: new SubcategoryService()
});

// Geriye uyumluluk için
export default BaseCategoryService;
