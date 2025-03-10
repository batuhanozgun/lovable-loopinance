
import { CategoryOrganizationService } from '../organization/CategoryOrganizationService';
import type { 
  ICategoryOrder, 
  ISubCategoryOrder,
  ICategoryMoveOperation
} from '../../types';

/**
 * Organizasyon işlemleri için facade servis
 */
export class OrganizationFacadeService {
  private organizationService: CategoryOrganizationService;
  
  constructor() {
    this.organizationService = new CategoryOrganizationService();
  }
  
  async updateCategoryOrder(categoryOrders: ICategoryOrder[]): Promise<{success: boolean; error?: string}> {
    return this.organizationService.updateCategoryOrder(categoryOrders);
  }
  
  async updateSubCategoryOrder(subCategoryOrders: ISubCategoryOrder[]): Promise<{success: boolean; error?: string}> {
    return this.organizationService.updateSubCategoryOrder(subCategoryOrders);
  }
  
  async moveSubCategoriesToCategory(
    sourceId: string,
    targetId: string,
    subCategoryIds: string[]
  ): Promise<{success: boolean; error?: string}> {
    return this.organizationService.moveSubCategoriesToCategory(sourceId, targetId, subCategoryIds);
  }
}

// Singleton instance
export const organizationService = new OrganizationFacadeService();
