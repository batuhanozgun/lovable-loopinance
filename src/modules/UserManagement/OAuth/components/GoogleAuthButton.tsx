
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OAuthController } from "../controllers/OAuthController";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface GoogleAuthButtonProps {
  className?: string;
  customText?: string;
}

export const GoogleAuthButton = ({ 
  className = "", 
  customText 
}: GoogleAuthButtonProps) => {
  const { t } = useTranslation(["UserManagement.oauth.ui", "UserManagement.oauth.messages", "common"]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  // Bulunduğumuz sayfaya göre login mi signup mı olduğunu belirleme
  const isSignup = location.pathname.includes("signup");
  const buttonKey = isSignup ? "buttons.signup.google" : "buttons.login.google";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await OAuthController.handleGoogleSignIn();
      // Not needed to handle the success case here because we will be redirected
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4001 8.116C15.4001 7.48894 15.3478 7.03333 15.2346 6.56001H8.00012V9.30894H12.1822C12.0952 9.91327 11.6079 10.8267 10.5529 11.4319L10.5378 11.5286L12.7182 13.2533L12.8729 13.2667C14.2871 11.9949 15.4001 10.2186 15.4001 8.116Z" fill="#4285F4"/>
          <path d="M8.00006 15.4625C10.0334 15.4625 11.7417 14.784 12.8728 13.2667L10.5528 11.4319C9.92344 11.8693 9.07809 12.1769 8.00006 12.1769C5.99343 12.1769 4.30387 10.8884 3.67764 9.14054L3.58608 9.14639L1.33001 10.9296L1.30371 11.0172C2.42615 13.6636 5.0086 15.4625 8.00006 15.4625Z" fill="#34A853"/>
          <path d="M3.67761 9.14058C3.5256 8.66722 3.43788 8.15855 3.43788 7.63193C3.43788 7.10525 3.5256 6.59663 3.66993 6.12322L3.66451 6.02055L1.37483 4.20166L1.30368 4.24636C0.806584 5.28873 0.518341 6.4249 0.518341 7.63193C0.518341 8.83896 0.806584 9.97513 1.30368 11.0175L3.67761 9.14058Z" fill="#FBBC05"/>
          <path d="M8.00006 3.08614C9.44172 3.08614 10.4163 3.7201 10.9769 4.24314L13.0289 2.25798C11.7349 1.07606 10.0334 0.400879 8.00006 0.400879C5.0086 0.400879 2.42616 2.19975 1.30371 4.84618L3.66997 6.12305C4.30388 4.37521 5.99343 3.08614 8.00006 3.08614Z" fill="#EB4335"/>
        </svg>
      )}
      <span>{customText || t(buttonKey)}</span>
    </Button>
  );
};
