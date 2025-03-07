
import { ISubscription } from "../../types/ISubscription";

/**
 * Veritabanı verilerini domain modellerine dönüştürme servisi
 */
export class SubscriptionDataMapper {
  /**
   * Veritabanından gelen abonelik verisini domain modeline dönüştür
   */
  static mapToDomainModel(data: any): ISubscription {
    return data as ISubscription;
  }
}
