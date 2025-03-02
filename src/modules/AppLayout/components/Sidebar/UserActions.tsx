
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        "border-t flex flex-col gap-2 mt-auto", // mt-auto ile en alta yerleştirildi
        CSS_CLASSES.COLORS.BORDER,
        CSS_CLASSES.TRANSITIONS.BASE
      )}>
        <TooltipProvider delayDuration={TRANSITION.TOOLTIP_DELAY}>
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
                    CSS_CLASSES.TRANSITIONS.BASE
                  )}
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                >
                  <LogOut size={SPACING.ICON_SIZE} className={CSS_CLASSES.COLLAPSED.ICON} />
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
      "border-t flex flex-col gap-2 mt-auto", // mt-auto ile en alta yerleştirildi
      CSS_CLASSES.COLORS.BORDER,
      CSS_CLASSES.TRANSITIONS.BASE,
      // Daraltılmış durumdaki görünürlüğü doğru transition ile ayarlıyoruz
      (!isExpanded && !isHovering && !isMobile) && "opacity-0 invisible"
    )}>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full",
          CSS_CLASSES.COLLAPSED.WITH_TEXT,
          CSS_CLASSES.COLORS.TEXT,
          CSS_CLASSES.COLORS.ACCENT_HOVER,
          SPACING.ITEM_GAP,
          CSS_CLASSES.TRANSITIONS.BASE
        )}
        onClick={handleSignOut}
        disabled={isLoggingOut}
      >
        <LogOut size={SPACING.ICON_SIZE} />
        <span className={CSS_CLASSES.TRANSITIONS.OPACITY}>
          {isLoggingOut ? t('common:loggingOut') : t('common:logout')}
        </span>
      </Button>
    </div>
  );
};
