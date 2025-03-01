
import i18n from 'i18next';

// Çevirileri içe aktar
import * as contentEN from './locales/en/content.json';
import * as contentTR from './locales/tr/content.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';
import * as messagesEN from './locales/en/messages.json';
import * as messagesTR from './locales/tr/messages.json';

export const initProfileTranslations = () => {
  // Kaynaklar henüz yoksa ekle
  if (!i18n.hasResourceBundle('en', 'Profile')) {
    i18n.addResourceBundle('en', 'Profile', {
      ...contentEN,
      errors: errorsEN,
      messages: messagesEN,
    });
  }
  
  if (!i18n.hasResourceBundle('tr', 'Profile')) {
    i18n.addResourceBundle('tr', 'Profile', {
      ...contentTR,
      errors: errorsTR,
      messages: messagesTR,
    });
  }
};

export default initProfileTranslations;
