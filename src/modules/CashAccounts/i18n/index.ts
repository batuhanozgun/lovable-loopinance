
import i18n from 'i18next';

// Import translations
import * as cashAccountsEN from './locales/en/cashAccounts.json';
import * as cashAccountsTR from './locales/tr/cashAccounts.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';
import * as formsEN from './locales/en/forms.json';
import * as formsTR from './locales/tr/forms.json';
import * as validationEN from './locales/en/validation.json';
import * as validationTR from './locales/tr/validation.json';

export const initCashAccountsTranslations = () => {
  // Add resources if they don't exist yet
  if (!i18n.hasResourceBundle('en', 'CashAccounts')) {
    i18n.addResourceBundle('en', 'CashAccounts', {
      cashAccounts: cashAccountsEN,
      errors: errorsEN,
      forms: formsEN,
      validation: validationEN,
    });
  }
  
  if (!i18n.hasResourceBundle('tr', 'CashAccounts')) {
    i18n.addResourceBundle('tr', 'CashAccounts', {
      cashAccounts: cashAccountsTR,
      errors: errorsTR,
      forms: formsTR,
      validation: validationTR,
    });
  }
};

export default initCashAccountsTranslations;
