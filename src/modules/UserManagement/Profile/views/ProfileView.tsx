
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { ProfileInfo } from "../components/ProfileInfo";
import { AccountSettings } from "../components/AccountSettings";
import { ProfileService } from "@/modules/UserManagement/auth/services/ProfileService";
import { SessionService } from "@/modules/UserManagement/auth/services/SessionService";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { useToast } from "@/hooks/use-toast";

export const ProfileView: React.FC = () => {
  const { t } = useTranslation(["Profile", "common"]);
  const logger = LoggerService.getInstance("UserManagement.ProfileView");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<IUserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const sessionResponse = await SessionService.getCurrentSession();
        
        if (!sessionResponse.success || !sessionResponse.user) {
          logger.error("Oturum bilgisi alınamadı");
          toast({
            title: t("common:error"),
            description: t("Profile:errors.sessionNotFound"),
            variant: "destructive",
          });
          return;
        }

        const userId = sessionResponse.user.id;
        setUserId(userId);

        const profileResponse = await ProfileService.getUserProfile(userId);
        
        if (!profileResponse.success) {
          logger.error("Profil bilgileri alınamadı", { error: profileResponse.error });
          toast({
            title: t("common:error"),
            description: t("Profile:errors.profileNotFound"),
            variant: "destructive",
          });
          return;
        }

        setProfileData(profileResponse.profile as IUserProfile);
        logger.debug("Profil bilgileri başarıyla yüklendi", { userId });
      } catch (error) {
        logger.error("Profil verisi yüklenirken bir hata oluştu", error);
        toast({
          title: t("common:error"),
          description: t("Profile:errors.loadError"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [t, toast]);

  const handleProfileUpdate = async (updatedData: Partial<IUserProfile>) => {
    if (!userId) return;
    
    try {
      logger.debug("Profil güncelleme başlatıldı", { updatedData });
      const response = await ProfileService.updateUserProfile(userId, updatedData);
      
      if (!response.success) {
        logger.error("Profil güncellenirken hata oluştu", { error: response.error });
        toast({
          title: t("common:error"),
          description: t("Profile:errors.updateError"),
          variant: "destructive",
        });
        return;
      }
      
      setProfileData(response.profile as IUserProfile);
      logger.debug("Profil başarıyla güncellendi");
      toast({
        title: t("Profile:messages.updateSuccess.title"),
        description: t("Profile:messages.updateSuccess.description"),
      });
    } catch (error) {
      logger.error("Profil güncellenirken bir hata oluştu", error);
      toast({
        title: t("common:error"),
        description: t("Profile:errors.updateError"),
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-muted-foreground">{t("common:loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid gap-4 mt-4 md:grid-cols-1 lg:grid-cols-2">
        {profileData && (
          <>
            <ProfileInfo
              profile={profileData}
              onUpdateProfile={handleProfileUpdate}
            />
            
            <AccountSettings
              profile={profileData}
              onUpdateProfile={handleProfileUpdate}
            />
          </>
        )}
      </div>
    </div>
  );
};
