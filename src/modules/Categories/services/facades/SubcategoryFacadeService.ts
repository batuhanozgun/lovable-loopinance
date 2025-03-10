
import { SubcategoryQueryService } from '../subcategory/SubcategoryQueryService';
import { SubcategoryWriteService } from '../subcategory/SubcategoryWriteService';
import { SubcategoryDeleteService } from '../subcategory/SubcategoryDeleteService';
import type { 
  ISubCategory, 
  ICreateSubCategoryData,
  IUpdateSubCategoryData 
} from '../../types';

/**
 * Alt kategori işlemleri için facade servis
 * Tüm alt kategori servisleri için tek bir giriş noktası sağlar
 */
export class SubcategoryFacadeService {
  private queryService: SubcategoryQueryService;
  private writeService: SubcategoryWriteService;
  private deleteService: SubcategoryDeleteService;
  
  constructor() {
    this.queryService = new SubcategoryQueryService();
    this.writeService = new SubcategoryWriteService();
    this.deleteService = new SubcategoryDeleteService();
  }
  
  // Query methods
  async getSubCategoriesByCategoryId(categoryId: string): Promise<ISubCategory[]> {
    return this.queryService.getSubCategoriesByCategoryId(categoryId);
  }
  
  // Write methods
  async createSubCategory(data: ICreateSubCategoryData): Promise<ISubCategory> {
    return this.writeService.createSubCategory(data);
  }
  
  async updateSubCategory(id: string, data: IUpdateSubCategoryData): Promise<ISubCategory> {
    return this.writeService.updateSubCategory(id, data);
  }
  
  // Delete methods
  async deleteSubCategory(id: string): Promise<void> {
    return this.deleteService.deleteSubCategory(id);
  }
}

// Singleton instance
export const subcategoryService = new SubcategoryFacadeService();
