
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { CashAccount } from '../../../types';

interface AccountDetailsProps {
  account: CashAccount;
}

/**
 * Nakit hesap başlık ve açıklama bilgilerini gösteren bileşen
 */
export const AccountDetails: React.FC<AccountDetailsProps> = ({ account }) => {
  const isMobile = useIsMobile();
  const { name, description } = account;

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col md:flex-row md:items-center gap-0.5">
        <h3 className="text-sm font-medium truncate">{name}</h3>
        {description && !isMobile && (
          <p className="text-xs text-muted-foreground hidden md:block md:ml-2">
            {description}
          </p>
        )}
      </div>
      {description && isMobile && (
        <p className="text-xs text-muted-foreground truncate">
          {description}
        </p>
      )}
    </div>
  );
};
