import { Icon, Menu } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
}
const SelectLang: React.FC<SelectLangProps> = props => {
  const { className } = props;
  const selectedLang = 'en-US';
  const changeLang = ({ key }: ClickParam) => key;
  const locales = ['en-US', 'vi-VN'];
  const languageLabels = {
    'en-US': 'English',
    'vi-VN': 'Vietnamese',
  };
  const languageIcons = {
    'en-US': '🇺🇸',
    'vi-VN': '🇻🇳',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon type="global" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
