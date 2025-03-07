
import { ISubscriptionQueryRepository } from "./interfaces/ISubscriptionQueryRepository";
import { ISubscriptionUpdateRepository } from "./interfaces/ISubscriptionUpdateRepository";
import { SubscriptionQueryRepository } from "./SubscriptionQueryRepository";
import { SubscriptionUpdateRepository } from "./SubscriptionUpdateRepository";

/**
 * Abonelik repository'lerini yöneten factory sınıfı
 */
export class SubscriptionRepositoryFactory {
  private static queryRepository: ISubscriptionQueryRepository | null = null;
  private static updateRepository: ISubscriptionUpdateRepository | null = null;

  /**
   * Query repository'si elde et
   */
  static getQueryRepository(): ISubscriptionQueryRepository {
    if (!this.queryRepository) {
      this.queryRepository = new SubscriptionQueryRepository();
    }
    return this.queryRepository;
  }

  /**
   * Update repository'si elde et
   */
  static getUpdateRepository(): ISubscriptionUpdateRepository {
    if (!this.updateRepository) {
      this.updateRepository = new SubscriptionUpdateRepository();
    }
    return this.updateRepository;
  }

  /**
   * Test amaçlı repository'leri sıfırla
   */
  static reset(): void {
    this.queryRepository = null;
    this.updateRepository = null;
  }
}
