
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarContext } from '../../Sidebar/context/SidebarContext';
import { cn } from '@/lib/utils';

interface HeaderBrandingProps {
  className?: string;
}

export const HeaderBranding: React.FC<HeaderBrandingProps> = ({ className }) => {
  const { t } = useTranslation(['common']);
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t('AppLayout:sidebar.toggleMenu')}
        onClick={() => toggleSidebar()}
        className="text-foreground md:hidden h-8 w-8"
      >
        <Menu size={18} />
      </Button>
      
      <h1 className="text-lg font-bold bg-gradient-to-r from-[rgb(84,85,89)] via-[rgb(108,154,229)] to-[rgb(0,140,158)] dark:from-[hsl(210,13%,40%)] dark:via-[hsl(185,94%,7%)] dark:to-[hsl(185,100%,15%)] bg-clip-text text-transparent">
        {t('common:brandName')}
      </h1>
    </div>
  );
};
