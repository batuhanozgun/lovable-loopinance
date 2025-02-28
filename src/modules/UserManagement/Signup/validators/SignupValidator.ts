
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";
import i18next from "i18next";
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const logger = LoggerService.getInstance("SignupValidator");

export const SignupSchema = z.object({
  firstName: z.string().min(2, {
    message: i18next.t("auth:signup.validation.firstNameMin")
  }),
  lastName: z.string().min(2, {
    message: i18next.t("auth:signup.validation.lastNameMin")
  }),
  email: z.string().email({
    message: i18next.t("errors:invalidEmail")
  }),
  password: z
    .string()
    .min(8, {
      message: i18next.t("auth:signup.validation.passwordMin")
    })
    .regex(/[A-Z]/, {
      message: i18next.t("auth:signup.validation.passwordUppercase")
    })
    .regex(/[a-z]/, {
      message: i18next.t("auth:signup.validation.passwordLowercase")
    })
    .regex(/[0-9]/, {
      message: i18next.t("auth:signup.validation.passwordNumber")
    }),
});

export class SignupValidator {
  // Form girdilerini doğrulama metodu
  static validateSignupInput(data: ISignupForm) {
    logger.debug("Validating signup input", { email: data.email });
    return SignupSchema.safeParse(data);
  }

  // Geliştirilmiş e-posta kontrolü metodu
  static async checkEmailExists(email: string): Promise<{ exists: boolean; message?: string; rateLimited?: boolean }> {
    try {
      logger.debug("Checking if email already exists", { email });

      // Supabase üzerinden e-posta kontrolü - sadece varlık kontrolü için OTP kullanıyoruz
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false // Yeni kullanıcı oluşturulmasını önler
        }
      });

      // Rate limiting hatası kontrolü
      if (error && error.message.includes("rate limit")) {
        logger.warn("Rate limit exceeded when checking email", { email, error: error.message });
        return { 
          exists: false, 
          rateLimited: true,
          message: i18next.t("errors:rateLimitExceeded") 
        };
      }

      // E-posta zaten kayıtlı mı kontrolü - Başarılı OTP yanıtına rağmen kullanıcı kaydı mevcut olabilir
      if (!error && data) {
        // Supabase başarılı bir yanıt verdiğinde, e-posta kayıtlı değil demektir
        logger.debug("Email check successful - email is available", { email });
        return { exists: false };
      }

      // Hata varsa, hatanın türüne göre değerlendirme yapalım
      if (error) {
        // "Invalid login credentials" hatası, kullanıcının mevcut olduğunu gösterir
        if (error.message.includes("Email not confirmed") || 
            error.message.includes("Invalid login credentials")) {
          logger.debug("Email already exists", { email, errorMessage: error.message });
          return { 
            exists: true, 
            message: i18next.t("errors:emailAlreadyExists")
          };
        }

        // Diğer hata türleri için
        logger.warn("Unknown error during email check", { email, errorMessage: error.message });
        return { 
          exists: false,
          message: i18next.t("errors:emailCheckFailed") 
        };
      }

      // Varsayılan olarak, hata yoksa e-posta kullanılabilir olarak kabul edilir
      return { exists: false };
      
    } catch (error) {
      // Beklenmeyen hatalar için
      logger.error("Unexpected error while checking email existence", error);
      return { 
        exists: false,
        message: i18next.t("errors:emailCheckFailed") 
      };
    }
  }
}
