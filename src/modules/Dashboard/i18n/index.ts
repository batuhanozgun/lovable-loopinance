
import i18n from 'i18next';

// Import translations
import * as dashboardEN from './locales/en/dashboard.json';
import * as dashboardTR from './locales/tr/dashboard.json';

export const initDashboardTranslations = () => {
  // Burada i18n'in initialize edilip edilmediğini kontrol edelim
  if (i18n.isInitialized) {
    // Add resources if they don't exist yet
    if (!i18n.hasResourceBundle('en', 'Dashboard')) {
      i18n.addResourceBundle('en', 'Dashboard', dashboardEN);
    }
    
    if (!i18n.hasResourceBundle('tr', 'Dashboard')) {
      i18n.addResourceBundle('tr', 'Dashboard', dashboardTR);
    }
  } else {
    console.warn('i18n is not initialized yet, dashboard translations will be loaded later');
  }
};

export default initDashboardTranslations;
