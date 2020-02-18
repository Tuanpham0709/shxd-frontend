import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import history from '../../history';
import { AppContext } from '../../contexts/AppContext';
import styles from './style.module.less';

const { Sider } = Layout;

// const { SubMenu } = Menu;

const StyledLogo = styled.div`
  position: relative;
  padding: 30px 15px;
  margin-bottom: 30px;
  transition: all 0.3s;
  text-align: center;
  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
  a {
    display: inline-block;
  }
  img {
    display: inline-block;
    width: 100%;
    max-wight: 220px;
    vertical-align: middle;
  }
`;

const StyledContainer = styled.div``;

interface BaseProps {
  pathname: string;
}

const Sidebar = React.memo((props: BaseProps) => {
  const [activePath, setActivePath] = useState([]);

  useEffect(() => {
    if (window.location.pathname) {
      setActivePath(window.location.pathname.split('/'));
    }
  }, []);

  const changePath = (item: any) => {
    if (item.key) {
      history.push(item.key);
      setActivePath(item.key.split('/'));
    } else {
      setActivePath(item);
    }
  };

  return (
    <StyledContainer>
      <AppContext.Consumer>
        {({ collapsedSidebar, onUpdateContext }) => (
          <Sider
            width={242}
            style={{
              background: '#333132',
              overflow: 'auto',
              height: '100vh',
              zIndex: 100,
              position: 'fixed',
              left: 0,
            }}
          >
            <StyledLogo>
              <a href="/">
                <img src={require('../../logo.svg')} alt="" />
              </a>
            </StyledLogo>
            <Menu
              className={styles.FlexAlignItems}
              style={{ background: '#333132' }}
              defaultSelectedKeys={[props.pathname]}
              mode="inline"
              theme="dark"
              onClick={item => changePath(item)}
              onOpenChange={item => changePath(item)}
              openKeys={activePath}
            >
              {/* <Menu.Item key="/">
                <i className="icon-home"></i>
                <span>Trang chủ</span>
              </Menu.Item> */}

              <Menu.Item key="/">
                <i className="icon-file"></i>
                <span>Quản lý hồ sơ</span>
              </Menu.Item>

              <Menu.Item key="/staffs">
                <i className="icon-user"></i>
                <span>Quản lý nhân viên</span>
              </Menu.Item>

              <Menu.Item key="/customers">
                <i className="icon-customer"></i>
                <span>Quản lý khách hàng</span>
              </Menu.Item>
            </Menu>
          </Sider>
        )}
      </AppContext.Consumer>
    </StyledContainer>
  );
});

export default Sidebar;
