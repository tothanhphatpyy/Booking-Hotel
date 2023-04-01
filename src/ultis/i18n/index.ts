import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import locales from '../locales';

export const SupportedLanguages = ['vi', 'en'];

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: locales,
  lng: 'vi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
