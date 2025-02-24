
import { LoginService } from "../services/LoginService";
import { ILoginForm } from "../interfaces/ILoginForm";

export class LoginController {
  static async handleLogin({ email, password }: ILoginForm) {
    try {
      await LoginService.login(email, password);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Giriş işlemi sırasında bir hata oluştu.",
      };
    }
  }
}
