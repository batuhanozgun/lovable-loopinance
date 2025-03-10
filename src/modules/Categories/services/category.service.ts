
// Re-export the facade services for easier imports
import { categoryService } from './facades/CategoryFacadeService';
import { subcategoryService } from './facades/SubcategoryFacadeService';
import { organizationService } from './facades/OrganizationFacadeService';

// Re-export utility services
import { categoryErrorHandler } from './utils/CategoryErrorHandlingService';
import { categoryLogger } from './utils/CategoryLoggingService';
import { categoryValidator } from './utils/CategoryValidationUtils';
import { categoryQueryUtils } from './utils/CategoryQueryUtils';

// Export main services for use throughout the application
export {
  // Facade services
  categoryService,
  subcategoryService,
  organizationService,
  
  // Utility services
  categoryErrorHandler,
  categoryLogger,
  categoryValidator,
  categoryQueryUtils
};

// Default export for convenience
const CategoryServices = {
  categoryService,
  subcategoryService,
  organizationService,
  utilities: {
    errorHandler: categoryErrorHandler,
    logger: categoryLogger,
    validator: categoryValidator,
    queryUtils: categoryQueryUtils
  }
};

export default CategoryServices;
