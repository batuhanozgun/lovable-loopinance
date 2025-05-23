
import i18n from 'i18next';

// İngilizce kaynaklar
import messagesEN from './locales/en/messages.json';
import notificationsEN from './locales/en/notifications.json';
import uiEN from './locales/en/ui.json';

// Türkçe kaynaklar
import messagesTR from './locales/tr/messages.json';
import notificationsTR from './locales/tr/notifications.json';
import uiTR from './locales/tr/ui.json';

// OAuth modülü çevirilerini başlat
export const initOAuthTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, OAuth çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addOAuthResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addOAuthResources();
};

// OAuth kaynak paketlerini ekleme yardımcı fonksiyonu
function addOAuthResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'OAuth', {
      messages: messagesEN,
      notifications: notificationsEN,
      ui: uiEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'OAuth', {
      messages: messagesTR,
      notifications: notificationsTR,
      ui: uiTR
    }, true, true);
    
    console.log("OAuth çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("OAuth çevirileri eklenirken hata oluştu:", error);
  }
}

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initOAuthTranslations();
