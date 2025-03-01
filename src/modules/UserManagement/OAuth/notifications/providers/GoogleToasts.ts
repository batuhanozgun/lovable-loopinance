
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export class GoogleToasts {
  static showSignInSuccess(isSignup = false): void {
    toast({
      title: i18next.t("OAuth.notifications:success.title"),
      description: i18next.t(isSignup 
        ? "OAuth.notifications:success.signup"
        : "OAuth.notifications:success.login"),
    });
  }
  
  static showSignInError(error?: Error | string, isSignup = false): void {
    const errorMessage = typeof error === "string" 
      ? error
      : error instanceof Error 
        ? error.message 
        : i18next.t("OAuth.notifications:error.fallback");
    
    toast({
      variant: "destructive",
      title: i18next.t("OAuth.notifications:error.title"),
      description: errorMessage || i18next.t(isSignup
        ? "OAuth.notifications:error.signup"
        : "OAuth.notifications:error.login"),
    });
  }
  
  static showNoUrlError(): void {
    toast({
      variant: "destructive",
      title: i18next.t("OAuth.notifications:error.title"),
      description: i18next.t("OAuth.notifications:error.noUrl"),
    });
  }
}
