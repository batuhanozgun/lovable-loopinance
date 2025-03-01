
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import i18next from "i18next";
import { IErrorResponse } from "./interfaces/IErrorResponse";

export class ErrorHandlingService {
  private static logger = LoggerService.getInstance("ErrorHandlingService");
  
  /**
   * Handle authentication errors
   */
  static handleAuthError(error: any): IErrorResponse {
    this.logger.error("Authentication error", error);
    
    // Check for specific error types
    if (typeof error === 'string') {
      if (error.includes("already registered")) {
        return {
          success: false,
          error: i18next.t("UserManagement.errors:emailAlreadyExists"),
          code: "AUTH_EMAIL_EXISTS"
        };
      }
      
      if (error.includes("rate limit")) {
        return {
          success: false,
          error: i18next.t("UserManagement.errors:rateLimitExceeded"),
          code: "AUTH_RATE_LIMITED"
        };
      }
    }
    
    // Handle Error objects
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        code: "AUTH_ERROR",
        details: { name: error.name, stack: error.stack }
      };
    }
    
    // Generic error handling
    return {
      success: false,
      error: i18next.t("UserManagement.errors:signupFailed"),
      code: "AUTH_UNKNOWN_ERROR"
    };
  }
  
  /**
   * Handle validation errors
   */
  static handleValidationError(error: any): IErrorResponse {
    this.logger.error("Validation error", error);
    
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        code: "VALIDATION_ERROR"
      };
    }
    
    return {
      success: false,
      error: i18next.t("errors:validation.invalidInput"),
      code: "VALIDATION_UNKNOWN_ERROR"
    };
  }
  
  /**
   * Handle system or unexpected errors
   */
  static handleSystemError(error: any): IErrorResponse {
    this.logger.error("System error", error);
    
    if (error instanceof Error) {
      return {
        success: false,
        error: i18next.t("errors:general"),
        code: "SYSTEM_ERROR",
        details: { name: error.name, message: error.message }
      };
    }
    
    return {
      success: false,
      error: i18next.t("errors:general"),
      code: "SYSTEM_UNKNOWN_ERROR"
    };
  }
}
