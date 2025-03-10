
import i18n from 'i18next';

// English resources
import enHero from './locales/en/hero.json';
import enFeatures from './locales/en/features.json';
import enPricing from './locales/en/pricing.json';
import enCta from './locales/en/cta.json';
import enNav from './locales/en/nav.json';
import enFooter from './locales/en/footer.json';

// Turkish resources
import trHero from './locales/tr/hero.json';
import trFeatures from './locales/tr/features.json';
import trPricing from './locales/tr/pricing.json';
import trCta from './locales/tr/cta.json';
import trNav from './locales/tr/nav.json';
import trFooter from './locales/tr/footer.json';

// Initialize landing page module translations
export const initLandingPageTranslations = () => {
  // Check if i18n is initialized
  if (!i18n.isInitialized) {
    console.warn("i18n not yet initialized, LandingPage translations will be added later");
    
    // Add translations once i18n is initialized
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addLandingPageResources();
      return result;
    };
    
    return;
  }
  
  // If i18n is already initialized, add translations immediately
  addLandingPageResources();
};

// Helper function to add LandingPage resource bundles
function addLandingPageResources() {
  try {
    // Add English resources
    i18n.addResourceBundle('en', 'LandingPage', {
      hero: enHero,
      features: enFeatures,
      pricing: enPricing,
      cta: enCta,
      nav: enNav,
      footer: enFooter
    }, true, true);

    // Add Turkish resources
    i18n.addResourceBundle('tr', 'LandingPage', {
      hero: trHero,
      features: trFeatures,
      pricing: trPricing,
      cta: trCta,
      nav: trNav,
      footer: trFooter
    }, true, true);
    
    console.log("LandingPage translations successfully added");
  } catch (error) {
    console.error("Error adding LandingPage translations:", error);
  }
}

// Automatically initialize translations when module is loaded
initLandingPageTranslations();
