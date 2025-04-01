
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';
import { StatementWarning } from './StatementWarning';
import { AccountStatement } from '@/modules/CashAccountsNew/statementManagement/types';

export interface StatementInfoSectionProps {
  isLoading: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  accountId: string;
  selectedStatementId: string;
  statement: AccountStatement | null;
  onStatementSelect?: (statementId: string) => void;
}

export const StatementInfoSection: React.FC<StatementInfoSectionProps> = ({
  isLoading,
  isLocked,
  onToggleLock,
  accountId,
  selectedStatementId,
  statement,
  onStatementSelect
}) => {
  const { t } = useTranslation('TransactionManagement');

  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Label className="text-base" htmlFor="statement-info">
              {t('transaction.selectedStatement')}
            </Label>
            <CardDescription>
              {selectedStatementId ? selectedStatementId : t('transaction.noStatementSelected')}
            </CardDescription>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={onToggleLock}
          >
            {isLocked ? (
              <>
                <Unlock className="h-4 w-4" />
                {t('transaction.unlockStatement')}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                {t('transaction.lockStatement')}
              </>
            )}
          </Button>
        </div>
        
        <StatementWarning 
          isLoading={isLoading} 
          statement={statement} 
        />
      </CardContent>
    </Card>
  );
};
