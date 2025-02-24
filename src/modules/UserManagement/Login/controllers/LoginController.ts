
import { LoginService } from "../services/LoginService";
import { ILoginForm } from "../interfaces/ILoginForm";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

export class LoginController {
  private static logger = LoggerService.getInstance();

  static async handleLogin({ email, password }: ILoginForm) {
    try {
      this.logger.debug("Giriş denemesi başlatıldı", { email });
      await LoginService.login(email, password);
      this.logger.info("Kullanıcı başarıyla giriş yaptı", { email });
      return { success: true };
    } catch (error) {
      this.logger.error("Giriş işlemi başarısız oldu", error, { email });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Giriş işlemi sırasında bir hata oluştu.",
      };
    }
  }
}
