
import i18n from 'i18next';
import { paymentEn, errorsEn } from './locales/en';
import { paymentTr, errorsTr } from './locales/tr';

/**
 * Payment modülü çevirilerini i18n nesnesine ekler
 */
export const initPaymentTranslations = (): void => {
  i18n.addResourceBundle('en', 'Payment', paymentEn);
  i18n.addResourceBundle('en', 'PaymentErrors', errorsEn);
  i18n.addResourceBundle('tr', 'Payment', paymentTr);
  i18n.addResourceBundle('tr', 'PaymentErrors', errorsTr);
};

// Re-export all translation files
export * from './locales/en';
export * from './locales/tr';
