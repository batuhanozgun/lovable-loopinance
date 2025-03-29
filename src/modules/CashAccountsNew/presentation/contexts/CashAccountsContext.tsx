
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { CashAccount } from '../../shared/types';

interface CashAccountsContextType {
  accounts: CashAccount[] | undefined;
  isLoading: boolean; 
  isError: boolean;
  error: unknown;
  refreshAccounts: () => Promise<any>;
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
}

const CashAccountsContext = createContext<CashAccountsContextType | undefined>(undefined);

export const CashAccountsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const { data: accounts, isLoading, isError, error, refresh: refreshAccounts } = useCashAccounts();
  
  const contextValue = useMemo(() => ({
    accounts,
    isLoading,
    isError,
    error,
    refreshAccounts,
    selectedAccountId,
    setSelectedAccountId
  }), [accounts, isLoading, isError, error, refreshAccounts, selectedAccountId]);
  
  return (
    <CashAccountsContext.Provider value={contextValue}>
      {children}
    </CashAccountsContext.Provider>
  );
};

export const useCashAccountsContext = (): CashAccountsContextType => {
  const context = useContext(CashAccountsContext);
  
  if (context === undefined) {
    throw new Error('useCashAccountsContext must be used within a CashAccountsProvider');
  }
  
  return context;
};
