
import { CategoryListQueryService } from '../query/CategoryListQueryService';
import { CategoryDetailQueryService } from '../query/CategoryDetailQueryService';
import { CategoryWriteService } from '../management/CategoryWriteService';
import { CategoryDeleteService } from '../management/CategoryDeleteService';
import type { 
  ICategory, 
  ICreateCategoryData,
  IUpdateCategoryData 
} from '../../types';

/**
 * Kategori işlemleri için facade servis
 * Tüm kategori servisleri için tek bir giriş noktası sağlar
 */
export class CategoryFacadeService {
  private listQueryService: CategoryListQueryService;
  private detailQueryService: CategoryDetailQueryService;
  private writeService: CategoryWriteService;
  private deleteService: CategoryDeleteService;
  
  constructor() {
    this.listQueryService = new CategoryListQueryService();
    this.detailQueryService = new CategoryDetailQueryService();
    this.writeService = new CategoryWriteService();
    this.deleteService = new CategoryDeleteService();
  }
  
  // Query methods
  async getAllCategories(): Promise<ICategory[]> {
    return this.listQueryService.getAllCategories();
  }
  
  async getCategoryById(id: string): Promise<ICategory | null> {
    return this.detailQueryService.getCategoryById(id);
  }
  
  // Write methods
  async createCategory(data: ICreateCategoryData): Promise<ICategory> {
    return this.writeService.createCategory(data);
  }
  
  async updateCategory(id: string, data: IUpdateCategoryData): Promise<ICategory> {
    return this.writeService.updateCategory(id, data);
  }
  
  // Delete methods
  async deleteCategory(id: string): Promise<void> {
    return this.deleteService.deleteCategory(id);
  }
}

// Singleton instance
export const categoryService = new CategoryFacadeService();
