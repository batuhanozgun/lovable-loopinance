
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CancellationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

export const CancellationDialog: React.FC<CancellationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const [reason, setReason] = useState('');
  
  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Subscription:settings.confirmCancel')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Subscription:settings.cancelDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4">
          <Label htmlFor="cancel-reason" className="mb-2 block">
            {t('Subscription:settings.cancellationReason')}
          </Label>
          <Textarea
            id="cancel-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t('Subscription:settings.cancellationReasonPlaceholder')}
            className="min-h-[100px]"
          />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('common:cancel')}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('Subscription:settings.cancelSubscription')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
