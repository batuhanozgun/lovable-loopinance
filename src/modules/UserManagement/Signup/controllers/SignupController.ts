
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        return {
          success: false,
          error: validationResult.error.issues[0].message,
        };
      }

      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      return signupResult;
    } catch (error) {
      console.error("SignupController error:", error);
      return {
        success: false,
        error: "Beklenmeyen bir hata oluştu / An unexpected error occurred",
      };
    }
  }
}
