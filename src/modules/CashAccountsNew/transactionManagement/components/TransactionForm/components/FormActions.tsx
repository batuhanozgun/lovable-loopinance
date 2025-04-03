
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
  isDisabled?: boolean;
  isEditMode?: boolean;
}

/**
 * Form gönderim butonları bileşeni
 */
export const FormActions: React.FC<FormActionsProps> = ({ 
  onClose, 
  isSubmitting,
  isDisabled = false,
  isEditMode = false
}) => {
  const { t } = useTranslation(["TransactionManagement", "common"]);

  return (
    <DialogFooter className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        disabled={isSubmitting}
      >
        {t("common:cancel")}
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || isDisabled}
      >
        {isSubmitting 
          ? t("common:processing") 
          : isEditMode 
            ? t("TransactionManagement:transaction.update")
            : t("TransactionManagement:transaction.add")
        }
      </Button>
    </DialogFooter>
  );
};
