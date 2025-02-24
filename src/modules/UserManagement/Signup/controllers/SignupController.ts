
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";

export class SignupController {
  static async handleSignup({ email, password }: ISignupForm) {
    try {
      await SignupService.signUp(email, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Kayıt işlemi sırasında bir hata oluştu.",
      };
    }
  }
}
