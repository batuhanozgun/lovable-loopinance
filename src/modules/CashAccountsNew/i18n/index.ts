
import i18n from 'i18next';

// Import locales
import cashAccountsEn from './locales/en/cashAccounts.json';
import cashAccountsTr from './locales/tr/cashAccounts.json';
import formsEn from './locales/en/forms.json';
import formsTr from './locales/tr/forms.json';
import validationEn from './locales/en/validation.json';
import validationTr from './locales/tr/validation.json';
import errorsEn from './locales/en/errors.json';
import errorsTr from './locales/tr/errors.json';

// Initialize i18n resources for CashAccountsNew
export const initCashAccountsNewTranslations = (): void => {
  // Add resources only if they don't exist yet
  if (!i18n.hasResourceBundle('en', 'CashAccountsNew')) {
    i18n.addResourceBundle('en', 'CashAccountsNew', cashAccountsEn);
    i18n.addResourceBundle('en', 'CashAccountsNew.forms', formsEn);
    i18n.addResourceBundle('en', 'CashAccountsNew.validation', validationEn);
    i18n.addResourceBundle('en', 'CashAccountsNew.errors', errorsEn);
  }

  if (!i18n.hasResourceBundle('tr', 'CashAccountsNew')) {
    i18n.addResourceBundle('tr', 'CashAccountsNew', cashAccountsTr);
    i18n.addResourceBundle('tr', 'CashAccountsNew.forms', formsTr);
    i18n.addResourceBundle('tr', 'CashAccountsNew.validation', validationTr);
    i18n.addResourceBundle('tr', 'CashAccountsNew.errors', errorsTr);
  }
};

export default initCashAccountsNewTranslations;
