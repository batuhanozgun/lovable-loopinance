
import { LoggerService } from "@/modules/Logging/services/LoggerService";

/**
 * Abonelik işlemleri için loglama servisi
 */
export class SubscriptionLoggerService {
  private static loggers: Record<string, LoggerService> = {};
  
  /**
   * Belirtilen bileşen için logger alır
   */
  static getLogger(component: string): LoggerService {
    if (!this.loggers[component]) {
      this.loggers[component] = LoggerService.getInstance(component);
    }
    return this.loggers[component];
  }
}
