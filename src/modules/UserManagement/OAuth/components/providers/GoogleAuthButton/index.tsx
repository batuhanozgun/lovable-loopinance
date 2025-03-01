
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./GoogleIcon";
import { useTranslation } from "react-i18next";
import { GoogleAuthController } from "../../../controllers/providers/GoogleAuthController";
import { useState } from "react";

export const GoogleAuthButton = () => {
  const { t } = useTranslation(["common", "OAuth"]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await GoogleAuthController.signInWithGoogle();
    } catch (error) {
      console.error("Google authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full"
      onClick={handleGoogleAuth}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : (
        <GoogleIcon className="mr-2 h-4 w-4" />
      )}
      {t("OAuth:ui.buttons.signup.google")}
    </Button>
  );
};
