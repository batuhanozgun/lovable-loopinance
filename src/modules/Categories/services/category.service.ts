
import { CategoryManagementService } from './CategoryManagementService';
import { CategoryQueryService } from './CategoryQueryService';
import { CategoryOrganizationService } from './CategoryOrganizationService';
import { SubcategoryService } from './SubcategoryService';
import { BaseCategoryService } from './BaseCategoryService';

// Kategori ile ilgili tüm servisleri dışa aktar
export {
  BaseCategoryService,
  CategoryManagementService,
  CategoryQueryService,
  CategoryOrganizationService,
  SubcategoryService
};

// Default export - daha kolaylık sağlar
const CategoryServices = {
  BaseCategoryService,
  CategoryManagementService,
  CategoryQueryService,
  CategoryOrganizationService,
  SubcategoryService
};

export default CategoryServices;
