
import { ISubscription } from "../../interfaces/subscription/ISubscription";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class SubscriptionCacheService {
  private static instance: SubscriptionCacheService;
  private logger = LoggerService.getInstance("SubscriptionCacheService");
  private CACHE_TTL = 2 * 60 * 1000; // 2 dakika
  private subscriptionCache: {
    data: ISubscription | null;
    timestamp: number;
  } | null = null;

  private constructor() {}

  /**
   * Singleton instance
   */
  static getInstance(): SubscriptionCacheService {
    if (!this.instance) {
      this.instance = new SubscriptionCacheService();
    }
    return this.instance;
  }

  /**
   * Cache'i temizler
   */
  clearCache(): void {
    this.logger.debug("Abonelik önbelleği temizleniyor");
    this.subscriptionCache = null;
  }

  /**
   * Cache'den abonelik bilgilerini alır
   */
  getSubscriptionCache(): ISubscription | null {
    const now = Date.now();
    if (
      this.subscriptionCache && 
      this.subscriptionCache.data && 
      now - this.subscriptionCache.timestamp < this.CACHE_TTL
    ) {
      return this.subscriptionCache.data;
    }
    return null;
  }

  /**
   * Cache'e abonelik bilgilerini kaydeder
   */
  setSubscriptionCache(data: ISubscription | null): void {
    this.subscriptionCache = {
      data,
      timestamp: Date.now()
    };
  }

  /**
   * Cache durumunu kontrol eder
   */
  isCacheValid(): boolean {
    const now = Date.now();
    return !!(
      this.subscriptionCache && 
      this.subscriptionCache.data && 
      now - this.subscriptionCache.timestamp < this.CACHE_TTL
    );
  }

  /**
   * TTL süresini günceller
   */
  setCacheTTL(milliseconds: number): void {
    this.CACHE_TTL = milliseconds;
  }
}
