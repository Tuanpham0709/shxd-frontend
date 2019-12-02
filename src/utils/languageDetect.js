import Cookie from 'js-cookie';
import { Auth } from '../core/services/auth';
import cookieHandler from '../utils/cookieHandler';
import { DEFAULT_LOCALE, LANGUAGE_COOKIE_KEY } from '../containers/LanguageProvider/constants';

export default function () {
  if (Cookie.get(LANGUAGE_COOKIE_KEY)) {
    return Cookie.get(LANGUAGE_COOKIE_KEY);
  } else if (Auth.service.getAuth()) {
    cookieHandler.setLanguageToCookie(Auth.service.getAuth().localeKey);
    return Auth.service.getAuth().localeKey;
  }
  cookieHandler.setLanguageToCookie(DEFAULT_LOCALE);
  return DEFAULT_LOCALE;
}
