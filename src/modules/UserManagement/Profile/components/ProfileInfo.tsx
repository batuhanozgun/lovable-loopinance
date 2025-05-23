
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Pencil, Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileInfoProps {
  profile: IUserProfile;
  onUpdateProfile: (data: Partial<IUserProfile>) => Promise<void>;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, onUpdateProfile }) => {
  const { t, i18n } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.ProfileInfo");
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name || "");
  const [lastName, setLastName] = useState(profile.last_name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "PPP", {
        locale: i18n.language === "tr" ? tr : enUS,
      });
    } catch (error) {
      logger.error("Tarih formatlanırken hata oluştu", { dateString, error });
      return dateString;
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      logger.debug("Profil bilgileri kaydediliyor", { firstName, lastName });
      
      await onUpdateProfile({
        first_name: firstName,
        last_name: lastName,
      });
      
      setIsEditing(false);
    } catch (error) {
      logger.error("Profil bilgileri kaydedilirken hata oluştu", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setIsEditing(false);
  };

  const getInitials = () => {
    const first = profile.first_name?.charAt(0) || "";
    const last = profile.last_name?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold">{t("Profile:ProfileInfo.title")}</CardTitle>
        <CardDescription className="text-base">
          {t("Profile:ProfileInfo.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-3">
            <AvatarImage src={profile.avatar_url || ""} alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-xl font-medium">
              {profile.first_name || ""} {profile.last_name || ""}
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid gap-3">
                <label className="text-sm font-medium">
                  {t("Profile:ProfileInfo.fields.firstName")}
                </label>
                <Input 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder={t("Profile:ProfileInfo.fields.firstName")}
                />
              </div>
              
              <div className="grid gap-3">
                <label className="text-sm font-medium">
                  {t("Profile:ProfileInfo.fields.lastName")}
                </label>
                <Input 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder={t("Profile:ProfileInfo.fields.lastName")}
                />
              </div>
              
              <div className="flex gap-3 justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="mr-2 h-4 w-4" />
                  {t("common:cancel")}
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {t("common:save")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("Profile:ProfileInfo.fields.firstName")}
                    </p>
                    <p className="mt-1 text-base">{profile.first_name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("Profile:ProfileInfo.fields.lastName")}
                    </p>
                    <p className="mt-1 text-base">{profile.last_name || "-"}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-3 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("Profile:ProfileInfo.fields.createdAt")}
                    </p>
                    <p className="mt-1 text-base">{formatDate(profile.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("Profile:ProfileInfo.fields.lastUpdated")}
                    </p>
                    <p className="mt-1 text-base">{formatDate(profile.updated_at)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  size="sm"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  {t("Profile:ProfileInfo.actions.edit")}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
