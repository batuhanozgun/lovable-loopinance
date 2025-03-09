
import { useTranslation } from 'react-i18next';

/**
 * Abonelik için yerel dil ve para birimi ayarlarını döndüren hook
 */
export const useSubscriptionLocale = () => {
  const { i18n } = useTranslation();
  
  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  
  return {
    locale,
    currency,
    isTurkish: i18n.language.startsWith('tr')
  };
};
