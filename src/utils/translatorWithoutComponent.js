import { IntlProvider, addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import viLocaleData from 'react-intl/locale-data/vi';
import languageDetect from './languageDetect';

class TranslatorWithoutComponent {
  constructor() {
    this.locale = languageDetect();
    this.intl = this.init(this.locale);
  }

  init(locale) {
    addLocaleData(enLocaleData);
    addLocaleData(viLocaleData);
    const { intl } = new IntlProvider({
      locale,
      messages: require(`../../src/translations/${locale}.json`), //eslint-disable-line
    }, {}).getChildContext();
    return intl;
  }

  translateMessage(id) {
    return this.intl.formatMessage({ id });
  }
}

export default new TranslatorWithoutComponent();
