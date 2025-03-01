
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export const showOAuthToast = {
  success: (isSignup = false) => toast({
    title: i18next.t("UserManagement.oauth.notifications.success.title"),
    description: i18next.t(isSignup 
      ? "UserManagement.oauth.notifications.success.signup"
      : "UserManagement.oauth.notifications.success.login"),
  }),
  
  error: (error?: Error, isSignup = false) => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.oauth.notifications.error.title"),
    description: error?.message || i18next.t(isSignup
      ? "UserManagement.oauth.notifications.error.signup"
      : "UserManagement.oauth.notifications.error.login"),
  }),
  
  noUrl: () => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.oauth.notifications.error.title"),
    description: i18next.t("UserManagement.oauth.notifications.error.noUrl"),
  }),
};
