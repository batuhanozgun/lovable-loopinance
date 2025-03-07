
import { LoginService } from "../services/LoginService";
import { ILoginForm } from "../interfaces/ILoginForm";
import { loginLogger } from "../../logging";
import { showLoginToast } from "../notifications/toastHelper";

export class LoginController {
  static async handleLogin({ email, password }: ILoginForm) {
    try {
      loginLogger.debug("Login attempt started", { email });
      
      await LoginService.login(email, password);
      
      loginLogger.info("User logged in successfully", { email });
      
      showLoginToast.success();
      
      return { success: true };
    } catch (error) {
      loginLogger.error("Login failed", error, { email });
      
      showLoginToast.error(error instanceof Error ? error : new Error("Login failed"));
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }
}
