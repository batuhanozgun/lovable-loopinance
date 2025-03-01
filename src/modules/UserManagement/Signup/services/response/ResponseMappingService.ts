
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IAuthResponse } from "../auth/interfaces/IAuthResponse";
import { IErrorResponse } from "../error/interfaces/IErrorResponse";
import { ISignupResponse } from "./interfaces/ISignupResponse";
import i18next from "i18next";

export class ResponseMappingService {
  private static logger = LoggerService.getInstance("ResponseMappingService");
  
  /**
   * Map authentication response to signup response
   */
  static mapAuthResponse(authResponse: IAuthResponse): ISignupResponse {
    if (!authResponse.success) {
      return this.mapErrorResponse(authResponse.error || "Unknown error");
    }
    
    this.logger.debug("Mapping successful auth response to signup response");
    return {
      success: true,
      user: authResponse.user,
      message: i18next.t("UserManagement.signup.messages:success.signup")
    };
  }
  
  /**
   * Map error string to error response
   */
  static mapErrorResponse(error: string): ISignupResponse {
    this.logger.debug("Mapping error to signup response", { error });
    
    // Map common error messages to internationalized responses
    if (error.includes("already registered") || error.includes("already exists")) {
      return {
        success: false,
        error: i18next.t("UserManagement.errors:emailAlreadyExists")
      };
    }
    
    if (error.includes("rate limit")) {
      return {
        success: false,
        error: i18next.t("UserManagement.errors:rateLimitExceeded")
      };
    }
    
    // Default error
    return {
      success: false,
      error: error || i18next.t("UserManagement.errors:signupFailed")
    };
  }
  
  /**
   * Create a success response
   */
  static createSuccessResponse(user: any): ISignupResponse {
    return {
      success: true,
      user,
      message: i18next.t("UserManagement.signup.messages:success.signup")
    };
  }
}
