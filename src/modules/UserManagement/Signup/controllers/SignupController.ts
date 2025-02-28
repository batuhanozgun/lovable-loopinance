
import { SignupService } from "../services/SignupService";
import { SignupFormData, SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class SignupController {
  private static logger = LoggerService.getInstance("SignupController");

  static async handleSignup(formData: SignupFormData) {
    try {
      this.logger.debug("Kayıt işlemi başlatılıyor", { email: formData.email });
      
      // Form verilerini doğrulama
      await SignupValidator.parseAsync(formData);
      
      // Doğrulama başarılı, kaydı gerçekleştir
      await SignupService.register(formData);
      
      this.logger.info("Kullanıcı başarıyla kaydedildi", { email: formData.email });
      
      toast({
        title: i18next.t("common:success"),
        description: i18next.t("auth:signup.success"),
      });
      
      return { success: true };
    } catch (error: any) {
      this.logger.error("Kayıt işlemi başarısız", error, { email: formData.email });
      
      // Hata türüne göre uygun mesajı belirle
      let errorMessage = i18next.t("errors:signupFailed");
      
      // Zod validation hatası
      if (error.errors && Array.isArray(error.errors)) {
        const firstError = error.errors[0];
        if (firstError && firstError.message) {
          errorMessage = i18next.t(firstError.message);
        }
      } 
      // Supabase hataları
      else if (error.message) {
        // E-posta zaten kayıtlı hatası
        if (error.message.includes("Email already registered")) {
          errorMessage = i18next.t("errors:emailAlreadyExists");
        } 
        // Ağ hatası
        else if (error.message.includes("network")) {
          errorMessage = i18next.t("errors:networkError");
        }
        // Diğer spesifik hatalar
        else if (error.message === i18next.t("errors:emailCheckFailed")) {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: i18next.t("common:error"),
        description: errorMessage,
      });
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
