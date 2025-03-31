
import { supabase } from '@/integrations/supabase/client';
import { CreateTransactionData, SingleTransactionResponse, Transaction } from '../types';

/**
 * İşlem oluşturma servisi
 */
export class TransactionCreationService {
  /**
   * Yeni bir hesap işlemi oluşturur
   */
  static async createTransaction(data: CreateTransactionData): Promise<SingleTransactionResponse> {
    try {
      console.log('TransactionCreationService - Creating transaction with data:', data);
      
      // Veri doğrulama kontrolü
      if (!data.account_id) {
        const errorMsg = 'account_id is required but missing';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.statement_id) {
        const errorMsg = 'statement_id is required but missing';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_date) {
        const errorMsg = 'transaction_date is required but missing';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_time) {
        const errorMsg = 'transaction_time is required but missing';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      // Amount doğrulama - sayı olmalı ve tam sayı değeri
      if (data.amount === undefined || data.amount === null || isNaN(Number(data.amount))) {
        const errorMsg = `amount is required but missing or invalid (received: ${data.amount}, type: ${typeof data.amount})`;
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      if (!data.transaction_type) {
        const errorMsg = 'transaction_type is required but missing';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      // Ekstrenin durumunu kontrol et (artık sadece bilgi olarak göstereceğiz, engelleme yapmıyoruz)
      const { data: statementData, error: statementError } = await supabase
        .from('account_statements')
        .select('status')
        .eq('id', data.statement_id)
        .single();
      
      if (statementError) {
        console.error('Failed to check statement status:', statementError);
        return { success: false, error: 'Failed to verify statement status' };
      }
      
      console.log('Statement status:', statementData?.status);
      
      // API çağrısı
      console.log('Making Supabase API call with validated data');
      const { data: transactionData, error: supabaseError } = await supabase
        .from('account_transactions')
        .insert(data)
        .select('*')
        .maybeSingle();
      
      // Hata durumunu kontrol et
      if (supabaseError) {
        console.error('Supabase error creating transaction:', {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code
        });
        return {
          success: false,
          error: supabaseError.message
        };
      }

      // Eğer veri yoksa
      if (!transactionData) {
        const errorMsg = 'Transaction created but no data returned';
        console.error(errorMsg);
        return {
          success: false,
          error: errorMsg
        };
      }
      
      console.log('Account transaction created successfully:', { id: transactionData.id });
      
      return {
        success: true,
        data: transactionData as Transaction
      };
    } catch (error) {
      // Tüm hata tiplerini güvenli bir şekilde işle
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error("Unexpected error creating account transaction:", { 
        error, 
        message: errorMessage
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
