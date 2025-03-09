
import { CategoryTemplateQueryService } from './CategoryTemplateQueryService';
import { CategoryTemplateImportService } from './CategoryTemplateImportService';
import { BaseCategoryTemplateService } from './BaseCategoryTemplateService';

// Kategori şablonu ile ilgili tüm servisleri dışa aktar
export {
  CategoryTemplateQueryService,
  CategoryTemplateImportService,
  BaseCategoryTemplateService
};

// Default export olmadığı için bu kısım kaldırılabilir ya da bir default export eklenebilir
export default {
  CategoryTemplateQueryService,
  CategoryTemplateImportService,
  BaseCategoryTemplateService
};
