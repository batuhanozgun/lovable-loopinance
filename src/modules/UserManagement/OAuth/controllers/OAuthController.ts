
import { AuthService } from "../../common/services/AuthService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { IOAuthConfig } from "../interfaces/IOAuthConfig";
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class OAuthController {
  private static logger = LoggerService.getInstance("OAuthController");

  static async handleGoogleSignIn() {
    try {
      this.logger.debug("Google oturum açma işlemi başlatılıyor");
      
      const result = await AuthService.signInWithGoogle();
      
      if (!result || !result.url) {
        throw new Error("Google oturum açma URL'si alınamadı");
      }
      
      this.logger.debug("Google oturum açma URL'si alındı, yönlendiriliyor", { url: result.url });
      
      // URL'ye yönlendirme yapılıyor
      window.location.href = result.url;
      
      return { success: true };
    } catch (error) {
      this.logger.error("Google oturum açma işlemi başarısız oldu", error);
      
      toast({
        variant: "destructive",
        title: i18next.t("common:error"),
        description: error instanceof Error ? error.message : i18next.t("errors:loginFailed"),
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : i18next.t("errors:loginFailed"),
      };
    }
  }
}
