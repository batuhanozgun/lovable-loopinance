
import { LoginService } from "../services/LoginService";
import { ILoginForm } from "../interfaces/ILoginForm";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { showLoginToast } from "../helpers/toastHelper";

export class LoginController {
  private static logger = LoggerService.getInstance("LoginController");

  static async handleLogin({ email, password }: ILoginForm) {
    try {
      this.logger.debug("Login attempt started", { email });
      
      await LoginService.login(email, password);
      
      this.logger.info("User logged in successfully", { email });
      
      showLoginToast.success();
      
      return { success: true };
    } catch (error) {
      this.logger.error("Login failed", error, { email });
      
      showLoginToast.error(error instanceof Error ? error : new Error("Login failed"));
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }
}
