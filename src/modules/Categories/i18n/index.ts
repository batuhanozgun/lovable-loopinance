
import i18next from 'i18next';

// İngilizce çeviriler
import categories_en from './locales/en/categories.json';
import validation_en from './locales/en/validation.json';
import errors_en from './locales/en/errors.json';
import messages_en from './locales/en/messages.json';
import styleGuide_en from './locales/en/styleGuide.json';

// Türkçe çeviriler
import categories_tr from './locales/tr/categories.json';
import validation_tr from './locales/tr/validation.json';
import errors_tr from './locales/tr/errors.json';
import messages_tr from './locales/tr/messages.json';
import styleGuide_tr from './locales/tr/styleGuide.json';

// Çevirileri i18next'e yükle
export const loadTranslations = (): void => {
  i18next.addResourceBundle('en', 'Categories', categories_en, true, true);
  i18next.addResourceBundle('en', 'Validation', validation_en, true, true);
  i18next.addResourceBundle('en', 'Errors', errors_en, true, true);
  i18next.addResourceBundle('en', 'Messages', messages_en, true, true);
  i18next.addResourceBundle('en', 'CategoriesStyleGuide', styleGuide_en, true, true);

  i18next.addResourceBundle('tr', 'Categories', categories_tr, true, true);
  i18next.addResourceBundle('tr', 'Validation', validation_tr, true, true);
  i18next.addResourceBundle('tr', 'Errors', errors_tr, true, true);
  i18next.addResourceBundle('tr', 'Messages', messages_tr, true, true);
  i18next.addResourceBundle('tr', 'CategoriesStyleGuide', styleGuide_tr, true, true);
};
