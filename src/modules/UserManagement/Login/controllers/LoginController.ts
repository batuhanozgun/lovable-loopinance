
import { LoginService } from "../services/LoginService";
import { ILoginForm } from "../interfaces/ILoginForm";
import { LoginLogger } from "../logging/LoginLogger";
import { showLoginToast } from "../notifications/toastHelper";

export class LoginController {
  static async handleLogin({ email, password }: ILoginForm) {
    try {
      LoginLogger.debug("Login attempt started", { email });
      
      await LoginService.login(email, password);
      
      LoginLogger.info("User logged in successfully", { email });
      
      showLoginToast.success();
      
      return { success: true };
    } catch (error) {
      LoginLogger.error("Login failed", error, { email });
      
      showLoginToast.error(error instanceof Error ? error : new Error("Login failed"));
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }
}
