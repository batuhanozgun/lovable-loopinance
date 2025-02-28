
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { Sparkles, Clock, Eye, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumDialog: React.FC<PremiumDialogProps> = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation(["subscription.common", "subscription.notifications", "subscription.plans", "common"]);
  const { toast } = useToast();

  const handlePremiumUpgrade = async () => {
    setIsLoading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      onOpenChange(false);
      toast({
        title: t("premium.status"),
        description: t("premium.unlimited"),
        variant: "default",
      });
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
      toast({
        title: t("errors:general.title", { ns: "errors" }),
        description: t("errors:general.description", { ns: "errors" }),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:w-auto w-full"
          >
            {t("later", { ns: "common", defaultValue: "Daha Sonra" })}
          </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
