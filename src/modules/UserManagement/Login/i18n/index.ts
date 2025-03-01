
import i18n from 'i18next';

// English resources
import messagesEN from './locales/en/messages.json';
import errorsEN from './locales/en/errors.json';
import uiEN from './locales/en/ui.json';
import contentEN from './locales/en/content.json';

// Turkish resources
import messagesTR from './locales/tr/messages.json';
import errorsTR from './locales/tr/errors.json';
import uiTR from './locales/tr/ui.json';
import contentTR from './locales/tr/content.json';

// Initialize login module translations
export const initLoginTranslations = () => {
  // i18n'in başlatılmış olduğundan emin olmak için kontrol edelim
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, Login çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekleyelim
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addLoginResources();
      return result;
    };
    
    return;
  }
  
  // i18n başlatılmışsa, çevirileri hemen ekleyelim
  addLoginResources();
};

// Login resource bundle'larını ekleyen yardımcı fonksiyon
function addLoginResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'Login', {
      messages: messagesEN,
      errors: errorsEN,
      ui: uiEN,
      content: contentEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'Login', {
      messages: messagesTR,
      errors: errorsTR,
      ui: uiTR,
      content: contentTR
    }, true, true);
    
    console.log("Login çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("Login çevirileri eklenirken hata oluştu:", error);
  }
}

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initLoginTranslations();
