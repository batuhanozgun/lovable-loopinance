
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
  // Add landing page namespace resources
  i18n.addResourceBundle('en', 'LandingPage', {
    hero: enHero,
    features: enFeatures,
    cta: enCta,
    nav: enNav,
    footer: enFooter
  }, true, true);

  i18n.addResourceBundle('tr', 'LandingPage', {
    hero: trHero,
    features: trFeatures,
    cta: trCta,
    nav: trNav,
    footer: trFooter
  }, true, true);
};
