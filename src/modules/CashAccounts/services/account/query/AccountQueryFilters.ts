
import { SupabaseQueryBuilder } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { BaseQueryFilters } from '../../query/BaseQueryFilters';
import { CurrencyType } from '../../../types';

type AccountTable = 'cash_accounts';
type AccountQueryBuilder = SupabaseQueryBuilder<
  Database['public'], 
  AccountTable,
  Database['public']['Tables']['cash_accounts']['Row']
>;

/**
 * Nakit hesap sorguları için filtre yardımcıları
 */
export class AccountQueryFilters extends BaseQueryFilters<'cash_accounts'> {
  /**
   * Aktif hesaplar filtresi uygular
   */
  static applyActiveFilter(
    query: AccountQueryBuilder,
    onlyActive: boolean = true
  ): AccountQueryBuilder {
    if (onlyActive) {
      return query.eq('is_active', true);
    }
    return query;
  }

  /**
   * Para birimi filtresi uygular
   */
  static applyCurrencyFilter(
    query: AccountQueryBuilder,
    currency?: CurrencyType | 'all'
  ): AccountQueryBuilder {
    if (currency && currency !== 'all') {
      return query.eq('currency', currency);
    }
    return query;
  }

  /**
   * Sıralama filtresi uygular
   */
  static applySortingFilter(
    query: AccountQueryBuilder,
    sortBy?: 'name' | 'balance' | 'date',
    sortOrder?: 'asc' | 'desc'
  ): AccountQueryBuilder {
    if (sortBy === 'name') {
      return query.order('name', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'balance') {
      return query.order('initial_balance', { ascending: sortOrder === 'asc' });
    } else if (sortBy === 'date') {
      return query.order('created_at', { ascending: sortOrder === 'asc' });
    }
    return query;
  }
}
