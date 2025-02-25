
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

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
            error: "Bu e-posta adresi ile daha önce kayıt olunmuş / This email is already registered",
          };
        }

        return {
          success: false,
          error: error.message,
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
        error: "Servis hatası / Service error",
      };
    }
  }
}
