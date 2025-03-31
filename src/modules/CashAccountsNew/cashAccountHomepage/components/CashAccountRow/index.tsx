
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { CashAccount } from '../../types';
import { AccountDetails } from './components/AccountDetails';
import { AccountBalance } from './components/AccountBalance';
import { MobileActions } from './components/MobileActions';
import { DesktopActions } from './components/DesktopActions';

interface CashAccountRowProps {
  account: CashAccount;
  onEdit?: (account: CashAccount) => void;
  onDelete?: (account: CashAccount) => void;
  onAddTransaction?: (account: CashAccount) => void;
  hasDragHandle?: boolean;
}

/**
 * Nakit hesap bilgilerini satır olarak gösteren bileşen
 */
export const CashAccountRow: React.FC<CashAccountRowProps> = ({ 
  account, 
  onEdit, 
  onDelete,
  onAddTransaction,
  hasDragHandle = false
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex items-center justify-between py-3 px-4 border hover:bg-muted/20 transition-colors ${hasDragHandle ? 'pl-10' : ''}`}>
      <AccountDetails account={account} />
      
      <div className="flex items-center gap-4">
        <AccountBalance account={account} />
        
        {isMobile ? (
          <MobileActions 
            account={account} 
            onEdit={onEdit} 
            onDelete={onDelete}
            onAddTransaction={onAddTransaction} 
          />
        ) : (
          <DesktopActions 
            account={account} 
            onEdit={onEdit} 
            onDelete={onDelete}
            onAddTransaction={onAddTransaction}
          />
        )}
      </div>
    </div>
  );
};
