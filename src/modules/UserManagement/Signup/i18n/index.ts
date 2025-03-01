
import i18n from 'i18next';

// İngilizce kaynaklar
import messagesEN from './locales/en/messages.json';
import errorsEN from './locales/en/validation.json';
import uiEN from './locales/en/ui.json';
import contentEN from './locales/en/content.json';
import notificationsEN from './locales/en/notifications.json';

// Türkçe kaynaklar
import messagesTR from './locales/tr/messages.json';
import errorsTR from './locales/tr/validation.json';
import uiTR from './locales/tr/ui.json';
import contentTR from './locales/tr/content.json';
import notificationsTR from './locales/tr/notifications.json';

// Signup modülü çevirilerini başlat
export const initSignupTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, Signup çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addSignupResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addSignupResources();
};

// Signup kaynak paketlerini ekleme yardımcı fonksiyonu
function addSignupResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'Signup', {
      messages: messagesEN,
      validation: errorsEN,
      ui: uiEN,
      content: contentEN,
      notifications: notificationsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'Signup', {
      messages: messagesTR,
      validation: errorsTR,
      ui: uiTR,
      content: contentTR,
      notifications: notificationsTR
    }, true, true);
    
    console.log("Signup çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("Signup çevirileri eklenirken hata oluştu:", error);
  }
}

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initSignupTranslations();
