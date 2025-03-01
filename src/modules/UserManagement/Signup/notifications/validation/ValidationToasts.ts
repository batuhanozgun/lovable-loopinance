
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class ValidationToasts {
  /**
   * Show form validation error toast
   */
  static showFormValidationError(message: string): void {
    toast({
      variant: "destructive",
      title: i18next.t("Signup.notifications:error.title"),
      description: message,
    });
  }
  
  /**
   * Show email validation error toast
   */
  static showEmailValidationError(message?: string): void {
    toast({
      variant: "destructive",
      title: i18next.t("Signup.notifications:error.title"),
      description: message || i18next.t("Signup.validation:invalidEmail"),
    });
  }
  
  /**
   * Show password validation error toast
   */
  static showPasswordValidationError(message?: string): void {
    toast({
      variant: "destructive",
      title: i18next.t("Signup.notifications:error.title"),
      description: message || i18next.t("Signup.validation:passwordMin"),
    });
  }
}
