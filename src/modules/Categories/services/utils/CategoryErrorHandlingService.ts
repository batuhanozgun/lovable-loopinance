
import { PostgrestError } from '@supabase/supabase-js';
import { createLogger } from '@/modules/Logging';

/**
 * Kategori servisleri için merkezi hata işleme servisi
 */
export class CategoryErrorHandlingService {
  private logger = createLogger('Categories.ErrorHandling');

  /**
   * Veritabanı hatasını işleyip uygun şekilde loglar
   */
  public handleDbError(error: PostgrestError | Error | unknown, operation: string, additionalData?: Record<string, any>): never {
    let errorMessage: string;
    let errorObject: Error;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorObject = error;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String((error as { message: unknown }).message);
      errorObject = new Error(errorMessage);
    } else {
      errorMessage = 'Bilinmeyen hata';
      errorObject = new Error(errorMessage);
    }

    this.logger.error(`${operation} sırasında hata oluştu`, errorObject, additionalData);
    throw new Error(`${operation} sırasında hata: ${errorMessage}`);
  }

  /**
   * Yakalanan hataları standart hale getirme
   */
  public normalizeError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(typeof error === 'string' ? error : 'Bilinmeyen hata');
  }
}

// Singleton instance
export const categoryErrorHandler = new CategoryErrorHandlingService();
