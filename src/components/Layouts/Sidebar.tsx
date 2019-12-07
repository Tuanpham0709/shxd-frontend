import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import history from '../../history';
import { AppContext } from '../../contexts/AppContext';

const { Sider } = Layout;

const { SubMenu } = Menu;

const StyledLogo = styled.div`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #001529;
  transition: all 0.3s;
  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
  img {
    display: inline-block;
    height: 32px;
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
            width={256}
            style={{
              overflow: 'auto',
              height: '100vh',
              zIndex: 100,
              position: 'fixed',
              left: 0,
            }}
          >
            <StyledLogo>
              <a href="/">
                <img src={require('../../logo.png')} alt="" />
              </a>
            </StyledLogo>
            <Menu
              style={{ marginTop: -5 }}
              defaultSelectedKeys={[props.pathname]}
              mode="inline"
              theme="dark"
              onClick={item => changePath(item)}
              onOpenChange={item => changePath(item)}
              openKeys={activePath}
            >
              <Menu.Item key="/">
                <Icon type="home" />
                <span>Trang chủ</span>
              </Menu.Item>
              <Menu.Item key="projects">
                <Icon type="file" />
                <span>Quản lý hồ sơ</span>
              </Menu.Item>
              <SubMenu
                key="users"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Quản lý người dùng</span>
                  </span>
                }
                onTitleClick={item => setActivePath(['users'])}
              >
                <Menu.Item key="/users">Danh sách người dùng</Menu.Item>
                <Menu.Item key="/users/create">Tạo mới</Menu.Item>
              </SubMenu>

              <Menu.Item key="/settings">
                <Icon type="setting" />
                <span>Cài đặt hệ thống</span>
              </Menu.Item>
            </Menu>
          </Sider>
        )}
      </AppContext.Consumer>
    </StyledContainer>
  );
});

export default Sidebar;
