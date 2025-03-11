
import { SupabaseQueryBuilder } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { BaseQueryFilters } from '../../query/BaseQueryFilters';
import { StatementStatus } from '../../../types';

type StatementTable = 'account_statements';
type StatementQueryBuilder = SupabaseQueryBuilder<
  Database['public'], 
  StatementTable,
  Database['public']['Tables']['account_statements']['Row']
>;

/**
 * Ekstre sorguları için filtre yardımcıları
 */
export class StatementQueryFilters extends BaseQueryFilters<'account_statements'> {
  /**
   * Tarih aralığı filtresi uygular
   */
  static applyDateRangeFilter(
    query: StatementQueryBuilder,
    startDate?: string,
    endDate?: string
  ): StatementQueryBuilder {
    let filteredQuery = query;
    
    if (startDate) {
      filteredQuery = filteredQuery.gte('start_date', startDate);
    }
    
    if (endDate) {
      filteredQuery = filteredQuery.lte('end_date', endDate);
    }
    
    return filteredQuery;
  }

  /**
   * Ekstre durumu filtresi uygular
   */
  static applyStatusFilter(
    query: StatementQueryBuilder,
    status?: StatementStatus | 'all'
  ): StatementQueryBuilder {
    if (status && status !== 'all') {
      return query.eq('status', status);
    }
    return query;
  }

  /**
   * Sıralama filtresi uygular
   */
  static applySortingFilter(
    query: StatementQueryBuilder,
    sortBy?: 'date' | 'balance',
    sortOrder?: 'asc' | 'desc'
  ): StatementQueryBuilder {
    if (sortBy === 'date') {
      return query.order('start_date', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'balance') {
      return query.order('end_balance', { ascending: sortOrder === 'asc' });
    }
    return query;
  }
}
