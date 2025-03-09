
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { ISubscription } from "../types/ISubscription";
import { subscriptionLogger } from "../logging";
import { SubscriptionMapperService } from "./subscription-mapper.service";

// Supabase veri tipleri
type SupabasePlanType = Database["public"]["Enums"]["subscription_plan_type"];
type SupabaseStatus = Database["public"]["Enums"]["subscription_status"];

/**
 * Tüm abonelik veri yapıları için temel arabirim
 */
export interface SubscriptionBaseData {
  plan_type: SupabasePlanType;
  status?: SupabaseStatus;
  updated_at: string;
}

/**
 * Abonelik güncelleme işleminde kullanılan veri yapısı
 */
export interface SubscriptionUpdateData extends SubscriptionBaseData {
  current_period_starts_at?: string | null;
  current_period_ends_at?: string | null;
  trial_ends_at?: string | null;
}

/**
 * Abonelik ekleme işleminde kullanılan veri yapısı
 */
export interface SubscriptionInsertData extends SubscriptionUpdateData {
  user_id: string;
  trial_starts_at: string;
}

/**
 * Veritabanı işlemlerini yöneten servis
 */
export class SubscriptionRepositoryService {
  /**
   * Mevcut bir aboneliği günceller
   */
  static async updateSubscription(
    userId: string, 
    updateData: SubscriptionUpdateData
  ): Promise<{ data: ISubscription | null, error: string | null }> {
    try {
      subscriptionLogger.debug('Abonelik güncelleniyor', { userId, updateData });
      
      const result = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('user_id', userId)
        .select('*')
        .single();
      
      if (result.error) {
        subscriptionLogger.error('Abonelik güncellenirken Supabase hatası oluştu', {
          error: result.error, 
          userId,
          errorMessage: result.error.message,
          errorCode: result.error.code
        });
        
        return {
          data: null,
          error: `${result.error.message} (Hata kodu: ${result.error.code})`
        };
      }
      
      if (!result.data) {
        return {
          data: null,
          error: 'Güncelleme sonucu boş veri döndü'
        };
      }
      
      const subscription = SubscriptionMapperService.mapDbResponseToSubscription(result.data);
      return { data: subscription, error: null };
    } catch (error) {
      subscriptionLogger.error('Abonelik güncellenirken beklenmeyen hata', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata',
        userId
      });
      
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
  
  /**
   * Yeni bir abonelik kaydı oluşturur
   */
  static async createSubscription(
    insertData: SubscriptionInsertData
  ): Promise<{ data: ISubscription | null, error: string | null }> {
    try {
      subscriptionLogger.debug('Yeni abonelik oluşturuluyor', { insertData });
      
      const result = await supabase
        .from('subscriptions')
        .insert(insertData)
        .select('*')
        .single();
      
      if (result.error) {
        subscriptionLogger.error('Abonelik oluşturulurken Supabase hatası oluştu', {
          error: result.error,
          userId: insertData.user_id,
          errorMessage: result.error.message,
          errorCode: result.error.code
        });
        
        return {
          data: null,
          error: `${result.error.message} (Hata kodu: ${result.error.code})`
        };
      }
      
      if (!result.data) {
        return {
          data: null,
          error: 'Ekleme sonucu boş veri döndü'
        };
      }
      
      const subscription = SubscriptionMapperService.mapDbResponseToSubscription(result.data);
      return { data: subscription, error: null };
    } catch (error) {
      subscriptionLogger.error('Abonelik oluşturulurken beklenmeyen hata', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata',
        userId: insertData.user_id
      });
      
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }

  /**
   * Abonelik verisini ekler veya günceller (Upsert)
   * Mevcut kayıt varsa günceller, yoksa yeni bir kayıt oluşturur
   */
  static async upsertSubscription(
    upsertData: SubscriptionInsertData
  ): Promise<{ data: ISubscription | null, error: string | null }> {
    try {
      subscriptionLogger.debug('Abonelik verisi ekleniyor/güncelleniyor (Upsert)', { 
        userId: upsertData.user_id,
        planType: upsertData.plan_type
      });
      
      const result = await supabase
        .from('subscriptions')
        .upsert(upsertData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        })
        .select('*')
        .maybeSingle();
      
      if (result.error) {
        subscriptionLogger.error('Abonelik upsert işleminde Supabase hatası oluştu', {
          error: result.error, 
          userId: upsertData.user_id,
          errorMessage: result.error.message,
          errorCode: result.error.code
        });
        
        return {
          data: null,
          error: `${result.error.message} (Hata kodu: ${result.error.code})`
        };
      }
      
      if (!result.data) {
        // Upsert başarılı ama veri dönmediyse, kaydı tekrar alalım
        const getResult = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', upsertData.user_id)
          .maybeSingle();
          
        if (getResult.error || !getResult.data) {
          subscriptionLogger.warn('Upsert sonrası abonelik verisi alınamadı', {
            userId: upsertData.user_id,
            getError: getResult.error
          });
          
          return {
            data: null,
            error: 'Upsert işlemi tamamlandı ancak güncel veri alınamadı'
          };
        }
        
        const subscription = SubscriptionMapperService.mapDbResponseToSubscription(getResult.data);
        return { data: subscription, error: null };
      }
      
      const subscription = SubscriptionMapperService.mapDbResponseToSubscription(result.data);
      subscriptionLogger.info('Abonelik upsert işlemi başarılı', {
        userId: upsertData.user_id,
        subscriptionId: subscription.id
      });
      
      return { data: subscription, error: null };
    } catch (error) {
      subscriptionLogger.error('Abonelik upsert işleminde beklenmeyen hata', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata',
        userId: upsertData.user_id
      });
      
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
}
