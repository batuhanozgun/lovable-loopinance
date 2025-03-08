
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSubscription } from '../hooks/useSubscription';
import { subscriptionLogger } from '../logging';

interface AccessRestrictedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
}

export const AccessRestrictedDialog: React.FC<AccessRestrictedDialogProps> = ({
  isOpen,
  onClose,
  moduleName
}) => {
  const { t } = useTranslation(['Subscription', 'common']);
  const navigate = useNavigate();
  const { updatePlan } = useSubscription();
  
  subscriptionLogger.debug('AccessRestrictedDialog rendered', { isOpen, moduleName });

  const handleNavigateToSubscription = () => {
    subscriptionLogger.debug('Redirecting to subscription page');
    onClose();
    navigate('/subscription');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Subscription:access.restricted.title')}</DialogTitle>
          <DialogDescription>
            {moduleName 
              ? t('Subscription:access.restricted.moduleDescription', { moduleName }) 
              : t('Subscription:access.restricted.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            {t('Subscription:access.restricted.upgrade')}
          </p>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            {t('common:later')}
          </Button>
          <Button onClick={handleNavigateToSubscription}>
            {t('Subscription:actions.upgrade')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
