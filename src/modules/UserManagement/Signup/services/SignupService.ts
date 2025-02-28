
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import i18next from "i18next";

const logger = LoggerService.getInstance("SignupService");

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      logger.debug("Attempting to sign up user", { email, firstName, lastName });

      // Kayıt işlemini gerçekleştir
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      logger.debug("Supabase signup response received", { 
        hasError: !!error, 
        hasUser: !!data?.user,
        errorMessage: error?.message
      });

      // Önemli: Tekrarlanan kayıt durumu için kontrol
      // auth_event.action === "user_repeated_signup" olduğu durumlar
      // Supabase bu durumda hata dönmez, ancak response içinde ipuçları vardır
      
      // 1. Kullanıcı yoksa veya identities dizisi boşsa, bu bir ipucudur
      if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
        logger.warn("Possible repeated signup detected - empty identities", { email });
        return {
          success: false,
          error: i18next.t("userManagement:errors.emailAlreadyExists"),
        };
      }
      
      // 2. Kullanıcı verisi var ama session oluşmadıysa, bu kullanıcı zaten var demektir
      if (data?.user && !data.session) {
        logger.warn("Possible repeated signup detected - no session created", { email, userId: data.user.id });
        return {
          success: false,
          error: i18next.t("userManagement:errors.emailAlreadyExists"),
        };
      }

      // E-posta zaten kayıtlı hata kontrolü
      if (error && error.message.includes("already registered")) {
        logger.warn("Email already registered", { email, error: error.message });
        return {
          success: false,
          error: i18next.t("userManagement:errors.emailAlreadyExists"),
        };
      }

      // Rate limiting hatası kontrolü
      if (error && error.message.includes("rate limit")) {
        logger.warn("Rate limit exceeded during signup", { email, error: error.message });
        return {
          success: false,
          error: i18next.t("userManagement:errors.rateLimitExceeded"),
        };
      }

      // Diğer hata türleri için kontrol
      if (error) {
        logger.error("Signup error from Supabase", error, { email });
        return {
          success: false,
          error: i18next.t("userManagement:errors.signupFailed"),
        };
      }

      // Kullanıcı verisi kontrolü
      if (!data.user) {
        logger.warn("Signup failed - no user returned from Supabase", { email });
        return {
          success: false,
          error: i18next.t("userManagement:errors.signupFailed"),
        };
      }

      logger.info("User signup successful", { 
        userId: data.user.id,
        email: data.user.email 
      });

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      logger.error("Unexpected error during signup", error);
      return {
        success: false,
        error: i18next.t("userManagement:errors.signupFailed"),
      };
    }
  }
}
