
import { SignupService } from "../services/SignupService";
import { ISignupForm } from "../interfaces/ISignupForm";
import { SignupValidator } from "../validators/SignupValidator";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

const logger = LoggerService.getInstance("SignupController");

export class SignupController {
  static async handleSignup(formData: ISignupForm) {
    try {
      logger.debug("Starting signup process", { email: formData.email });
      
      // Form verilerini doğrula
      const validationResult = SignupValidator.validateSignupInput(formData);

      if (!validationResult.success) {
        const validationError = validationResult.error.issues[0];
        logger.warn("Signup validation failed", { error: validationError });
        
        toast({
          variant: "destructive",
          title: i18next.t("common:error"),
          description: validationError.message,
        });

        return {
          success: false,
          error: validationError.message,
        };
      }

      logger.debug("Input validation successful, checking if email exists");
      
      // Doğrudan kayıt işlemine geçiyoruz
      // Önceki e-posta kontrolünü kaldırdık çünkü SignupService.signUp metodu
      // zaten e-posta varlığını kontrol edecek

      logger.debug("Proceeding to signup directly");
      
      // Kayıt işlemini gerçekleştir
      const signupResult = await SignupService.signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      // Kayıt sonucunu bildiren toast göster
      if (!signupResult.success) {
        logger.warn("Signup failed", { error: signupResult.error, email: formData.email });
        
        toast({
          variant: "destructive",
          title: i18next.t("auth:signup.failed"),
          description: signupResult.error,
        });
        
        return signupResult;
      } else {
        logger.info("Signup successful", { email: formData.email });
        
        toast({
          title: i18next.t("common:success"),
          description: i18next.t("userManagement:errors.signupSuccessful"),
        });
        
        return signupResult;
      }
    } catch (error) {
      logger.error("Unexpected error in signup controller", error);
      
      toast({
        variant: "destructive",
        title: i18next.t("common:error"),
        description: i18next.t("errors:signupFailed"),
      });

      return {
        success: false,
        error: i18next.t("errors:signupFailed"),
      };
    }
  }
}
