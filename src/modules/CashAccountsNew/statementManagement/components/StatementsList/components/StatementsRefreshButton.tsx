import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { StatementAutomationService } from '../../../services/automation/StatementAutomationService';
import { CashAccount } from '@/modules/CashAccountsNew/cashAccountHomepage/types';

interface StatementsRefreshButtonProps {
  accountId: string;
  onSuccess?: () => Promise<void>;
}

export const StatementsRefreshButton: React.FC<StatementsRefreshButtonProps> = ({ 
  accountId,
  onSuccess 
}) => {
  const { t } = useTranslation('StatementManagement');
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleRefreshStatements = async () => {
    try {
      setIsProcessing(true);

      // Create a minimal CashAccount object for the service call
      const accountData: CashAccount = {
        id: accountId,
        name: '',
        currency: 'TRY',
        initial_balance: 0,
        description: '',
        closing_day_type: 'lastDay',
        closing_day_value: 1,
        user_id: '',
        account_type: 'CASH',
        is_active: true,
        sort_order: 0,
        created_at: '',
        updated_at: ''
      };

      const result = await StatementAutomationService.processAccountStatements(accountData);

      if (result.success) {
        toast({
          title: t('common:success'),
          description: t('statements.messages.processCompleted')
        });

        if (onSuccess) {
          await onSuccess();
        }
      } else {
        toast({
          variant: 'destructive',
          title: t('common:error'),
          description: result.message || t('statements.errors.processFailed')
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common:error'),
        description: error instanceof Error 
          ? error.message 
          : t('statements.errors.processFailed')
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefreshStatements}
      disabled={isProcessing}
      className="h-7 text-xs flex items-center gap-1.5"
    >
      {isProcessing ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <RefreshCw className="h-3 w-3" />
      )}
      {t('statements.buttons.processStatements')}
    </Button>
  );
};