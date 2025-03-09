
// Bu dosya eski API ile uyumluluk için bırakılmıştır
// Yeni servisleri doğrudan import edin: import { CategoryService } from '../category.service';

import { BaseCategoryService } from './base-category.service';
import { CategoryQueryService } from './category-query.service';
import { CategoryManagementService } from './category-management.service';
import { CategoryOrganizationService } from './category-organization.service';
import { SubcategoryService } from './subcategory.service';

export { 
  BaseCategoryService as CategoryService,
  CategoryQueryService,
  CategoryManagementService,
  CategoryOrganizationService,
  SubcategoryService
};

// Kategori Servis API - Eski API ile uyumluluk
export default BaseCategoryService;
