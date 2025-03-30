
import { supabase } from '@/integrations/supabase/client';
import { CreateCashAccountRequest, CashAccountResponse } from '../types';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { SessionService } from '@/modules/UserManagement/auth/services/SessionService';
import { useSessionService } from '@/modules/UserManagement/auth/hooks/useSessionService';

/**
 * Nakit hesap yönetimi için servis sınıfı
 */
export class CashAccountManagementService {
  private static logger = LoggerService.getInstance('CashAccountManagementService');

  /**
   * Kullanıcı ID'sini alır
   */
  private static async getUserId(): Promise<string | null> {
    try {
      const sessionResponse = await SessionService.getCurrentSession();
      return sessionResponse.user?.id || null;
    } catch (error) {
      this.logger.error('Error getting user ID:', error);
      return null;
    }
  }

  /**
   * Yeni bir nakit hesap oluşturur
   * @param data Nakit hesap verileri
   * @returns İşlem sonucu
   */
  public static async createCashAccount(data: CreateCashAccountRequest): Promise<CashAccountResponse> {
    try {
      this.logger.debug('Creating cash account with data:', data);

      // Kullanıcı ID'sini al
      const userId = await this.getUserId();
      if (!userId) {
        this.logger.error('User ID not found');
        return {
          success: false,
          error: 'User ID not found',
        };
      }

      const { data: cashAccount, error } = await supabase
        .from('cash_accounts')
        .insert({
          name: data.name,
          initial_balance: data.initial_balance,
          currency: data.currency,
          description: data.description,
          closing_day_type: data.closing_day_type,
          closing_day_value: data.closing_day_value,
          account_type: 'Cash Account',
          user_id: userId
        })
        .select()
        .single();

      if (error) {
        this.logger.error('Error creating cash account:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      this.logger.debug('Cash account created successfully:', cashAccount);
      return {
        success: true,
        data: cashAccount,
      };
    } catch (error) {
      this.logger.error('Unexpected error creating cash account:', error);
      return {
        success: false,
        error: 'Unexpected error creating cash account',
      };
    }
  }
}
