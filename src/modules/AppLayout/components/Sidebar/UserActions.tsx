
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthService } from '@/modules/UserManagement/common/services/AuthService';
import { useToast } from '@/hooks/use-toast';
import { useSidebarContext } from './context/SidebarContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const UserActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.UserActions');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const { isExpanded } = useSidebarContext();
  
  const handleSignOut = async () => {
    try {
      logger.info('User initiated sign out');
      setIsLoggingOut(true);
      await AuthService.signOut();
      // Toast ekleme gerekli değil çünkü başarılı çıkış sonrası sayfa değişecek
    } catch (error) {
      logger.error('Error during sign out', error);
      toast({
        title: t('common:error'),
        description: t('AppLayout:errors.logoutFailed'),
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  logger.debug('UserActions component rendered', { isExpanded });

  // Daraltılmış sidebar için özel UI
  if (!isExpanded) {
    return (
      <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <LanguageSelector className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('AppLayout:sidebar.changeLanguage')}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('AppLayout:sidebar.changeTheme')}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button 
                  variant="outline" 
                  className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" 
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                >
                  <LogOut size={18} />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('common:logout')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Normal görünüm (genişletilmiş sidebar)
  return (
    <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
      <LanguageSelector className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
      <ThemeToggle className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground" />
      <Button 
        variant="outline" 
        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground gap-2" 
        onClick={handleSignOut}
        disabled={isLoggingOut}
      >
        <LogOut size={18} />
        {isLoggingOut ? t('common:loggingOut') : t('common:logout')}
      </Button>
    </div>
  );
};
