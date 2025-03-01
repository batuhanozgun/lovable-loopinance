
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoggerService } from '@/modules/Logging/services/LoggerService';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthService } from '@/modules/UserManagement/common/services/AuthService';
import { useToast } from '@/hooks/use-toast';

export const UserActions: React.FC = () => {
  const { t } = useTranslation(['AppLayout', 'common']);
  const logger = LoggerService.getInstance('AppLayout.UserActions');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  
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
  
  logger.debug('UserActions component rendered');

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
