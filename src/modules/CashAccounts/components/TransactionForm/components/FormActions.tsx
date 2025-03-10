
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormActionsProps } from "../types";

/**
 * Form işlemleri bileşeni
 */
export const FormActions: React.FC<FormActionsProps> = ({ onClose, isSubmitting }) => {
  const { t } = useTranslation(["CashAccounts", "common"]);

  return (
    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="mr-2"
      >
        {t("common:cancel")}
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("common:loading")
          : t("CashAccounts:transaction.add")}
      </Button>
    </DialogFooter>
  );
};
