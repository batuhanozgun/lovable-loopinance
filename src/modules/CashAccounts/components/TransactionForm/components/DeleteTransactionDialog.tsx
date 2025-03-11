
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransactionMutations } from "../../../hooks/useTransactionMutations";

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
  statementId: string;
}

/**
 * İşlem silme onay dialogu
 */
export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  isOpen,
  onClose,
  transactionId,
  statementId,
}) => {
  const { t } = useTranslation(["CashAccounts", "common"]);
  const { handleDeleteTransaction, isDeleting } = useTransactionMutations();

  const onConfirmDelete = async () => {
    const success = await handleDeleteTransaction(transactionId, statementId);
    if (success) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("CashAccounts:transaction.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("CashAccounts:transaction.delete.confirmation")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t("common:cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirmDelete();
            }}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? t("common:loading") : t("CashAccounts:transaction.delete.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
