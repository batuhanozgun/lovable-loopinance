
/**
 * Kategoriler için temel servis sınıfı
 * Diğer kategori servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryService {
  // Buraya ortak metodlar eklenebilir
  // Örneğin: formatCategoryData, validateCategoryData, vb.
  
  /**
   * Kategori verisini doğrula
   */
  validateCategoryData(data: any): boolean {
    return !!data && typeof data.name === 'string' && data.name.trim().length > 0;
  }
  
  /**
   * Alt kategori verisini doğrula
   */
  validateSubCategoryData(data: any): boolean {
    return !!data && 
      typeof data.name === 'string' && 
      data.name.trim().length > 0 &&
      typeof data.category_id === 'string';
  }
}

// default export yerine named export kullanıyoruz
export default BaseCategoryService;
