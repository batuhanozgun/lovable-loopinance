
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class AuthToasts {
  /**
   * Show success toast for signup
   */
  static showSignupSuccess(): void {
    toast({
      title: i18next.t("UserManagement.signup.notifications:success.title"),
      description: i18next.t("UserManagement.signup.notifications:success.signup"),
    });
  }
  
  /**
   * Show error toast for signup
   */
  static showSignupError(error?: Error | string): void {
    const errorMessage = typeof error === 'string' 
      ? error 
      : error?.message || i18next.t("UserManagement.signup.notifications:error.fallback");
    
    toast({
      variant: "destructive",
      title: i18next.t("UserManagement.signup.notifications:error.title"),
      description: errorMessage,
    });
  }
  
  /**
   * Show email exists error toast
   */
  static showEmailExistsError(): void {
    toast({
      variant: "destructive",
      title: i18next.t("UserManagement.signup.notifications:error.title"),
      description: i18next.t("UserManagement.signup.notifications:error.emailAlreadyExists"),
    });
  }
  
  /**
   * Show rate limit error toast
   */
  static showRateLimitError(): void {
    toast({
      variant: "destructive",
      title: i18next.t("UserManagement.signup.notifications:error.title"),
      description: i18next.t("UserManagement.signup.notifications:error.rateLimitExceeded"),
    });
  }
}
