
import { supabase } from '@/integrations/supabase/client';
import { categoryLogger } from '../utils/CategoryLoggingService';
import { categoryErrorHandler } from '../utils/CategoryErrorHandlingService';
import { categoryValidator } from '../utils/CategoryValidationUtils';
import { categoryQueryUtils } from '../utils/CategoryQueryUtils';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';

/**
 * Kategoriler için temel servis sınıfı
 * Diğer kategori servisleri tarafından kullanılan ortak metodları içerir
 */
export class BaseCategoryService {
  protected logger: ModuleLogger;
  protected supabaseClient = supabase;
  protected errorHandler = categoryErrorHandler;
  protected validator = categoryValidator;
  protected queryUtils = categoryQueryUtils;
  
  constructor(moduleName: string) {
    this.logger = categoryLogger.createLogger(moduleName);
  }
}
