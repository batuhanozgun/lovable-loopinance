
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface FormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  handleCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  isEditMode,
  handleCancel
}) => {
  const { t } = useTranslation(['TransactionManagement', 'common']);
  
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        {t('common:cancel', { ns: 'common' })}
      </Button>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEditMode
          ? t('transaction.edit', { ns: 'TransactionManagement' })
          : t('transaction.add', { ns: 'TransactionManagement' })}
      </Button>
    </>
  );
};
