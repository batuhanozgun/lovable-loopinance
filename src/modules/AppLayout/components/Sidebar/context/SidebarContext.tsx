import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { BREAKPOINTS, TRANSITION } from '../constants';

interface SidebarContextState {
  isExpanded: boolean;
  isMobile: boolean;
  isHovering: boolean;
  toggleSidebar: () => void;
  showQuickActions: boolean;
  toggleQuickActions: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

const initialState = {
  isExpanded: true,
  isMobile: false,
  isHovering: false,
  showQuickActions: false,
};

type TouchGesture = {
  startX: number;
  currentX: number;
  threshold: number;
  active: boolean;
};

const SidebarContext = createContext<SidebarContextState | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logger = LoggerService.getInstance('AppLayout.SidebarContext');
  const [state, setState] = useState(initialState);
  
  const [touchGesture, setTouchGesture] = useState<TouchGesture>({
    startX: 0,
    currentX: 0,
    threshold: 50,
    active: false,
  });

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobile = window.innerWidth < BREAKPOINTS.TABLET;
      setState(prev => {
        if (prev.isMobile === isMobile) return prev;
        
        logger.debug('Screen size changed', { isMobile });
        
        if (isMobile && prev.isExpanded) {
          return { ...prev, isMobile, isExpanded: false };
        }
        
        if (!isMobile && !prev.isExpanded && prev.isMobile) {
          return { ...prev, isMobile, isExpanded: true };
        }
        
        return { ...prev, isMobile };
      });
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [logger]);

  const toggleSidebar = useCallback(() => {
    setState(prev => {
      logger.debug('Sidebar toggled', { wasExpanded: prev.isExpanded });
      return { ...prev, isExpanded: !prev.isExpanded };
    });
  }, [logger]);

  const toggleQuickActions = useCallback(() => {
    setState(prev => {
      logger.debug('QuickActions toggled', { wasVisible: prev.showQuickActions });
      return { ...prev, showQuickActions: !prev.showQuickActions };
    });
  }, [logger]);

  const handleMouseEnter = useCallback(() => {
    if (!state.isMobile && !state.isExpanded) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isHovering: true }));
        logger.debug('Sidebar mouse enter', { isHovering: true });
      }, TRANSITION.HOVER_DELAY);
    }
  }, [state.isMobile, state.isExpanded, logger]);

  const handleMouseLeave = useCallback(() => {
    if (!state.isMobile) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isHovering: false }));
        logger.debug('Sidebar mouse leave', { isHovering: false });
      }, TRANSITION.HOVER_DELAY);
    }
  }, [state.isMobile, logger]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (state.isMobile) {
      const touch = e.touches[0];
      setTouchGesture(prev => ({
        ...prev,
        startX: touch.clientX,
        currentX: touch.clientX,
        active: true,
      }));
      logger.debug('Touch start', { clientX: touch.clientX });
    }
  }, [state.isMobile, logger]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (state.isMobile && touchGesture.active) {
      const touch = e.touches[0];
      setTouchGesture(prev => ({
        ...prev,
        currentX: touch.clientX,
      }));
      logger.debug('Touch move', { currentX: touch.clientX });
    }
  }, [state.isMobile, touchGesture.active, logger]);

  const handleTouchEnd = useCallback(() => {
    if (state.isMobile && touchGesture.active) {
      const swipeDistance = touchGesture.startX - touchGesture.currentX;
      
      if (state.isExpanded && swipeDistance > touchGesture.threshold) {
        toggleSidebar();
        logger.debug('Swipe left detected, closing sidebar', { swipeDistance });
      }
      
      if (!state.isExpanded && swipeDistance < -touchGesture.threshold) {
        toggleSidebar();
        logger.debug('Swipe right detected, opening sidebar', { swipeDistance });
      }
      
      setTouchGesture(prev => ({
        ...prev,
        active: false,
      }));
    }
  }, [state.isMobile, state.isExpanded, touchGesture, toggleSidebar, logger]);

  const contextValue: SidebarContextState = {
    ...state,
    toggleSidebar,
    toggleQuickActions,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  
  return context;
};
