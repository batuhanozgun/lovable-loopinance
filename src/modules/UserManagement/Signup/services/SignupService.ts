
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { AuthenticationService } from "./auth/AuthenticationService";
import { ErrorHandlingService } from "./error/ErrorHandlingService";
import { ResponseMappingService } from "./response/ResponseMappingService";
import { AuthLogger } from "../logging/auth/AuthLogger";
import { AuthToasts } from "../notifications/auth/AuthToasts";

const logger = LoggerService.getInstance("SignupService");
const authLogger = new AuthLogger();

export class SignupService {
  /**
   * Handle user signup with email and password
   */
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      logger.debug("Orchestrating signup process", { email, firstName, lastName });
      authLogger.logSignupAttempt(email);

      // Perform authentication
      const authResult = await AuthenticationService.signUpWithEmailPassword(
        email, 
        password, 
        { firstName, lastName }
      );
      
      // Log results
      if (authResult.success) {
        authLogger.logSignupSuccess(authResult.user.id, email);
      } else {
        authLogger.logSignupFailure(email, authResult.error || "Unknown reason");
      }
      
      // Show appropriate toast notifications
      if (authResult.success) {
        AuthToasts.showSignupSuccess();
      } else if (authResult.error?.includes("already registered")) {
        AuthToasts.showEmailExistsError();
      } else if (authResult.error?.includes("rate limit")) {
        AuthToasts.showRateLimitError();
      } else {
        AuthToasts.showSignupError(authResult.error);
      }
      
      // Map response
      return ResponseMappingService.mapAuthResponse(authResult);
      
    } catch (error) {
      // Handle unexpected errors
      logger.error("Unexpected error during signup", error);
      authLogger.logSignupError(email, error);
      AuthToasts.showSignupError(error instanceof Error ? error : new Error("Signup failed"));
      
      // Return error response
      const errorResponse = ErrorHandlingService.handleSystemError(error);
      return {
        success: false,
        error: errorResponse.error
      };
    }
  }
}
