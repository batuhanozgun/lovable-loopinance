
import i18n from 'i18next';

// Import translations
import * as styleGuideEN from './locales/en/styleGuide.json';
import * as styleGuideTR from './locales/tr/styleGuide.json';

export const initStyleGuideTranslations = () => {
  // Add resources if they don't exist yet
  if (!i18n.hasResourceBundle('en', 'StyleGuide')) {
    i18n.addResourceBundle('en', 'StyleGuide', {
      styleGuide: styleGuideEN,
    });
  }
  
  if (!i18n.hasResourceBundle('tr', 'StyleGuide')) {
    i18n.addResourceBundle('tr', 'StyleGuide', {
      styleGuide: styleGuideTR,
    });
  }
};

export default initStyleGuideTranslations;
