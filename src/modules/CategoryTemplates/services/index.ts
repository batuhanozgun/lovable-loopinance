
// Kategori şablonu ile ilgili tüm servisleri dışa aktar
export * from './TemplateImportService';
export * from './TemplateQueryService';
export * from './BaseTemplateService';

// Default export olmadığı için bu kısım kaldırılabilir ya da bir default export eklenebilir
export default {
  TemplateImportService: require('./TemplateImportService').default,
  TemplateQueryService: require('./TemplateQueryService').default,
  BaseTemplateService: require('./BaseTemplateService').default
};
