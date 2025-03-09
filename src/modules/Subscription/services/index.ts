
// Tüm abonelik servislerini dışa aktar
export { SubscriptionQueryService } from './subscription-query.service';
export { SubscriptionSummaryService } from './subscription-summary.service';
export { SubscriptionUpdateService } from './subscription-update.service';
export { SubscriptionMapperService } from './subscription-mapper.service';

// İşlevsel uyumluluk için eski servis sınıfını da oluştur
import { SubscriptionQueryService } from './subscription-query.service';
import { SubscriptionSummaryService } from './subscription-summary.service';
import { SubscriptionUpdateService } from './subscription-update.service';
import { SubscriptionMapperService } from './subscription-mapper.service';
import { 
  ISubscription, 
  ISubscriptionSummary, 
  SubscriptionStatus, 
  SubscriptionPlanType 
} from "../types/ISubscription";
import { 
  ISubscriptionResponse, 
  ISubscriptionListResponse, 
  IUpdateSubscriptionResponse 
} from "../types/ISubscriptionResponse";

/**
 * Eski abonelik servisini yeni servislere yönlendiren sınıf
 * Geriye dönük uyumluluk sağlamak için mevcut
 */
export class SubscriptionService {
  static async getUserSubscription(userId: string): Promise<ISubscriptionResponse> {
    return SubscriptionQueryService.getUserSubscription(userId);
  }
  
  static async getSubscriptionSummary(userId: string): Promise<ISubscriptionSummary | null> {
    return SubscriptionSummaryService.getSubscriptionSummary(userId);
  }
  
  static async updateSubscriptionPlan(
    userId: string, 
    planType: SubscriptionPlanType
  ): Promise<IUpdateSubscriptionResponse> {
    return SubscriptionUpdateService.updateSubscriptionPlan(userId, planType);
  }
  
  static mapDbResponseToSubscription(data: any): ISubscription {
    return SubscriptionMapperService.mapDbResponseToSubscription(data);
  }
}
