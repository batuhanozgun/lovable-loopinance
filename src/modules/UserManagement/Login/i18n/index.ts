
import i18n from 'i18next';

// English resources
import messagesEN from './locales/en/messages.json';
import errorsEN from './locales/en/errors.json';
import uiEN from './locales/en/ui.json';
import contentEN from './locales/en/content.json';

// Turkish resources
import messagesTR from './locales/tr/messages.json';
import errorsTR from './locales/tr/errors.json';
import uiTR from './locales/tr/ui.json';
import contentTR from './locales/tr/content.json';

// Initialize login module translations
export const initLoginTranslations = () => {
  // Check if i18n is initialized
  if (!i18n.isInitialized) {
    console.warn("i18n not yet initialized, Login translations will be added later");
    
    // Add translations once i18n is initialized
    const originalInit = i18n.init;
    i18n.init = function(...args) {
      const result = originalInit.apply(this, args);
      addLoginResources();
      return result;
    };
    
    return;
  }
  
  // If i18n is already initialized, add translations immediately
  addLoginResources();
};

// Helper function to add Login resource bundles
function addLoginResources() {
  try {
    // Add English resources
    i18n.addResourceBundle('en', 'Login', {
      messages: messagesEN,
      errors: errorsEN,
      ui: uiEN,
      content: contentEN
    }, true, true);

    // Add Turkish resources
    i18n.addResourceBundle('tr', 'Login', {
      messages: messagesTR,
      errors: errorsTR,
      ui: uiTR,
      content: contentTR
    }, true, true);
    
    console.log("Login translations successfully added");
  } catch (error) {
    console.error("Error adding Login translations:", error);
  }
}

// Automatically initialize translations when module is loaded
initLoginTranslations();
