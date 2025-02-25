
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const logger = LoggerService.getInstance("SignupController");

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      logger.debug("Validating signup input", { email: formData.email });
      
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        logger.warn("Signup validation failed", { error: validationResult.error.issues[0] });
        return {
          success: false,
          error: validationResult.error.issues[0].message,
        };
      }

      logger.debug("Input validation successful, attempting signup");
      
      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      return signupResult;
    } catch (error) {
      logger.error("Unexpected error in signup controller", error);
      return {
        success: false,
        error: "Beklenmeyen bir hata oluştu / An unexpected error occurred",
      };
    }
  }
}
