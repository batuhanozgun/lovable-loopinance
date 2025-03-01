
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export const showLoginToast = {
  success: () => toast({
    title: i18next.t("UserManagement.login.notifications:success.title"),
    description: i18next.t("UserManagement.login.notifications:success.login"),
  }),
  
  error: (error?: Error) => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.login.notifications:error.title"),
    description: error?.message || i18next.t("UserManagement.login.notifications:error.fallback"),
  }),
  
  invalidCredentials: () => toast({
    variant: "destructive",
    title: i18next.t("UserManagement.login.notifications:error.title"),
    description: i18next.t("UserManagement.login.notifications:error.invalidCredentials"),
  }),
};
