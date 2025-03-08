
import { useState, useCallback } from 'react';
import { useSubscription } from './useSubscription';
import { subscriptionLogger } from '../logging';

export const useAccessControl = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [restrictedModuleName, setRestrictedModuleName] = useState<string | undefined>(undefined);
  const { isFeatureAccessible } = useSubscription();
  
  // Kısıtlı modüller
  const restrictedPaths = [
    '/accounts',
    '/budgets',
    '/categories',
    '/analytics'
  ];
  
  // Belirtilen yolun kısıtlı olup olmadığını kontrol et
  const isPathRestricted = useCallback((path: string) => {
    return restrictedPaths.some(restrictedPath => path === restrictedPath);
  }, [restrictedPaths]);
  
  // Belirtilen yola geçişin mümkün olup olmadığını kontrol et
  const canNavigateTo = useCallback((path: string, moduleName?: string) => {
    // Yol kısıtlı değilse geçişe izin ver
    if (!isPathRestricted(path)) {
      return true;
    }
    
    // Özellik erişilebilir ise geçişe izin ver
    if (isFeatureAccessible()) {
      return true;
    }
    
    // Erişim kısıtlı ise dialog'u göster
    subscriptionLogger.debug('Access restricted for path', { path, moduleName });
    setRestrictedModuleName(moduleName);
    setIsDialogOpen(true);
    return false;
  }, [isPathRestricted, isFeatureAccessible]);
  
  // Dialog'u kapat
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setRestrictedModuleName(undefined);
  }, []);
  
  return {
    isDialogOpen,
    restrictedModuleName,
    closeDialog,
    canNavigateTo,
    isPathRestricted
  };
};
