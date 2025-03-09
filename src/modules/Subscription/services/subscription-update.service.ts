
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionPlanType, SubscriptionStatus } from "../types/ISubscription";
import { IUpdateSubscriptionResponse } from "../types/ISubscriptionResponse";
import { subscriptionLogger } from "../logging";
import { SubscriptionQueryService } from "./subscription-query.service";
import { SubscriptionMapperService } from "./subscription-mapper.service";
import { Database } from "@/integrations/supabase/types";

// Supabase'den plan tipi ve durumu için tip tanımları
type SupabasePlanType = Database["public"]["Enums"]["subscription_plan_type"];
type SupabaseStatus = Database["public"]["Enums"]["subscription_status"];

/**
 * Abonelik plan güncellemesinde kullanılan veri yapısı
 * (Supabase veritabanı tipleriyle uyumlu)
 */
interface SubscriptionUpdateData {
  plan_type: SupabasePlanType;
  status?: SupabaseStatus;
  updated_at: string;
  current_period_starts_at?: string | null;
  current_period_ends_at?: string | null;
  trial_ends_at?: string | null;
}

/**
 * Uygulama enum'larını Supabase string literal tiplerine dönüştüren yardımcı fonksiyonlar
 */
const mapPlanTypeToSupabase = (planType: SubscriptionPlanType): SupabasePlanType => {
  switch (planType) {
    case SubscriptionPlanType.TRIAL:
      return 'trial';
    case SubscriptionPlanType.MONTHLY:
      return 'monthly';
    case SubscriptionPlanType.YEARLY:
      return 'yearly';
    default:
      subscriptionLogger.error('Bilinmeyen plan tipi', { planType });
      return 'trial'; // Varsayılan olarak trial döndür
  }
};

const mapStatusToSupabase = (status: SubscriptionStatus): SupabaseStatus => {
  switch (status) {
    case SubscriptionStatus.TRIAL:
      return 'trial';
    case SubscriptionStatus.ACTIVE:
      return 'active';
    case SubscriptionStatus.EXPIRED:
      return 'expired';
    case SubscriptionStatus.CANCELED:
      return 'cancelled'; // Dikkat: Enum değeri 'CANCELED' iken Supabase'de 'cancelled'
    default:
      subscriptionLogger.error('Bilinmeyen durum', { status });
      return 'trial'; // Varsayılan olarak trial döndür
  }
};

/**
 * Abonelik güncelleme işlemlerini yöneten servis
 */
export class SubscriptionUpdateService {
  /**
   * Kullanıcının abonelik planını günceller
   */
  static async updateSubscriptionPlan(
    userId: string, 
    planType: SubscriptionPlanType,
    transactionId?: string
  ): Promise<IUpdateSubscriptionResponse> {
    try {
      subscriptionLogger.debug('Abonelik planı güncelleniyor', { userId, planType, transactionId });
      
      // Kullanıcının mevcut aboneliğini getir
      const currentSubscription = await SubscriptionQueryService.getUserSubscription(userId);
      
      if (!currentSubscription.success || !currentSubscription.subscription) {
        subscriptionLogger.error('Güncellenecek abonelik bulunamadı', { userId });
        return {
          success: false,
          error: 'Güncellenecek abonelik bulunamadı'
        };
      }
      
      // Tarih hesaplamaları için şimdiki zaman
      const now = new Date();
      
      // Plan tipini Supabase formatına dönüştür
      const supabasePlanType = mapPlanTypeToSupabase(planType);
      
      // Tip güvenliği için başlangıç ​​updateData nesnesi
      const updateData: SubscriptionUpdateData = {
        plan_type: supabasePlanType,
        updated_at: now.toISOString()
      };
      
      // Yeni bitiş tarihini hesapla
      let periodEndDate: Date;
      
      if (planType === SubscriptionPlanType.MONTHLY) {
        // Aylık plan için 30 gün ekle
        periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + 30);
      } else if (planType === SubscriptionPlanType.YEARLY) {
        // Yıllık plan için 365 gün ekle
        periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + 365);
      } else {
        // Deneme planı için mevcut trial_ends_at kullan
        periodEndDate = currentSubscription.subscription.trial_ends_at || now;
      }
      
      // Trial'dan ücretli plana geçiş veya ücretli plan güncelleme
      if (planType !== SubscriptionPlanType.TRIAL) {
        updateData.status = mapStatusToSupabase(SubscriptionStatus.ACTIVE);
        updateData.current_period_starts_at = now.toISOString();
        updateData.current_period_ends_at = periodEndDate.toISOString();
        
        // Eğer deneme süresi devam ediyorsa, deneme süresini sonlandır
        if (currentSubscription.subscription.status === SubscriptionStatus.TRIAL) {
          updateData.trial_ends_at = now.toISOString();
        }
      }
      
      subscriptionLogger.debug('Abonelik güncelleme verileri hazırlandı', {
        updateData,
        userId
      });
      
      // PUT istediği ile tüm veriyi güncelleyelim 
      // (PATCH işlemi JSONB hataları oluşturabiliyor)
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('user_id', userId)
        .select('*')
        .single();
      
      if (error) {
        subscriptionLogger.error('Abonelik güncellenirken Supabase hatası oluştu', {
          error, 
          userId,
          errorMessage: error.message,
          errorCode: error.code,
          details: error.details,
          hint: error.hint
        });
        return {
          success: false,
          error: error.message
        };
      }
      
      if (!data) {
        subscriptionLogger.error('Abonelik güncelleme sonucu boş', { userId });
        return {
          success: false,
          error: 'Güncelleme sonucu boş veri döndü'
        };
      }
      
      const updatedSubscription = SubscriptionMapperService.mapDbResponseToSubscription(data);
      subscriptionLogger.info('Abonelik planı başarıyla güncellendi', { 
        userId, 
        newPlan: planType,
        periodEnd: updateData.current_period_ends_at
      });
      
      return {
        success: true,
        updated: true,
        subscription: updatedSubscription
      };
    } catch (error) {
      subscriptionLogger.error('Abonelik planı güncellenirken beklenmeyen hata', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Bilinmeyen hata',
        userId
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
}
