
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
import { CSS_CLASSES, SPACING, TRANSITION } from './constants';

export const UserActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.UserActions');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const { isExpanded, isMobile, isHovering } = useSidebarContext();
  
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
  
  logger.debug('UserActions component rendered', { isExpanded, isMobile, isHovering });

  // Daraltılmış sidebar ve hover olmadığında - içerik icon olarak görünür
  if (!isExpanded && !isMobile && !isHovering) {
    return (
      <div className={cn(
        SPACING.SECTION,
        "border-t flex flex-col gap-2",
        CSS_CLASSES.COLORS.BORDER,
        CSS_CLASSES.TRANSITIONS.BASE
      )}>
        <TooltipProvider delayDuration={TRANSITION.TOOLTIP_DELAY}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <LanguageSelector className={cn(
                  "w-full",
                  CSS_CLASSES.COLLAPSED.ICON_ONLY,
                  CSS_CLASSES.COLORS.TEXT,
                  CSS_CLASSES.COLORS.ACCENT_HOVER,
                  "transition-all"
                )} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('AppLayout:sidebar.changeLanguage')}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle className={cn(
                  "w-full",
                  CSS_CLASSES.COLLAPSED.ICON_ONLY,
                  CSS_CLASSES.COLORS.TEXT,
                  CSS_CLASSES.COLORS.ACCENT_HOVER,
                  "transition-all"
                )} />
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
                  variant="ghost" 
                  className={cn(
                    "w-full",
                    CSS_CLASSES.COLLAPSED.ICON_ONLY,
                    CSS_CLASSES.COLORS.TEXT,
                    CSS_CLASSES.COLORS.ACCENT_HOVER,
                    "transition-all"
                  )}
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                >
                  <LogOut size={SPACING.ICON_SIZE} />
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

  // Mobil görünümde eğer sidebar kapalıysa hiçbir şey gösterme
  if (isMobile && !isExpanded) {
    return null;
  }

  // Normal görünüm (genişletilmiş sidebar veya hover durumu)
  return (
    <div className={cn(
      SPACING.SECTION,
      "border-t flex flex-col gap-2",
      CSS_CLASSES.COLORS.BORDER,
      CSS_CLASSES.TRANSITIONS.BASE,
      (!isExpanded && !isHovering && !isMobile) && CSS_CLASSES.COLLAPSED.CONTENT_HIDDEN
    )}>
      <LanguageSelector className={cn(
        "w-full",
        CSS_CLASSES.COLLAPSED.WITH_TEXT,
        CSS_CLASSES.COLORS.TEXT,
        CSS_CLASSES.COLORS.ACCENT_HOVER,
        "transition-all"
      )} />
      <ThemeToggle className={cn(
        "w-full",
        CSS_CLASSES.COLLAPSED.WITH_TEXT,
        CSS_CLASSES.COLORS.TEXT,
        CSS_CLASSES.COLORS.ACCENT_HOVER,
        "transition-all"
      )} />
      <Button 
        variant="ghost" 
        className={cn(
          "w-full",
          CSS_CLASSES.COLLAPSED.WITH_TEXT,
          CSS_CLASSES.COLORS.TEXT,
          CSS_CLASSES.COLORS.ACCENT_HOVER,
          SPACING.ITEM_GAP,
          "transition-all"
        )}
        onClick={handleSignOut}
        disabled={isLoggingOut}
      >
        <LogOut size={SPACING.ICON_SIZE} />
        {isLoggingOut ? t('common:loggingOut') : t('common:logout')}
      </Button>
    </div>
  );
};
