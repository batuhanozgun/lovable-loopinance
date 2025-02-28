
import { AuthService } from "../../common/services/AuthService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IOAuthConfig } from "../interfaces/IOAuthConfig";
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";
import { useLocation } from "react-router-dom";

export class OAuthController {
  private static logger = LoggerService.getInstance("OAuthController");

  static async handleGoogleSignIn() {
    try {
      this.logger.debug("Google sign in process started");
      
      const result = await AuthService.signInWithGoogle();
      
      if (!result || !result.url) {
        throw new Error(i18next.t("modules:UserManagement.oauth.errors.noUrl"));
      }
      
      this.logger.debug("Google sign in URL obtained, redirecting", { url: result.url });
      
      // URL'ye yönlendirme yapılıyor
      window.location.href = result.url;
      
      return { success: true };
    } catch (error) {
      this.logger.error("Google sign in process failed", error);
      
      // Determine if we're on signup or login page for correct error message
      const isSignupPage = window.location.pathname.includes('signup');
      const errorKey = isSignupPage ? "modules:UserManagement.oauth.errors.signup" : "modules:UserManagement.oauth.errors.login";
      
      toast({
        variant: "destructive",
        title: i18next.t("common:error"),
        description: error instanceof Error ? error.message : i18next.t(errorKey),
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : i18next.t(errorKey),
      };
    }
  }
}
