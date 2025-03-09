
import { SubscriptionPlanType, SubscriptionStatus } from "../types/ISubscription";
import { IUpdateSubscriptionResponse } from "../types/ISubscriptionResponse";
import { subscriptionLogger } from "../logging";
import { SubscriptionQueryService } from "./subscription-query.service";
import { SubscriptionDateService } from "./subscription-date.service";
import { SubscriptionStatusService } from "./subscription-status.service";
import { 
  SubscriptionRepositoryService, 
  SubscriptionUpdateData, 
  SubscriptionInsertData 
} from "./subscription-repository.service";

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
      
      // Şimdiki zaman
      const now = SubscriptionDateService.getCurrentDate();
      
      // Plan tipini Supabase formatına dönüştür
      const supabasePlanType = SubscriptionStatusService.mapPlanTypeToSupabase(planType);
      
      // Temel güncelleme verilerini hazırla
      const updateData: SubscriptionUpdateData = {
        plan_type: supabasePlanType,
        updated_at: now.toISOString()
      };
      
      // Plan tipine göre bitiş tarihini hesapla
      const periodEndDate = SubscriptionDateService.calculatePeriodEndDate(planType, now);
      
      // Ücretli planlarda durum ve tarih bilgilerini ayarla
      if (planType !== SubscriptionPlanType.TRIAL) {
        updateData.status = SubscriptionStatusService.mapStatusToSupabase(SubscriptionStatus.ACTIVE);
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
        result = await SubscriptionRepositoryService.updateSubscription(userId, updateData);
      } else {
        // Yeni kayıt için veri hazırla
        const trialStartDate = new Date(now);
        const trialEndDate = SubscriptionDateService.calculateTrialEndDate(trialStartDate);
        
        // Deneme süresi için başlangıç ve bitiş tarihleri
        const insertData: SubscriptionInsertData = {
          ...updateData,
          user_id: userId,
          trial_starts_at: trialStartDate.toISOString(),
          trial_ends_at: trialEndDate.toISOString()
        };
        
        // Status değeri tanımlanmamış ise, deneme süresi olarak ayarla
        if (!insertData.status) {
          insertData.status = 'trial';
        }
        
        // Yeni kayıt ekle
        result = await SubscriptionRepositoryService.createSubscription(insertData);
      }
      
      // İşlem sonucunu kontrol et
      if (result.error) {
        return {
          success: false,
          error: result.error
        };
      }
      
      if (!result.data) {
        return {
          success: false,
          error: 'İşlem sonucunda veri döndürülemedi'
        };
      }
      
      subscriptionLogger.info('Abonelik planı başarıyla güncellendi', { 
        userId, 
        newPlan: planType,
        periodEnd: updateData.current_period_ends_at,
        isNewSubscription: !(currentSubscription.success && currentSubscription.subscription)
      });
      
      return {
        success: true,
        updated: true,
        subscription: result.data
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
