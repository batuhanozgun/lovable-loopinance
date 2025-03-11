
import { SupabaseQueryBuilder } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

/**
 * Tüm sorgu filtreleri için temel sınıf
 * Bu sınıf, tüm filtre sınıfları tarafından ortak olarak kullanılan yöntemleri içerir
 */
export class BaseQueryFilters<T extends keyof Database['public']['Tables'], 
                               Row = Database['public']['Tables'][T]['Row']> {

  /**
   * Limit filtresi uygular
   */
  static applyLimitFilter<T extends keyof Database['public']['Tables']>(
    query: SupabaseQueryBuilder<Database['public'], T, Database['public']['Tables'][T]['Row']>,
    limit?: number
  ): SupabaseQueryBuilder<Database['public'], T, Database['public']['Tables'][T]['Row']> {
    if (limit) {
      return query.limit(limit);
    }
    return query;
  }

  /**
   * Hata işleme yardımcısı
   */
  protected static handleError(error: any, context: string): string {
    console.error(`Failed in ${context}`, { error });
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
