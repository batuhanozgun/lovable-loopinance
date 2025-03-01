
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Globe, SunMoon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { SessionService } from "@/modules/UserManagement/auth/services/SessionService";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AccountSettingsProps {
  profile: IUserProfile;
  onUpdateProfile: (data: Partial<IUserProfile>) => Promise<void>;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ profile, onUpdateProfile }) => {
  const { t } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.AccountSettings");
  const [userEmail, setUserEmail] = useState<string>("");

  // Mevcut kullanıcının e-posta bilgisini almak için
  React.useEffect(() => {
    const getUserEmail = async () => {
      try {
        const sessionResponse = await SessionService.getCurrentSession();
        
        if (!sessionResponse.success || !sessionResponse.user) {
          logger.error("Oturum bilgisi alınamadı");
          return;
        }

        setUserEmail(sessionResponse.user.email || "");
      } catch (error) {
        logger.error("Kullanıcı e-posta bilgisi alınamadı", error);
      }
    };

    getUserEmail();
  }, []);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("Profile:sections.accountSettings.title")}</CardTitle>
        <CardDescription>
          {t("Profile:sections.accountSettings.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("Profile:fields.email")}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("Profile:fields.language")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:fields.languageDescription")}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <SunMoon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("Profile:fields.theme")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:fields.themeDescription")}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{t("Profile:fields.password")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:fields.passwordDescription")}</p>
            </div>
          </div>
          <Button variant="outline">
            {t("Profile:actions.changePassword")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
