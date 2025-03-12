
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormActionsProps } from "../types";
import { serviceLogger } from "../../../logging";

/**
 * Form işlemleri bileşeni
 */
export const FormActions: React.FC<FormActionsProps> = ({ 
  onClose, 
  isSubmitting, 
  isEditMode = false 
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const logger = serviceLogger;

  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="mr-2"
        disabled={isSubmitting}
      >
        {t("common:cancel")}
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        onClick={() => {
          logger.debug('Submit button clicked', { isEditMode });
          console.log('Submit button clicked', { isEditMode });
        }}
      >
        {isSubmitting
          ? t("common:loading")
          : isEditMode 
            ? t("CashAccounts:transaction.update") 
            : t("CashAccounts:transaction.add")}
      </Button>
    </DialogFooter>
  );
};
