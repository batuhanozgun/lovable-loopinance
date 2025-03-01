
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class ValidationLogger {
  private logger = LoggerService.getInstance("ValidationEvents");
  
  /**
   * Log email validation attempt
   */
  logEmailValidationAttempt(email: string): void {
    this.logger.debug("Validating email existence", { email });
  }
  
  /**
   * Log when email already exists
   */
  logEmailAlreadyExists(email: string): void {
    this.logger.info("Email already exists in system", { email });
  }
  
  /**
   * Log when email is available
   */
  logEmailAvailable(email: string): void {
    this.logger.debug("Email is available for registration", { email });
  }
  
  /**
   * Log when rate limit is exceeded
   */
  logRateLimitExceeded(email: string): void {
    this.logger.warn("Rate limit exceeded during email validation", { email });
  }
  
  /**
   * Log error during email check
   */
  logEmailCheckError(email: string, errorMessage: string): void {
    this.logger.warn("Error checking email existence", { email, errorMessage });
  }
  
  /**
   * Log exception during email check
   */
  logEmailCheckException(email: string, error: any): void {
    this.logger.error("Exception during email validation", error, { email });
  }
}
