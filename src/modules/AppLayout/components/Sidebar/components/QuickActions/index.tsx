
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarContext } from '../../context/SidebarContext';
import { cn } from '@/lib/utils';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.QuickActions');
  const { isExpanded, showQuickActions, toggleQuickActions } = useSidebarContext();
  
  logger.debug('QuickActions rendered', { isExpanded, showQuickActions });

  // QuickActions henüz implemente edilmedi, gelecek aşamalarda eklenecek
  // Şimdilik sadece toggle butonu gösteriyoruz
  return (
    <div className="px-3 py-2 border-t border-sidebar-border">
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent",
          !isExpanded && "justify-center"
        )}
        onClick={toggleQuickActions}
      >
        {isExpanded && <span>{t('AppLayout:sidebar.quickActions')}</span>}
        {showQuickActions ? <X size={18} /> : <Plus size={18} />}
      </Button>

      {/* QuickActions menüsü gelecekte buraya eklenecek */}
      {showQuickActions && isExpanded && (
        <div className="mt-2 p-2 bg-sidebar-accent rounded-md">
          <p className="text-sm text-sidebar-foreground">{t('AppLayout:sidebar.comingSoon')}</p>
        </div>
      )}
    </div>
  );
};
