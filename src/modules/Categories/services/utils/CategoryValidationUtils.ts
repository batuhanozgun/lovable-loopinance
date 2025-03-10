
/**
 * Kategori ve alt kategori verilerini doğrulama yardımcı fonksiyonları
 */
export class CategoryValidationUtils {
  /**
   * Kategori verisini doğrular
   */
  public validateCategoryData(data: any): boolean {
    return !!data && typeof data.name === 'string' && data.name.trim().length > 0;
  }
  
  /**
   * Alt kategori verisini doğrular
   */
  public validateSubCategoryData(data: any): boolean {
    return !!data && 
      typeof data.name === 'string' && 
      data.name.trim().length > 0 &&
      typeof data.category_id === 'string';
  }
}

// Singleton instance
export const categoryValidator = new CategoryValidationUtils();
