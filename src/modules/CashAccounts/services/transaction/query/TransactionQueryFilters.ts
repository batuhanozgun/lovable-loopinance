
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

type QueryBuilder = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['account_transactions'],
  Database['public']['Tables']['account_transactions']['Row']
>;

/**
 * İşlem sorguları için filtre yardımcıları
 */
export class TransactionQueryFilters {
  /**
   * Tarih aralığı filtresi uygular
   */
  static applyDateRangeFilter(
    query: QueryBuilder,
    startDate?: string,
    endDate?: string
  ): QueryBuilder {
    let filteredQuery = query;
    
    if (startDate) {
      filteredQuery = filteredQuery.gte('transaction_date', startDate);
    }
    
    if (endDate) {
      filteredQuery = filteredQuery.lte('transaction_date', endDate);
    }
    
    return filteredQuery;
  }

  /**
   * İşlem türü filtresi uygular
   */
  static applyTransactionTypeFilter(
    query: QueryBuilder,
    transactionType?: 'income' | 'expense' | 'all'
  ): QueryBuilder {
    if (transactionType && transactionType !== 'all') {
      return query.eq('transaction_type', transactionType);
    }
    return query;
  }

  /**
   * Sıralama filtresi uygular
   */
  static applySortingFilter(
    query: QueryBuilder,
    sortBy?: 'date' | 'amount',
    sortOrder?: 'asc' | 'desc'
  ): QueryBuilder {
    if (sortBy === 'date') {
      return query
        .order('transaction_date', { ascending: sortOrder === 'asc' })
        .order('transaction_time', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'amount') {
      return query.order('amount', { ascending: sortOrder === 'asc' });
    }
    return query;
  }

  /**
   * Limit filtresi uygular
   */
  static applyLimitFilter(
    query: QueryBuilder,
    limit?: number
  ): QueryBuilder {
    if (limit) {
      return query.limit(limit);
    }
    return query;
  }
}
