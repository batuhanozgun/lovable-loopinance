
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

const Index = () => {
  const { t } = useTranslation();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LanguageSelector />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {t("common:welcome")}
        </h1>
        <p className="text-xl text-gray-600">
          {t("common:description")}
        </p>
        <Button onClick={handleSignOut}>{t("common:logout")}</Button>
      </div>
    </div>
  );
};

export default Index;
