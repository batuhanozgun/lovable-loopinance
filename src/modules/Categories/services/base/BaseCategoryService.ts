
import { createLogger } from '@/modules/Logging';
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import { PostgrestError } from '@supabase/supabase-js';
import { categoryQueryUtils } from '../utils/CategoryQueryUtils';
import { categoryValidator } from '../utils/CategoryValidationUtils';
import { categoryErrorHandler } from '../utils/CategoryErrorHandlingService';

/**
 * Kategoriler için temel servis sınıfı
 * Diğer kategori servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryService {
  protected logger: ModuleLogger;
  protected supabaseClient = supabase;
  protected queryUtils = categoryQueryUtils;
  protected validator = categoryValidator;
  protected errorHandler = categoryErrorHandler;
  
  constructor(moduleName: string) {
    this.logger = createLogger(moduleName);
  }
  
  /**
   * Alt kategorileri getir
   */
  protected async getSubCategories(categoryId: string) {
    return this.queryUtils.getSubCategories(categoryId);
  }
}

export default BaseCategoryService;
