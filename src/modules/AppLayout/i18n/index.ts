
import i18n from 'i18next';

// Import translations
import * as navigationEN from './locales/en/navigation.json';
import * as navigationTR from './locales/tr/navigation.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';

export const initAppLayoutTranslations = () => {
  // Add resources if they don't exist yet
  if (!i18n.hasResourceBundle('en', 'AppLayout')) {
    i18n.addResourceBundle('en', 'AppLayout', {
      navigation: navigationEN,
      errors: errorsEN,
    });
  }
  
  if (!i18n.hasResourceBundle('tr', 'AppLayout')) {
    i18n.addResourceBundle('tr', 'AppLayout', {
      navigation: navigationTR,
      errors: errorsTR,
    });
  }
};

export default initAppLayoutTranslations;
