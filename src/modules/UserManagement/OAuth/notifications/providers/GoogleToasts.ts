
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class GoogleToasts {
  static showSignInSuccess(isSignup = false): void {
    toast({
      title: i18next.t("UserManagement.oauth.notifications:success.title"),
      description: i18next.t(isSignup 
        ? "UserManagement.oauth.notifications:success.signup"
        : "UserManagement.oauth.notifications:success.login"),
    });
  }
  
  static showSignInError(error?: Error | string, isSignup = false): void {
    const errorMessage = typeof error === "string" 
      ? error
      : error instanceof Error 
        ? error.message 
        : i18next.t("UserManagement.oauth.notifications:error.fallback");
    
    toast({
      variant: "destructive",
      title: i18next.t("UserManagement.oauth.notifications:error.title"),
      description: errorMessage || i18next.t(isSignup
        ? "UserManagement.oauth.notifications:error.signup"
        : "UserManagement.oauth.notifications:error.login"),
    });
  }
  
  static showNoUrlError(): void {
    toast({
      variant: "destructive",
      title: i18next.t("UserManagement.oauth.notifications:error.title"),
      description: i18next.t("UserManagement.oauth.notifications:error.noUrl"),
    });
  }
}
