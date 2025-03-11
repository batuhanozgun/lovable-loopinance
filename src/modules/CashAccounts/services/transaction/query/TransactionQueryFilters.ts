
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '@/integrations/supabase/types';

// İşlem tablosu için sorgu builder tip tanımı
type TransactionQueryBuilder = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables']['account_transactions']['Row'],
  Database['public']['Tables']['account_transactions']['Row'][]
>;

/**
 * İşlem sorguları için filtre yardımcıları
 */
export class TransactionQueryFilters {
  /**
   * Tarih aralığı filtresi uygular
   */
  static applyDateRangeFilter(
    query: TransactionQueryBuilder,
    startDate?: string,
    endDate?: string
  ): TransactionQueryBuilder {
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
    query: TransactionQueryBuilder,
    transactionType?: 'income' | 'expense' | 'all'
  ): TransactionQueryBuilder {
    if (transactionType && transactionType !== 'all') {
      return query.eq('transaction_type', transactionType);
    }
    return query;
  }

  /**
   * Sıralama filtresi uygular
   */
  static applySortingFilter(
    query: TransactionQueryBuilder,
    sortBy?: 'date' | 'amount',
    sortOrder?: 'asc' | 'desc'
  ): TransactionQueryBuilder {
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
    query: TransactionQueryBuilder,
    limit?: number
  ): TransactionQueryBuilder {
    if (limit) {
      return query.limit(limit);
    }
    return query;
  }
}
