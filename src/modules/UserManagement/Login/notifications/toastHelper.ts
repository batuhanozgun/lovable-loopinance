
import { toast } from "@/hooks/use-toast";
import i18next from "i18next";

export const showLoginToast = {
  success: () => toast({
    title: i18next.t("common:success"),
    description: i18next.t("Login:messages.success.login"),
  }),
  
  error: (error?: Error) => toast({
    variant: "destructive",
    title: i18next.t("common:error"),
    description: error?.message || i18next.t("Login:errors.loginFailed"),
  }),
  
  invalidCredentials: () => toast({
    variant: "destructive",
    title: i18next.t("common:error"),
    description: i18next.t("Login:errors.invalidCredentials"),
  }),
};
