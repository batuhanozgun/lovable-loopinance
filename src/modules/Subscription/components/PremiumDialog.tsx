
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SubscriptionController } from "../controllers/SubscriptionController";
import { Sparkles } from "lucide-react";

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumDialog: React.FC<PremiumDialogProps> = ({ open, onOpenChange }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePremiumUpgrade = async () => {
    setIsLoading(true);
    try {
      await SubscriptionController.handleUpgradeToPremium();
      onOpenChange(false);
    } catch (error) {
      console.error("Premium yükseltme hatası:", error);
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
            Premium'a Geçiş Zamanı
          </DialogTitle>
          <DialogDescription>
            Deneme süreniz sona erdi. Uygulamayı kullanmaya devam etmek için Premium'a geçin.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Premium Avantajlar</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Sınırsız erişim</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Tüm özelliklere erişim</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Öncelikli destek</span>
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
            Daha Sonra
          </Button>
          <Button 
            onClick={handlePremiumUpgrade} 
            className="sm:w-auto w-full"
            disabled={isLoading}
          >
            {isLoading ? "İşleniyor..." : "Premium'a Geç"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
