
import i18n from 'i18next';

// English resources
import enHero from './locales/en/hero.json';
import enFeatures from './locales/en/features.json';
import enCta from './locales/en/cta.json';
import enNav from './locales/en/nav.json';
import enFooter from './locales/en/footer.json';

// Turkish resources
import trHero from './locales/tr/hero.json';
import trFeatures from './locales/tr/features.json';
import trCta from './locales/tr/cta.json';
import trNav from './locales/tr/nav.json';
import trFooter from './locales/tr/footer.json';

// Initialize landing page module translations
export const initLandingPageTranslations = () => {
  // i18n'in başlatılmış olduğundan emin olmak için kontrol edelim
  if (!i18n.isInitialized) {
    console.warn("i18n henüz başlatılmadı, LandingPage çevirileri daha sonra eklenecek");
    
    // i18n başlatıldığında çevirileri ekleyelim
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addLandingPageResources();
      return result;
    };
    
    return;
  }
  
  // i18n başlatılmışsa, çevirileri hemen ekleyelim
  addLandingPageResources();
};

// LandingPage resource bundle'larını ekleyen yardımcı fonksiyon
function addLandingPageResources() {
  try {
    // İngilizce kaynakları ekle
    i18n.addResourceBundle('en', 'LandingPage', {
      hero: enHero,
      features: enFeatures,
      cta: enCta,
      nav: enNav,
      footer: enFooter
    }, true, true);

    // Türkçe kaynakları ekle
    i18n.addResourceBundle('tr', 'LandingPage', {
      hero: trHero,
      features: trFeatures,
      cta: trCta,
      nav: trNav,
      footer: trFooter
    }, true, true);
    
    console.log("LandingPage çevirileri başarıyla eklendi");
  } catch (error) {
    console.error("LandingPage çevirileri eklenirken hata oluştu:", error);
  }
}

// Modül yüklendiğinde çevirileri otomatik olarak başlat
initLandingPageTranslations();
