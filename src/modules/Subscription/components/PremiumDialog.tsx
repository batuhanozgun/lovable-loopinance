
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { Sparkles, Clock, Eye, Check, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { showSubscriptionToast } from "../helpers/toastHelper";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  forceOpen?: boolean;
}

export const PremiumDialog: React.FC<PremiumDialogProps> = ({ open, onOpenChange, forceOpen = false }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation(["subscription.common", "subscription.notifications", "subscription.plans", "common"]);
  const navigate = useNavigate();

  const handlePremiumUpgrade = async () => {
    setIsLoading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      showSubscriptionToast.success('upgrade');
      onOpenChange(false);
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
      showSubscriptionToast.error(error instanceof Error ? error : undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      showSubscriptionToast.success('cancelled');
      navigate("/");
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
      showSubscriptionToast.error(error instanceof Error ? error : undefined);
    }
  };

  return (
    <Dialog open={forceOpen ? true : open} onOpenChange={forceOpen ? () => {} : onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            {t("trialEnded.title", { ns: "subscription.notifications" })}
          </DialogTitle>
          <DialogDescription>
            {t("trialEnded.description", { ns: "subscription.notifications" })}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">{t("premium.unlimited")}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t("comparison.allFeatures", { ns: "subscription.plans" })}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>{t("features.duration.premium")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <span>{t("viewOnly")}</span>
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          {!forceOpen && (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="sm:w-auto w-full"
            >
              {t("later", { ns: "common", defaultValue: "Daha Sonra" })}
            </Button>
          )}
          <Button 
            onClick={handlePremiumUpgrade} 
            className="sm:w-auto w-full"
            disabled={isLoading}
          >
            {isLoading 
              ? t("upgradeProcessing") 
              : t("upgradeButton")
            }
          </Button>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="sm:w-auto w-full flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut size={16} />
            {t("logout", { ns: "common", defaultValue: "Çıkış Yap" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
