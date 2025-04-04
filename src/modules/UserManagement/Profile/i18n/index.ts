
import i18n from 'i18next';

// Çevirileri içe aktar
// Views
import * as profileViewTR from './locales/tr/views/ProfileView.json';
import * as profileViewEN from './locales/en/views/ProfileView.json';

// Components
import * as profileInfoTR from './locales/tr/components/ProfileInfo.json';
import * as profileInfoEN from './locales/en/components/ProfileInfo.json';
import * as accountSettingsTR from './locales/tr/components/AccountSettings.json';
import * as accountSettingsEN from './locales/en/components/AccountSettings.json';
import * as subscriptionInfoTR from './locales/tr/components/SubscriptionInfo.json';
import * as subscriptionInfoEN from './locales/en/components/SubscriptionInfo.json';
import * as passwordChangeDialogTR from './locales/tr/components/PasswordChangeDialog.json';
import * as passwordChangeDialogEN from './locales/en/components/PasswordChangeDialog.json';

// Errors ve messages
import * as errorsTR from './locales/tr/errors.json';
import * as errorsEN from './locales/en/errors.json';
import * as messagesTR from './locales/tr/messages.json';
import * as messagesEN from './locales/en/messages.json';

export const initProfileTranslations = () => {
  // i18n başlatıldı mı kontrol et
  if (i18n.isInitialized) {
    try {
      // Ana namespace
      i18n.addResourceBundle('tr', 'Profile', {
        // Views
        ProfileView: profileViewTR,
        // Components
        ProfileInfo: profileInfoTR,
        AccountSettings: accountSettingsTR,
        SubscriptionInfo: subscriptionInfoTR,
        PasswordChangeDialog: passwordChangeDialogTR,
        // Errors ve messages
        errors: errorsTR,
        messages: messagesTR
      }, true, true);
      
      i18n.addResourceBundle('en', 'Profile', {
        // Views
        ProfileView: profileViewEN,
        // Components
        ProfileInfo: profileInfoEN,
        AccountSettings: accountSettingsEN,
        SubscriptionInfo: subscriptionInfoEN,
        PasswordChangeDialog: passwordChangeDialogEN,
        // Errors ve messages
        errors: errorsEN,
        messages: messagesEN
      }, true, true);
      
      console.log('Profile çevirileri başarıyla yüklendi');
    } catch (error) {
      console.warn('Profile çevirileri yüklenirken hata:', error);
    }
  } else {
    console.warn('i18n henüz başlatılmadı, profil çevirileri daha sonra yüklenecek');
  }
};

export default initProfileTranslations;
