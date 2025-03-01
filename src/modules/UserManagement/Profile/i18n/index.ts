
import i18n from 'i18next';

// Çevirileri içe aktar
import * as contentEN from './locales/en/content.json';
import * as contentTR from './locales/tr/content.json';
import * as errorsEN from './locales/en/errors.json';
import * as errorsTR from './locales/tr/errors.json';
import * as messagesEN from './locales/en/messages.json';
import * as messagesTR from './locales/tr/messages.json';

export const initProfileTranslations = () => {
  // i18n başlatıldı mı kontrol et
  if (i18n.isInitialized) {
    try {
      // Profile namespace'i zaten config.ts'de başlatıldı,
      // eğer orada yüklenmemişse buradan eklemeyi dene
      if (!i18n.exists('Profile:title', { lng: 'en' })) {
        console.log('Profile çevirileri ekleniyor (EN)');
        i18n.addResourceBundle('en', 'Profile', {
          ...contentEN,
          errors: errorsEN,
          messages: messagesEN,
        }, true, true);
      }
      
      if (!i18n.exists('Profile:title', { lng: 'tr' })) {
        console.log('Profile çevirileri ekleniyor (TR)');
        i18n.addResourceBundle('tr', 'Profile', {
          ...contentTR,
          errors: errorsTR,
          messages: messagesTR,
        }, true, true);
      }
    } catch (error) {
      console.warn('Profile çevirileri yüklenirken hata:', error);
    }
  } else {
    console.warn('i18n henüz başlatılmadı, profil çevirileri daha sonra yüklenecek');
  }
};

export default initProfileTranslations;
