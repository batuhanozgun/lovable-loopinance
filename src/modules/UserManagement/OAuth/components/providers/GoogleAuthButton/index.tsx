
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleAuthController } from "../../../controllers/providers/GoogleAuthController";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { GoogleIcon } from "./GoogleIcon";

interface GoogleAuthButtonProps {
  className?: string;
  customText?: string;
}

export const GoogleAuthButton = ({ 
  className = "", 
  customText 
}: GoogleAuthButtonProps) => {
  const { t } = useTranslation(["OAuth.ui", "OAuth.messages", "common"]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  // Determine if we're on signup or login page
  const isSignup = location.pathname.includes("signup");
  const buttonKey = isSignup ? "buttons.signup.google" : "buttons.login.google";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleAuthController.handleSignIn();
      // No need to handle success case here as we'll be redirected
    } catch (error) {
      // Error handling is done in the controller
      console.error("Google auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <GoogleIcon />
      )}
      <span>{customText || t(buttonKey)}</span>
    </Button>
  );
};
