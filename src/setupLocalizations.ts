import * as Localization from 'expo-localization';
import I18n from 'i18n-js';
import enStrings from './locales/en.json';

// Set the key-value pairs for the different languages you want to support.
I18n.translations = {
  en: enStrings,
};
// Set the locale once at the beginning of your app.
I18n.locale = Localization.locale;
I18n.fallbacks = true;
