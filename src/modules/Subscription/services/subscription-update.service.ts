
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
 * Abonelik ekleme işleminde kullanılan veri yapısı
 */
interface SubscriptionInsertData extends SubscriptionUpdateData {
  user_id: string;
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
      } else if (currentSubscription.success && currentSubscription.subscription) {
        // Deneme planı için mevcut trial_ends_at kullan
        periodEndDate = currentSubscription.subscription.trial_ends_at || now;
      } else {
        // Hiç kayıt yoksa ve deneme planı ise, 14 günlük deneme süresi ver
        periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + 14);
      }
      
      // Trial'dan ücretli plana geçiş veya ücretli plan güncelleme
      if (planType !== SubscriptionPlanType.TRIAL) {
        updateData.status = mapStatusToSupabase(SubscriptionStatus.ACTIVE);
        updateData.current_period_starts_at = now.toISOString();
        updateData.current_period_ends_at = periodEndDate.toISOString();
        
        // Eğer deneme süresi devam ediyorsa, deneme süresini sonlandır
        if (currentSubscription.success && 
            currentSubscription.subscription && 
            currentSubscription.subscription.status === SubscriptionStatus.TRIAL) {
          updateData.trial_ends_at = now.toISOString();
        }
      }
      
      subscriptionLogger.debug('Abonelik güncelleme verileri hazırlandı', {
        updateData,
        userId,
        subscriptionExists: currentSubscription.success && !!currentSubscription.subscription
      });
      
      let result;
      
      // Abonelik kaydı varsa güncelle, yoksa yeni kayıt oluştur
      if (currentSubscription.success && currentSubscription.subscription) {
        // Mevcut kaydı güncelle
        result = await supabase
          .from('subscriptions')
          .update(updateData)
          .eq('user_id', userId)
          .select('*')
          .single();
      } else {
        // Yeni kayıt oluştur
        subscriptionLogger.info('Abonelik kaydı bulunamadı, yeni kayıt oluşturuluyor', { userId });
        
        // Insert işlemi için veri hazırla
        const insertData: SubscriptionInsertData = {
          ...updateData,
          user_id: userId,
          // Deneme süresi için başlangıç ve bitiş tarihleri
          trial_starts_at: now.toISOString(),
          trial_ends_at: periodEndDate.toISOString(),
        };
        
        // Status değeri tanımlanmamış ise, deneme süresi olarak ayarla
        if (!insertData.status) {
          insertData.status = 'trial';
        }
        
        // Yeni kayıt ekle
        result = await supabase
          .from('subscriptions')
          .insert(insertData)
          .select('*')
          .single();
      }
      
      // Sonucu kontrol et
      const { data, error } = result;
      
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
          error: `${error.message} (Hata kodu: ${error.code})`
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
        periodEnd: updateData.current_period_ends_at,
        isNewSubscription: !(currentSubscription.success && currentSubscription.subscription)
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
        error: error instanceof Error 
          ? `Beklenmeyen hata: ${error.message}` 
          : 'Beklenmeyen bir hata oluştu'
      };
    }
  }
}
