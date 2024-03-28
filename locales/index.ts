import { I18n } from 'i18n-js';

import loginAR from './login-ar.json';
import loginEN from './login-en.json';
import { getLocales } from 'expo-localization';

// Set the key-value pairs for the different languages you want to support.
export const local= new I18n({
  en: {...loginEN},
  ar: {...loginAR},
});
local.locale = getLocales()[0].languageCode ?? "en";

