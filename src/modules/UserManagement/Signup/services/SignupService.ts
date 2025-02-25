
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import i18next from "i18next";

const logger = LoggerService.getInstance("SignupService");

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      logger.debug("Attempting to sign up user", { email, firstName, lastName });

      // Önce email kontrolü yapalım
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email)
        .single();

      if (existingUser) {
        logger.warn("Email already exists", { email });
        return {
          success: false,
          error: i18next.t("auth.signup.validation.emailExists"),
        };
      }

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

      if (error) {
        logger.error("Signup failed", error, { email });
        
        // Email already registered error - Supabase spesifik hata kontrolü
        if (error.message?.toLowerCase().includes('email already registered')) {
          return {
            success: false,
            error: i18next.t("auth.signup.validation.emailExists"),
          };
        }

        // Diğer hata durumları için genel mesaj
        return {
          success: false,
          error: i18next.t("errors.signupFailed"),
        };
      }

      logger.info("User signed up successfully", { userId: data.user?.id });
      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      logger.error("Unexpected error during signup", error);
      return {
        success: false,
        error: i18next.t("errors.signupFailed"),
      };
    }
  }
}
