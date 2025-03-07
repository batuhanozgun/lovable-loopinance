
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileInfo } from "../components/ProfileInfo";
import { AccountSettings } from "../components/AccountSettings";
import { SubscriptionInfo } from "../components/SubscriptionInfo";

export const ProfileView: React.FC = () => {
  const { t } = useTranslation(["Profile"]);

  return (
    <div className="container py-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">{t("profile.title")}</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ProfileInfo />
          <SubscriptionInfo />
        </div>
        <div>
          <AccountSettings />
        </div>
      </div>
    </div>
  );
};
