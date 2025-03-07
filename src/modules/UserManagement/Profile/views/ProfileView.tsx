
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProfileInfo } from "../components/ProfileInfo";
import { AccountSettings } from "../components/AccountSettings";
import { SubscriptionInfo } from "../components/SubscriptionInfo";
import { IUserProfile } from "@/modules/UserManagement/auth/types/IUserProfile";
import { ProfileService } from "@/modules/UserManagement/auth/services/ProfileService";
import { SessionService } from "@/modules/UserManagement/auth/services/SessionService";
import { LoggerService } from "@/modules/Logging/services/LoggerService";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export const ProfileView: React.FC = () => {
  const { t } = useTranslation(["Profile"]);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const logger = LoggerService.getInstance("UserManagement.ProfileView");
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      logger.debug("Kullanıcı profili yükleniyor");
      
      const currentUser = await SessionService.getCurrentUser();
      if (!currentUser) {
        logger.error("Oturum açmış kullanıcı bulunamadı");
        toast({
          variant: "destructive",
          title: t("Profile:errors.noUser"),
          description: t("Profile:errors.noUserDescription"),
        });
        return;
      }

      const response = await ProfileService.getUserProfile(currentUser.id);
      
      if (!response.success) {
        logger.error("Profil bilgileri yüklenemedi", { error: response.error });
        toast({
          variant: "destructive",
          title: t("Profile:errors.loadFailed"),
          description: response.error || t("Profile:errors.loadFailedDescription"),
        });
        return;
      }

      logger.debug("Profil bilgileri başarıyla yüklendi", { userId: currentUser.id });
      setProfile(response.profile);
    } catch (error) {
      logger.error("Profil yüklenirken beklenmeyen hata", error);
      toast({
        variant: "destructive",
        title: t("Profile:errors.unexpectedError"),
        description: error instanceof Error ? error.message : t("Profile:errors.tryAgain"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (data: Partial<IUserProfile>) => {
    if (!profile?.id) {
      logger.error("Profil güncellenemiyor, profil ID bulunamadı");
      return;
    }

    try {
      setIsUpdating(true);
      logger.debug("Profil güncelleniyor", { profileId: profile.id, ...data });
      
      const response = await ProfileService.updateUserProfile(profile.id, data);
      
      if (!response.success) {
        logger.error("Profil güncellenemedi", { error: response.error });
        toast({
          variant: "destructive",
          title: t("Profile:errors.updateFailed"),
          description: response.error || t("Profile:errors.updateFailedDescription"),
        });
        return;
      }

      logger.debug("Profil başarıyla güncellendi", { profileId: profile.id });
      setProfile(response.profile);
      
      toast({
        title: t("Profile:messages.updateSuccess"),
        description: t("Profile:messages.updateSuccessDescription"),
      });
    } catch (error) {
      logger.error("Profil güncellenirken beklenmeyen hata", error);
      toast({
        variant: "destructive",
        title: t("Profile:errors.unexpectedError"),
        description: error instanceof Error ? error.message : t("Profile:errors.tryAgain"),
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const renderLoading = () => (
    <div className="space-y-8">
      <div className="border rounded-lg p-6">
        <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">{t("profile.title")}</h1>
      
      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            {profile && (
              <ProfileInfo 
                profile={profile} 
                onUpdateProfile={handleUpdateProfile} 
              />
            )}
            <SubscriptionInfo />
          </div>
          <div>
            {profile && (
              <AccountSettings 
                profile={profile} 
                onUpdateProfile={handleUpdateProfile} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
