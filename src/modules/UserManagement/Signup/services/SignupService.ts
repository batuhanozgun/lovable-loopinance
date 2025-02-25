
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import i18next from "i18next";

const logger = LoggerService.getInstance("SignupService");

export class SignupService {
  static async signUp(email: string, password: string, firstName: string, lastName: string) {
    try {
      logger.debug("Attempting to sign up user", { email, firstName, lastName });

      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email)
        .single();

      if (existingUser) {
        logger.warn("Signup attempt for existing user", { email });
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

      logger.debug("Supabase signup response received", { 
        hasError: !!error, 
        hasUser: !!data?.user,
        errorMessage: error?.message
      });

      if (error) {
        logger.error("Signup error from Supabase", error, { email });
        
        if (error.message?.toLowerCase().includes('already registered')) {
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

      if (!data.user) {
        logger.warn("Signup failed - no user returned from Supabase", { email });
        return {
          success: false,
          error: i18next.t("auth.signup.validation.emailExists"),
        };
      }

      if (data.user.identities?.length === 0) {
        logger.warn("Signup failed - user exists (identities check)", { email });
        return {
          success: false,
          error: i18next.t("auth.signup.validation.emailExists"),
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
        error: i18next.t("errors.signupFailed"),
      };
    }
  }
}
