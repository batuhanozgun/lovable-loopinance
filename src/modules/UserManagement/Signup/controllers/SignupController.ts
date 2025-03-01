
import { AuthenticationService } from "../../auth";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ValidationToasts } from "../notifications/validation/ValidationToasts";
import { AuthToasts } from "../notifications/auth/AuthToasts";

const logger = LoggerService.getInstance("SignupController");

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      logger.debug("Starting signup process", { email: formData.email });
      
      // Validate form data
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        const validationError = validationResult.error.issues[0];
        logger.warn("Signup validation failed", { error: validationError });
        
        // Show validation error toast
        ValidationToasts.showFormValidationError(validationError.message);

        return {
          success: false,
          error: validationError.message,
        };
      }

      logger.debug("Input validation successful, proceeding to signup");
      
      // Perform signup using AuthenticationService
      const signupResult = await AuthenticationService.signUpWithEmailPassword(
        formData.email,
        formData.password,
        {
          firstName: formData.firstName,
          lastName: formData.lastName
        }
      );
      
      // Show appropriate toast notifications
      if (signupResult.success) {
        AuthToasts.showSignupSuccess();
      } else if (signupResult.error?.includes("already registered")) {
        AuthToasts.showEmailExistsError();
      } else if (signupResult.error?.includes("rate limit")) {
        AuthToasts.showRateLimitError();
      } else {
        AuthToasts.showSignupError(signupResult.error);
      }
      
      // Return signup result
      return signupResult;
      
    } catch (error) {
      logger.error("Unexpected error in signup controller", error);
      
      // Show error toast
      ValidationToasts.showFormValidationError(
        error instanceof Error ? error.message : "Signup failed"
      );

      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  }
}
