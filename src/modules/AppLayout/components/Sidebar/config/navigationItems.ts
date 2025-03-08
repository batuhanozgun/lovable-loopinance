
import { Home, BarChart3, Settings, User, Wallet, Grid, List } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/**
 * Navigation öğesi için tip tanımı
 */
export interface NavigationItem {
  /** Navigasyon öğesinin çevirme anahtarı */
  label: string;
  /** Yönlendirilecek yol */
  path: string;
  /** Gösterilecek ikon */
  icon: LucideIcon;
  /** Öğenin abonelik gerektirip gerektirmediği (varsayılan: false) */
  requiresSubscription?: boolean;
}

/**
 * Sidebar navigasyon öğelerini tanımlar
 * İkonlar ve yönlendirmeleri içerir
 */
export const getNavigationItems = (): NavigationItem[] => {
  return [
    { 
      label: 'AppLayout:navigation.dashboard', 
      path: '/dashboard', 
      icon: Home 
    },
    { 
      label: 'AppLayout:navigation.accounts', 
      path: '/accounts', 
      icon: Wallet,
      requiresSubscription: true
    },
    { 
      label: 'AppLayout:navigation.budgets', 
      path: '/budgets', 
      icon: Grid,
      requiresSubscription: true
    },
    { 
      label: 'AppLayout:navigation.categories', 
      path: '/categories', 
      icon: List,
      requiresSubscription: true
    },
    { 
      label: 'AppLayout:navigation.analytics', 
      path: '/analytics', 
      icon: BarChart3,
      requiresSubscription: true
    },
    { 
      label: 'AppLayout:navigation.settings', 
      path: '/settings', 
      icon: Settings
    },
    { 
      label: 'AppLayout:navigation.profile', 
      path: '/profile', 
      icon: User
    },
  ];
};
