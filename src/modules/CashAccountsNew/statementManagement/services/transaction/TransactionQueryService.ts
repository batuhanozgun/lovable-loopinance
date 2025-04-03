
/**
 * İşlem sorgulama servisi
 */
import { supabase } from '@/integrations/supabase/client';
import { ModuleLogger } from '@/modules/Logging/core/ModuleLogger';
import {
  AccountTransaction,
  StatementTransactionListResponse,
  TransactionQueryOptions,
  TransactionSortField,
  SortDirection
} from '../../types/transaction';

/**
 * İşlem sorgulama servisi
 */
export class TransactionQueryService {
  private static logger = new ModuleLogger('CashAccountsNew.TransactionQueryService');
  
  /**
   * Ekstre ID'sine göre işlemleri getirir
   */
  static async getTransactionsByStatementId(
    statementId: string,
    options?: TransactionQueryOptions
  ): Promise<StatementTransactionListResponse> {
    try {
      this.logger.debug('Getting transactions by statement ID', { statementId, options });
      
      // Sorgu oluştur
      let query = supabase
        .from('cash_account_transactions')
        .select(`
          *,
          categories:category_id(*),
          subcategories:subcategory_id(*)
        `)
        .eq('statement_id', statementId);
      
      // Filtreleri uygula
      if (options?.filters) {
        // Tarih aralığı filtresi
        if (options.filters.dateRange) {
          if (options.filters.dateRange.from) {
            query = query.gte('transaction_date', options.filters.dateRange.from);
          }
          if (options.filters.dateRange.to) {
            query = query.lte('transaction_date', options.filters.dateRange.to);
          }
        }
        
        // İşlem türü filtresi
        if (options.filters.transactionType) {
          query = query.eq('transaction_type', options.filters.transactionType);
        }
        
        // Kategori filtresi
        if (options.filters.categoryId) {
          query = query.eq('category_id', options.filters.categoryId);
        }
        
        // Alt kategori filtresi
        if (options.filters.subcategoryId) {
          query = query.eq('subcategory_id', options.filters.subcategoryId);
        }
        
        // Arama filtresi (açıklamada)
        if (options.filters.search) {
          query = query.ilike('description', `%${options.filters.search}%`);
        }
      }
      
      // Sıralama ayarlarını uygula
      if (options?.sort) {
        const { field = TransactionSortField.DATE, direction = SortDirection.DESC } = options.sort;
        
        // Tarih sıralamasında, aynı gündeki işlemler için saat de kullanılmalı
        if (field === TransactionSortField.DATE) {
          query = query.order('transaction_date', { ascending: direction === SortDirection.ASC })
                       .order('transaction_time', { ascending: direction === SortDirection.ASC });
        } else {
          query = query.order(field, { ascending: direction === SortDirection.ASC });
        }
      } else {
        // Varsayılan sıralama: en son tarih ve saat önce
        query = query.order('transaction_date', { ascending: false })
                     .order('transaction_time', { ascending: false });
      }
      
      // Sayfalama ayarlarını uygula
      if (options?.pagination) {
        const { page = 1, pageSize = 10 } = options.pagination;
        const start = (page - 1) * pageSize;
        query = query.range(start, start + pageSize - 1);
      }
      
      // Sorguyu çalıştır
      const { data, error } = await query;
      
      if (error) {
        this.logger.error('Failed to get transactions', { statementId, error });
        return {
          success: false,
          error: error.message
        };
      }
      
      // Veriyi dönüştür
      const transactions = data.map(tx => {
        // Veri dönüşümü ve temizlik
        const result: AccountTransaction = {
          id: tx.id,
          account_id: tx.account_id,
          statement_id: tx.statement_id,
          amount: tx.amount,
          transaction_type: tx.transaction_type,
          transaction_date: tx.transaction_date,
          transaction_time: tx.transaction_time,
          description: tx.description,
          created_at: tx.created_at,
          updated_at: tx.updated_at
        };
        
        // Kategori bilgilerini ekle (varsa)
        if (tx.category_id && tx.categories) {
          result.category_id = tx.category_id;
          result.category = tx.categories;
        }
        
        // Alt kategori bilgilerini ekle (varsa)
        if (tx.subcategory_id && tx.subcategories) {
          result.subcategory_id = tx.subcategory_id;
          result.subcategory = tx.subcategories;
        }
        
        return result;
      });
      
      this.logger.info(`Found ${transactions.length} transactions for statement`, { statementId });
      
      return {
        success: true,
        data: transactions
      };
    } catch (error) {
      this.logger.error('Unexpected error getting transactions', { statementId, error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
