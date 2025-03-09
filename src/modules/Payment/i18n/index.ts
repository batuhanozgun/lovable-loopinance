
import i18n from 'i18next';
import { paymentEn, errorsEn } from './locales/en';
import { paymentTr, errorsTr } from './locales/tr';

/**
 * Payment modülü çevirilerini i18n nesnesine ekler
 */
export const initPaymentTranslations = (): void => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, Payment çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addPaymentResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addPaymentResources();
};

// Payment kaynak paketlerini ekleme yardımcı fonksiyonu
function addPaymentResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'Payment', paymentEn, true, true);
    i18n.addResourceBundle('en', 'PaymentErrors', errorsEn, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'Payment', paymentTr, true, true);
    i18n.addResourceBundle('tr', 'PaymentErrors', errorsTr, true, true);
    
    console.log("Payment çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("Payment çevirileri eklenirken hata oluştu:", error);
  }
}

// Re-export all translation files for better access
export { paymentEn, errorsEn } from './locales/en';
export { paymentTr, errorsTr } from './locales/tr';

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initPaymentTranslations();
