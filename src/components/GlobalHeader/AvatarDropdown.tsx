import { Avatar, Icon, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import history from '../../history';
import { setToken } from '../../helpers/tokenHelpers';

class AvatarDropdown extends React.Component<any> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      // Logout
      return;
    }
    history.push(`/account/${key}`);
  };

  logout = () => {
    localStorage.removeItem('_refreshToken');
    localStorage.removeItem('expiresAt');
    setToken(null);
    window.location.href = '/login';
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: 'John Does',
      },
      menu,
    } = this.props;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user"/>
            Profile
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting"/>
            Settings
          </Menu.Item>
        )}
        {menu && <Menu.Divider/>}
        <Menu.Item key="logout" onClick={(e) => this.logout()}>
          <Icon type="logout"/>
          Logout
        </Menu.Item>
      </Menu>
    );

    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown} placement="bottomRight">
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="large" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}/>
    );
  }
}

export default AvatarDropdown;
