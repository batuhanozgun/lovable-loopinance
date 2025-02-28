
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

  // E-posta kontrolü metodu - geliştirildi ve daha ayrıntılı hata mesajları eklendi
  static async checkEmailExists(email: string): Promise<{ exists: boolean; message?: string }> {
    try {
      logger.debug("Checking if email already exists", { email });

      // Supabase üzerinden e-posta kontrolü yapma
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false // Yeni kullanıcı oluşturulmasını önler
        }
      });

      // Cevabı kontrol et
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          // E-posta kayıtlı ama onaylanmamış
          logger.debug("Email exists but not confirmed", { email });
          return { 
            exists: true, 
            message: i18next.t("auth:signup.validation.emailExistsNotConfirmed")
          };
        } else if (error.message.includes("Invalid login credentials")) {
          // E-posta kayıtlı ve aktif
          logger.debug("Email exists and confirmed", { email });
          return { 
            exists: true, 
            message: i18next.t("errors:emailAlreadyExists")
          };
        } else {
          // Bilinmeyen bir hata oluştu
          logger.warn("Unknown error checking email existence", { error: error.message });
          return { exists: false };
        }
      }

      // Cevap data içeriyorsa, e-posta kayıtlı değil
      logger.debug("Email is available for signup", { email });
      return { exists: false };
      
    } catch (error) {
      logger.error("Unexpected error while checking email existence", error);
      return { exists: false };
    }
  }
}
