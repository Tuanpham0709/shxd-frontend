import Cookie from 'js-cookie';
import { LANGUAGE_COOKIE_KEY } from '../containers/LanguageProvider/constants';

export default {

  setLanguageToCookie(locale) {
    Cookie.set(LANGUAGE_COOKIE_KEY, locale);
  },

  set(key, value, expire) {
    return Cookie.set(key, value, { expires: expire });
  },

  get(key) {
    return Cookie.get(key);
  },
};
