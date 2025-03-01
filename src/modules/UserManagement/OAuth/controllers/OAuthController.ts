
import { AuthService } from "../../common/services/AuthService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { showOAuthToast } from "../helpers/toastHelper";

export class OAuthController {
  private static logger = LoggerService.getInstance("OAuthController");

  static async handleGoogleSignIn() {
    try {
      this.logger.debug("Google sign in process started");
      
      const result = await AuthService.signInWithGoogle();
      
      if (!result || !result.url) {
        showOAuthToast.noUrl();
        throw new Error("Could not get Google sign in URL");
      }
      
      this.logger.debug("Google sign in URL obtained, redirecting", { url: result.url });
      
      // URL'ye yönlendirme yapılıyor
      window.location.href = result.url;
      
      return { success: true };
    } catch (error) {
      this.logger.error("Google sign in process failed", error);
      
      // Determine if we're on signup or login page for correct error message
      const isSignupPage = window.location.pathname.includes('signup');
      
      showOAuthToast.error(
        error instanceof Error ? error : undefined,
        isSignupPage
      );
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "OAuth process failed",
      };
    }
  }
}
