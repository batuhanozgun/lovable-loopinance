
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AtSign, Lock, Mail, Shield, Key, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { LoggerService } from "@/modules/Logging/services/LoggerService";

interface AccountSettingsProps {
  profile: IUserProfile;
  onUpdateProfile: (data: Partial<IUserProfile>) => Promise<void>;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ profile }) => {
  const { t } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.AccountSettings");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      logger.debug("Şifre sıfırlama isteği gönderiliyor");
      // Şifre sıfırlama işlemi burada yapılacak
      setTimeout(() => {
        setIsLoading(false);
        // Şifre sıfırlama başarılı oldu mesajı
      }, 1000);
    } catch (error) {
      logger.error("Şifre sıfırlanırken hata oluştu", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-3">
        <CardTitle>{t("Profile:sections.accountSettings.title")}</CardTitle>
        <CardDescription>
          {t("Profile:sections.accountSettings.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("Profile:fields.email")}</p>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            {t("Profile:actions.verify")}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("Profile:fields.password")}</p>
            <p className="text-sm text-muted-foreground">********</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handlePasswordReset}
            disabled={isLoading}
          >
            {t("Profile:actions.change")}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Smartphone className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("Profile:fields.twoFactor")}</p>
            <p className="text-sm text-muted-foreground">{t("Profile:status.disabled")}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            {t("Profile:actions.setup")}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("Profile:fields.apiKeys")}</p>
            <p className="text-sm text-muted-foreground">{t("Profile:status.none")}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            {t("Profile:actions.generate")}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{t("Profile:fields.sessions")}</p>
            <p className="text-sm text-muted-foreground">{t("Profile:status.active", { count: 1 })}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            {t("Profile:actions.manage")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
