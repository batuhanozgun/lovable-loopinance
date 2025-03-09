
import { useTranslation } from 'react-i18next';

/**
 * Abonelik ile ilgili dil ve para birimi bilgilerini sağlayan hook
 */
export const useSubscriptionLocale = () => {
  const { i18n } = useTranslation(['Subscription', 'common']);
  
  // Kullanıcının diline göre para birimi ve biçim belirle
  const locale = i18n.language.startsWith('tr') ? 'tr-TR' : 'en-US';
  const currency = i18n.language.startsWith('tr') ? 'TRY' : 'USD';
  const monthlyPrice = i18n.language.startsWith('tr') ? 49 : 4.99;
  const yearlyPrice = i18n.language.startsWith('tr') ? 39 : 3.99;
  
  return {
    locale,
    currency,
    monthlyPrice,
    yearlyPrice,
    isTurkish: i18n.language.startsWith('tr')
  };
};
