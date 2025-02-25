
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import i18next from "i18next";

const logger = LoggerService.getInstance();

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
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
        logger.error("Signup error:", error);
        
        // Email already registered error
        if (error.message?.toLowerCase().includes('email already registered')) {
          return {
            success: false,
            error: i18next.t("auth.signup.validation.emailExists"),
          };
        }

        return {
          success: false,
          error: i18next.t("errors.signupFailed"),
        };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      logger.error("SignupService error:", error);
      return {
        success: false,
        error: i18next.t("errors.signupFailed"),
      };
    }
  }
}
