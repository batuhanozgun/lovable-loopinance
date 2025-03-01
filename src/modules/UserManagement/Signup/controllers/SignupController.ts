
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { showSignupToast } from "../helpers/toastHelper";

const logger = LoggerService.getInstance("SignupController");

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      logger.debug("Starting signup process", { email: formData.email });
      
      // Form verilerini doğrula
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        const validationError = validationResult.error.issues[0];
        logger.warn("Signup validation failed", { error: validationError });
        
        showSignupToast.error(new Error(validationError.message));

        return {
          success: false,
          error: validationError.message,
        };
      }

      logger.debug("Input validation successful, proceeding to signup");
      
      // Kayıt işlemini gerçekleştir
      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      // Kayıt sonucunu bildiren toast göster
      if (!signupResult.success) {
        logger.warn("Signup failed", { error: signupResult.error, email: formData.email });
        
        showSignupToast.error(new Error(signupResult.error));
        
        return signupResult;
      } else {
        logger.info("Signup successful", { email: formData.email });
        
        showSignupToast.success();
        
        return signupResult;
      }
    } catch (error) {
      logger.error("Unexpected error in signup controller", error);
      
      showSignupToast.error(error instanceof Error ? error : new Error("Signup failed"));

      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  }
}
