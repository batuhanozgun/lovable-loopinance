
import i18n from 'i18next';

// İngilizce kaynaklar
import cashAccountsEN from './locales/en/cashAccounts.json';
import errorsEN from './locales/en/errors.json';
import formsEN from './locales/en/forms.json';
import validationEN from './locales/en/validation.json';

// Türkçe kaynaklar
import cashAccountsTR from './locales/tr/cashAccounts.json';
import errorsTR from './locales/tr/errors.json';
import formsTR from './locales/tr/forms.json';
import validationTR from './locales/tr/validation.json';

// CashAccounts modülü çevirilerini başlat
export const initCashAccountsTranslations = () => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, CashAccounts çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addCashAccountsResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addCashAccountsResources();
};

// CashAccounts kaynak paketlerini ekleme yardımcı fonksiyonu
function addCashAccountsResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'CashAccounts', {
      ...cashAccountsEN,
      errors: errorsEN,
      forms: formsEN,
      validation: validationEN
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'CashAccounts', {
      ...cashAccountsTR,
      errors: errorsTR,
      forms: formsTR,
      validation: validationTR
    }, true, true);
    
    console.log("CashAccounts çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("CashAccounts çevirileri eklenirken hata oluştu:", error);
  }
}

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initCashAccountsTranslations();

export default initCashAccountsTranslations;
