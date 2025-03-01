
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class AuthLogger {
  private logger = LoggerService.getInstance("AuthEvents");
  
  /**
   * Log signup attempt
   */
  logSignupAttempt(email: string): void {
    this.logger.info("User attempting to sign up", { email });
  }
  
  /**
   * Log successful signup
   */
  logSignupSuccess(userId: string, email: string): void {
    this.logger.info("User signup successful", { userId, email });
  }
  
  /**
   * Log signup failure
   */
  logSignupFailure(email: string, reason: string): void {
    this.logger.warn("User signup failed", { email, reason });
  }
  
  /**
   * Log signup error
   */
  logSignupError(email: string, error: any): void {
    this.logger.error("Error during signup process", error, { email });
  }
}
