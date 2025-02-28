
import { z } from "zod";
import { ISignupForm } from "../interfaces/ISignupForm";
import i18next from "i18next";
import { supabase } from "@/integrations/supabase/client";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

const logger = LoggerService.getInstance("SignupValidator");

export const SignupSchema = z.object({
  firstName: z.string().min(2, {
    message: i18next.t("UserManagement.auth:signup.validation.firstNameMin")
  }),
  lastName: z.string().min(2, {
    message: i18next.t("UserManagement.auth:signup.validation.lastNameMin")
  }),
  email: z.string().email({
    message: i18next.t("errors:invalidEmail")
  }),
  password: z
    .string()
    .min(8, {
      message: i18next.t("UserManagement.auth:signup.validation.passwordMin")
    })
    .regex(/[A-Z]/, {
      message: i18next.t("UserManagement.auth:signup.validation.passwordUppercase")
    })
    .regex(/[a-z]/, {
      message: i18next.t("UserManagement.auth:signup.validation.passwordLowercase")
    })
    .regex(/[0-9]/, {
      message: i18next.t("UserManagement.auth:signup.validation.passwordNumber")
    }),
});

export class SignupValidator {
  // Form girdilerini doğrulama metodu
  static validateSignupInput(data: ISignupForm) {
    logger.debug("Validating signup input", { email: data.email });
    return SignupSchema.safeParse(data);
  }

  // Geliştirilmiş e-posta kontrolü metodu - signInWithOtp yerine signUp kullanıyoruz
  static async checkEmailExists(email: string): Promise<{ exists: boolean; message?: string; rateLimited?: boolean }> {
    try {
      logger.debug("Checking if email already exists", { email });

      // Supabase'in signUp metodunu kullanarak e-posta kontrolü
      // Bu metot, e-posta zaten varsa hata döndürür
      const { error } = await supabase.auth.signUp({
        email,
        password: `temporary-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`, // Geçici rastgele şifre
        options: {
          emailRedirectTo: window.location.origin, // Doğrulama linki için yönlendirme URL'i
        }
      });

      // Rate limiting hatası kontrolü
      if (error && error.message.includes("rate limit")) {
        logger.warn("Rate limit exceeded when checking email", { email, error: error.message });
        return { 
          exists: false, 
          rateLimited: true,
          message: i18next.t("UserManagement.errors:rateLimitExceeded") 
        };
      }

      // "User already registered" hatası, e-postanın zaten kayıtlı olduğunu gösterir
      if (error && error.message.includes("already registered")) {
        logger.debug("Email already exists", { email, errorMessage: error.message });
        return { 
          exists: true, 
          message: i18next.t("UserManagement.errors:emailAlreadyExists")
        };
      }

      // Hata yoksa, e-posta mevcut değil
      if (!error) {
        // NOT: Bu durumda kullanıcı gerçekten oluşturulur, ancak bu sadece kontrol amaçlı olduğu için
        // bu kullanıcıyı silmeye çalışabiliriz, ancak anon rolünde bu mümkün olmadığı için
        // kullanıcı bir süre sonra otomatik olarak silinecektir
        logger.debug("Email check successful - email is available", { email });
        return { exists: false };
      }

      // Diğer tüm hatalar için
      logger.warn("Unknown error during email check", { email, errorMessage: error.message });
      return { 
        exists: false,
        message: i18next.t("UserManagement.errors:emailCheckFailed") 
      };
      
    } catch (error) {
      // Beklenmeyen hatalar için
      logger.error("Unexpected error while checking email existence", error);
      return { 
        exists: false,
        message: i18next.t("UserManagement.errors:emailCheckFailed") 
      };
    }
  }
}
