
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";

export class SignupController {
  static async handleSignup({ email, password, firstName, lastName }: ISignupForm) {
    try {
      const { data, error } = await SignupService.signUp(email, password, firstName, lastName);
      
      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data?.user) {
        return {
          success: false,
          error: "Kullanıcı oluşturulamadı. Lütfen daha sonra tekrar deneyin.",
        };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Kayıt işlemi sırasında bir hata oluştu.",
      };
    }
  }
}
