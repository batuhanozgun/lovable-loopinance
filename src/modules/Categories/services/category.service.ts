
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

// Ana servis olarak BaseCategoryService'i kullan
export const CategoryService = BaseCategoryService;

// Eski tarzda export için
export default BaseCategoryService;
