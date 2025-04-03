
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
  isDisabled?: boolean;
}

/**
 * Form gönderim butonları bileşeni
 */
export const FormActions: React.FC<FormActionsProps> = ({ 
  onClose, 
  isSubmitting,
  isDisabled = false
}) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <DialogFooter className="flex justify-end space-x-2 pt-1">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isSubmitting}
        className="h-7 text-xs px-3"
      >
        {t("common:cancel")}
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || isDisabled}
        className="h-7 text-xs px-3"
      >
        {isSubmitting ? t("common:processing") : t("TransactionManagement:transaction.add")}
      </Button>
    </DialogFooter>
  );
};
