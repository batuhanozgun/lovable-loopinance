
import { Home, BarChart3, Settings, User, Wallet, Grid, List, CreditCard, Package, DollarSign, LayoutDashboard, FolderClosed, Bookmark } from 'lucide-react';
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
 * Navigation grubu için tip tanımı
 */
export interface NavigationGroup {
  /** Grup başlığı (opsiyonel) */
  title?: string;
  /** Navigasyon öğeleri */
  items: NavigationItem[];
}

/**
 * Sidebar navigasyon öğelerini tanımlar
 * İkonlar ve yönlendirmeleri içerir
 */
export const getNavigationItems = (): NavigationGroup[] => {
  return [
    {
      items: [
        { 
          label: 'AppLayout:navigation.dashboard', 
          path: '/dashboard', 
          icon: Home 
        },
        { 
          label: 'AppLayout:navigation.cashAccounts', 
          path: '/cash-accounts', 
          icon: Wallet,
          requiresSubscription: true
        },
        { 
          label: 'AppLayout:navigation.accounts', 
          path: '/accounts', 
          icon: CreditCard,
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
          icon: FolderClosed,
          requiresSubscription: true
        },
        { 
          label: 'AppLayout:navigation.categoryTemplates', 
          path: '/category-templates', 
          icon: Bookmark,
          requiresSubscription: true
        },
        { 
          label: 'AppLayout:navigation.analytics', 
          path: '/analytics', 
          icon: BarChart3,
          requiresSubscription: true
        },
      ]
    },
    {
      title: 'Subscription:management.title',
      items: [
        {
          label: 'Subscription:management.navigation.dashboard',
          path: '/subscription/dashboard',
          icon: LayoutDashboard
        },
        {
          label: 'Subscription:management.navigation.plans',
          path: '/subscription/plans',
          icon: Package
        },
        {
          label: 'Subscription:management.navigation.billing',
          path: '/subscription/billing',
          icon: CreditCard
        },
        {
          label: 'Subscription:management.navigation.settings',
          path: '/subscription/settings',
          icon: Settings
        }
      ]
    },
    {
      items: [
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
      ]
    }
  ];
};
