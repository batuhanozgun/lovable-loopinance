
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AtSign, Lock, Mail, Shield, Key, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { PasswordChangeDialog } from "./dialogs/PasswordChangeDialog";

interface AccountSettingsProps {
  profile: IUserProfile;
  onUpdateProfile: (data: Partial<IUserProfile>) => Promise<void>;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ profile }) => {
  const { t } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.AccountSettings");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePasswordDialogOpen = () => {
    logger.debug("Şifre değiştirme diyaloğu açılıyor");
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="shadow-sm border h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">{t("Profile:AccountSettings.title")}</CardTitle>
          <CardDescription className="text-base">
            {t("Profile:AccountSettings.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t("Profile:AccountSettings.fields.email")}</p>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              {t("Profile:AccountSettings.actions.verify")}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t("Profile:AccountSettings.fields.password")}</p>
              <p className="text-sm text-muted-foreground">********</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={handlePasswordDialogOpen}
            >
              {t("Profile:AccountSettings.actions.change")}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t("Profile:AccountSettings.fields.twoFactor")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:AccountSettings.status.disabled")}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              {t("Profile:AccountSettings.actions.setup")}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t("Profile:AccountSettings.fields.apiKeys")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:AccountSettings.status.none")}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              {t("Profile:AccountSettings.actions.generate")}
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t("Profile:AccountSettings.fields.sessions")}</p>
              <p className="text-sm text-muted-foreground">{t("Profile:AccountSettings.status.active", { count: 1 })}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              {t("Profile:AccountSettings.actions.manage")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <PasswordChangeDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};
