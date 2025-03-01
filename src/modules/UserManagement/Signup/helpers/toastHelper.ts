
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export const showSignupToast = {
  success: () => toast({
    title: i18next.t("UserManagement.signup.notifications.success.title"),
    description: i18next.t("UserManagement.signup.notifications.success.signup"),
  }),
  
  error: (error?: Error) => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.signup.notifications.error.title"),
    description: error?.message || i18next.t("UserManagement.signup.notifications.error.fallback"),
  }),
  
  emailExists: () => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.signup.notifications.error.title"),
    description: i18next.t("UserManagement.signup.notifications.error.emailAlreadyExists"),
  }),
};
