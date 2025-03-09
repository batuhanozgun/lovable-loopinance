
import i18n from 'i18next';

// İngilizce kaynaklar
import subscriptionEN from './locales/en/subscription.json';
import errorsEN from './locales/en/errors.json';

// Türkçe kaynaklar
import subscriptionTR from './locales/tr/subscription.json';
import errorsTR from './locales/tr/errors.json';

/**
 * Subscription modülü çevirilerini i18n nesnesine ekler
 */
export const initSubscriptionTranslations = (): void => {
  // i18n'in başlatılıp başlatılmadığını kontrol et
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, Subscription çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekle
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addSubscriptionResources();
      return result;
    };
    
    return;
  }
  
  // i18n zaten başlatılmışsa, çevirileri hemen ekle
  addSubscriptionResources();
};

// Subscription kaynak paketlerini ekleme yardımcı fonksiyonu
function addSubscriptionResources() {
  try {
    // İngilizce kaynakları ekle - namespace'leri düzeltiyoruz
    i18n.addResourceBundle('en', 'Subscription', subscriptionEN, true, true);
    i18n.addResourceBundle('en', 'SubscriptionErrors', errorsEN, true, true);

    // Türkçe kaynakları ekle - namespace'leri düzeltiyoruz
    i18n.addResourceBundle('tr', 'Subscription', subscriptionTR, true, true);
    i18n.addResourceBundle('tr', 'SubscriptionErrors', errorsTR, true, true);
    
    console.log("Subscription çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("Subscription çevirileri eklenirken hata oluştu:", error);
  }
}

// Re-export translation files for better access
export { subscriptionEN, errorsEN } from './locales/en';
export { subscriptionTR, errorsTR } from './locales/tr';

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initSubscriptionTranslations();
