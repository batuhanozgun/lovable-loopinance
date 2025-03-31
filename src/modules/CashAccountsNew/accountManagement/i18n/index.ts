
import i18n from 'i18next';

// İngilizce kaynaklar
import accountManagementEN from './locales/en/accountManagement.json';
import errorsEN from './locales/en/errors.json';

// Türkçe kaynaklar
import accountManagementTR from './locales/tr/accountManagement.json';
import errorsTR from './locales/tr/errors.json';

// AccountManagement modülü çevirilerini başlat
export const initAccountManagementTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, AccountManagement çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addAccountManagementResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addAccountManagementResources();
};

// AccountManagement kaynak paketlerini ekleme yardımcı fonksiyonu
function addAccountManagementResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'AccountManagement', {
      ...accountManagementEN,
      errors: errorsEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'AccountManagement', {
      ...accountManagementTR,
      errors: errorsTR
    }, true, true);
    
    console.log("AccountManagement çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("AccountManagement çevirileri eklenirken hata oluştu:", error);
  }
}

export default initAccountManagementTranslations;
