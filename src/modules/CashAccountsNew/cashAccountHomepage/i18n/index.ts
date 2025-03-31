
import i18n from 'i18next';

// İngilizce kaynaklar
import cashAccountHomepageEN from './locales/en/cashAccountHomepage.json';
import errorsEN from './locales/en/errors.json';

// Türkçe kaynaklar
import cashAccountHomepageTR from './locales/tr/cashAccountHomepage.json';
import errorsTR from './locales/tr/errors.json';

/**
 * CashAccountHomepage modülü çevirilerini başlat
 */
export const initCashAccountHomepageTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, CashAccountHomepage çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addCashAccountHomepageResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addCashAccountHomepageResources();
};

// CashAccountHomepage kaynak paketlerini ekleme yardımcı fonksiyonu
function addCashAccountHomepageResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'CashAccountHomepage', {
      ...cashAccountHomepageEN,
      errors: errorsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'CashAccountHomepage', {
      ...cashAccountHomepageTR,
      errors: errorsTR
    }, true, true);
    
    console.log("CashAccountHomepage çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("CashAccountHomepage çevirileri eklenirken hata oluştu:", error);
  }
}

export default initCashAccountHomepageTranslations;
