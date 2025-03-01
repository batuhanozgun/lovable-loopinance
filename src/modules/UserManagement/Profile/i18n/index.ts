
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
    // Kaynaklar henüz yoksa ekle (hasResourceBundle yerine daha güvenli bir kontrol)
    try {
      // İngilizce çeviriler
      if (!i18n.exists('Profile:title', { lng: 'en' })) {
        i18n.addResourceBundle('en', 'Profile', {
          ...contentEN,
          errors: errorsEN,
          messages: messagesEN,
        });
      }
      
      // Türkçe çeviriler
      if (!i18n.exists('Profile:title', { lng: 'tr' })) {
        i18n.addResourceBundle('tr', 'Profile', {
          ...contentTR,
          errors: errorsTR,
          messages: messagesTR,
        });
      }
    } catch (error) {
      console.warn('Profile çevirileri yüklenirken hata:', error);
    }
  } else {
    console.warn('i18n henüz başlatılmadı, profil çevirileri daha sonra yüklenecek');
  }
};

export default initProfileTranslations;
