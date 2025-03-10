
import i18n from 'i18next';

export const initCashAccountsTranslations = () => {
  // Add resources if they don't exist yet
  if (!i18n.hasResourceBundle('en', 'CashAccounts')) {
    i18n.addResourceBundle('en', 'CashAccounts', {
      ...require('./locales/en/cashAccounts.json'),
      ...require('./locales/en/errors.json'),
      ...require('./locales/en/forms.json'),
      ...require('./locales/en/validation.json'),
    });
  }
  
  if (!i18n.hasResourceBundle('tr', 'CashAccounts')) {
    i18n.addResourceBundle('tr', 'CashAccounts', {
      ...require('./locales/tr/cashAccounts.json'),
      ...require('./locales/tr/errors.json'),
      ...require('./locales/tr/forms.json'),
      ...require('./locales/tr/validation.json'),
    });
  }
};

export default initCashAccountsTranslations;
