
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class RateLimitService {
  private static logger = LoggerService.getInstance("RateLimitService");
  private static rateLimitMap = new Map<string, number[]>();
  
  /**
   * Check if an IP or identifier has exceeded rate limits
   */
  static isRateLimited(identifier: string, maxAttempts: number = 5, timeWindowMs: number = 60000): boolean {
    const now = Date.now();
    const attempts = this.rateLimitMap.get(identifier) || [];
    
    // Filter attempts to only include those within the time window
    const recentAttempts = attempts.filter(timestamp => now - timestamp < timeWindowMs);
    
    // Update the attempts list
    this.rateLimitMap.set(identifier, [...recentAttempts, now]);
    
    // Check if rate limited
    if (recentAttempts.length >= maxAttempts) {
      this.logger.warn(`Rate limit exceeded for ${identifier}`, { 
        attempts: recentAttempts.length + 1,
        timeWindow: timeWindowMs / 1000
      });
      return true;
    }
    
    return false;
  }
  
  /**
   * Clear rate limit data for an identifier
   */
  static clearRateLimit(identifier: string): void {
    this.rateLimitMap.delete(identifier);
    this.logger.debug(`Rate limit cleared for ${identifier}`);
  }
}
