
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";

export class SignupController {
  static async handleSignup({ email, password, firstName, lastName }: ISignupForm) {
    try {
      // Önce validasyon yapalım
      const validationResult = SignupValidator.validateSignupInput({ 
        email, 
        password, 
        firstName, 
        lastName 
      });

      if (!validationResult.success) {
        return {
          success: false,
          error: validationResult.error.message,
        };
      }

      // E-posta kontrolü yapalım
      const existingUser = await SignupService.checkExistingUser(email);
      
      if (existingUser) {
        return {
          success: false,
          error: "Bu e-posta adresi ile daha önce kayıt olunmuş.",
        };
      }

      // Kullanıcı kaydını yapalım
      const { data, error } = await SignupService.signUp(email, password, firstName, lastName);
      
      if (error) {
        console.error("Signup error:", error);
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
      console.error("SignupController error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Kayıt işlemi sırasında bir hata oluştu.",
      };
    }
  }
}
