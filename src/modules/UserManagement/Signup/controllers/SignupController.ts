
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

      const existingUserResult = await SignupService.checkExistingUser(formData.email);
      
      if (existingUserResult.exists) {
        return {
          success: false,
          error: "Bu e-posta adresi ile daha önce kayıt olunmuş / This email is already registered",
        };
      }

      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      if (!signupResult.success) {
        return {
          success: false,
          error: signupResult.error || "Kayıt işlemi sırasında bir hata oluştu / An error occurred during signup",
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("SignupController error:", error);
      return {
        success: false,
        error: "Beklenmeyen bir hata oluştu / An unexpected error occurred",
      };
    }
  }
}
