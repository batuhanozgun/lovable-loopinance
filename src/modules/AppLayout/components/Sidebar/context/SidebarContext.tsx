
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';

interface SidebarContextState {
  isExpanded: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  showQuickActions: boolean;
  toggleQuickActions: () => void;
}

const initialState: Omit<SidebarContextState, 'toggleSidebar' | 'toggleQuickActions'> = {
  isExpanded: true,
  isMobile: false,
  showQuickActions: false,
};

const SidebarContext = createContext<SidebarContextState | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logger = LoggerService.getInstance('AppLayout.SidebarContext');
  const [state, setState] = useState(initialState);

  // Mobil görünüm kontrolü için event listener
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth < 768;
      setState(prev => {
        // Eğer değişiklik yoksa state güncellemesini engelle
        if (prev.isMobile === isMobile) return prev;
        
        logger.debug('Screen size changed', { isMobile });
        
        // Mobil görünüme geçildiğinde sidebar'ı daralt
        if (isMobile && prev.isExpanded) {
          return { ...prev, isMobile, isExpanded: false };
        }
        
        return { ...prev, isMobile };
      });
    };

    // İlk yükleme kontrolü
    checkIsMobile();

    // Event listener ekle
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [logger]);

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setState(prev => {
      logger.debug('Sidebar toggled', { wasExpanded: prev.isExpanded });
      return { ...prev, isExpanded: !prev.isExpanded };
    });
  };

  // QuickActions toggle handler
  const toggleQuickActions = () => {
    setState(prev => {
      logger.debug('QuickActions toggled', { wasVisible: prev.showQuickActions });
      return { ...prev, showQuickActions: !prev.showQuickActions };
    });
  };

  return (
    <SidebarContext.Provider value={{
      ...state,
      toggleSidebar,
      toggleQuickActions
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook sidebar context'ine erişim için
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  
  return context;
};
