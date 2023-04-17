import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './translations';

const resources = {
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // https://stackoverflow.com/a/70521614
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
