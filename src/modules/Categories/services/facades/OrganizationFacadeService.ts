
import { CategoryOrganizationService } from '../organization/CategoryOrganizationService';
import type {
  ICategoryOrder,
  ISubCategoryOrder,
  ICategoryMoveOperation
} from '../../types';

/**
 * Kategori organizasyon işlemleri için facade servis
 * Tüm organizasyon servisleri için tek bir giriş noktası sağlar
 */
export class OrganizationFacadeService {
  private organizationService: CategoryOrganizationService;
  
  constructor() {
    this.organizationService = new CategoryOrganizationService();
  }
  
  // Reorder methods - yeni isimlerle
  async reorderCategories(categoryOrders: { categories: ICategoryOrder[] }): Promise<{success: boolean; error?: string}> {
    return this.organizationService.reorderCategories(categoryOrders.categories);
  }
  
  async reorderSubCategories(subCategoryOrders: { subCategories: ISubCategoryOrder[] }): Promise<{success: boolean; error?: string}> {
    return this.organizationService.reorderSubCategories(subCategoryOrders.subCategories);
  }
  
  // Move methods
  async moveSubCategoriesToCategory(
    moveOperation: ICategoryMoveOperation
  ): Promise<{success: boolean; error?: string}> {
    return this.organizationService.moveSubCategoriesToCategory(
      moveOperation.sourceId,
      moveOperation.targetId,
      moveOperation.subCategoryIds
    );
  }
}

// Singleton instance
export const organizationService = new OrganizationFacadeService();
