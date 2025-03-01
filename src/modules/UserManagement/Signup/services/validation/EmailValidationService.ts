import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ValidationLogger } from "../../logging/validation/ValidationLogger";
import i18next from "i18next";

export class EmailValidationService {
  private static logger = LoggerService.getInstance("EmailValidationService");
  private static validationLogger = new ValidationLogger();

  /**
   * Check if an email already exists in the system
   */
  static async checkEmailExists(email: string): Promise<{ 
    exists: boolean; 
    message?: string; 
    rateLimited?: boolean;
    notConfirmed?: boolean;
  }> {
    try {
      this.logger.debug("Checking if email already exists", { email });
      this.validationLogger.logEmailValidationAttempt(email);

      // Use Supabase's signUp method for checking - this is a workaround
      // since we don't have direct API to check email existence
      const { error } = await supabase.auth.signUp({
        email,
        password: `temporary-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      // Rate limiting check
      if (error && error.message.includes("rate limit")) {
        this.logger.warn("Rate limit exceeded when checking email", { email, error: error.message });
        this.validationLogger.logRateLimitExceeded(email);
        
        return { 
          exists: false, 
          rateLimited: true,
          message: i18next.t("UserManagement.errors:rateLimitExceeded") 
        };
      }

      // Email already exists check
      if (error && error.message.includes("already registered")) {
        this.logger.debug("Email already exists", { email, errorMessage: error.message });
        this.validationLogger.logEmailAlreadyExists(email);
        
        return { 
          exists: true, 
          message: i18next.t("UserManagement.errors:emailAlreadyExists")
        };
      }

      // Email is available
      if (!error) {
        this.logger.debug("Email check successful - email is available", { email });
        this.validationLogger.logEmailAvailable(email);
        
        return { exists: false };
      }

      // Other errors
      this.logger.warn("Unknown error during email check", { email, errorMessage: error.message });
      this.validationLogger.logEmailCheckError(email, error.message);
      
      return { 
        exists: false,
        message: i18next.t("UserManagement.errors:emailCheckFailed") 
      };
      
    } catch (error) {
      this.logger.error("Unexpected error while checking email existence", error);
      this.validationLogger.logEmailCheckException(email, error);
      
      return { 
        exists: false,
        message: i18next.t("UserManagement.errors:emailCheckFailed") 
      };
    }
  }
}
