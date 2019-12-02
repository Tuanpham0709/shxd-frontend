import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import Helmet from 'react-helmet';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Sidebar from '../../components/Layouts/Sidebar';
import RightContent from '../../components/GlobalHeader/RightContent';
import renderRoutes from '../../router';
import { AppContext } from '../../contexts/AppContext';
import { GET_ME } from '../../graphql/user/me';
import { REFRESH_TOKEN } from '../../graphql/authentication/refreshToken';
import { GetMe, RefreshToken, RefreshTokenVariables } from '../../graphql/types';
import { AuthContext } from '../../contexts/AuthContext';
import { setToken } from '../../helpers/tokenHelpers';

const { Content, Header, Footer } = Layout;

interface BaseProps extends RouteComponentProps {}

const StyledContainer = styled.div``;
const StyledHeader = styled(Header)`
  background-color: #fff;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: flex-end;
`;

const App = React.memo((props: BaseProps) => {
  const _refreshToken = localStorage.getItem('_refreshToken');
  const [callRefresh, { data: reData }] = useMutation<RefreshToken, RefreshTokenVariables>(REFRESH_TOKEN);
  let isLogin = null;

  const result = useQuery<GetMe>(GET_ME);
  const context = useContext(AuthContext);

  const state = context.state;

  if (state.token) {
    isLogin = true;
    if (result.data) {
      context.actions.setUser(result.data);
    }
  } else {
    if (_refreshToken) {
      if (reData) {
        isLogin = true;
        setToken(reData.refreshToken.idToken);
        context.actions.setToken(reData.refreshToken.idToken);
      }
    } else {
      isLogin = false;
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state.token) {
      callRefresh({
        variables: {
          refreshToken: _refreshToken,
        },
      }).catch(error => console.log(error));
    }
  }, [props.location.pathname]);

  return (
    <StyledContainer>
      <AppContext.Consumer>
        {({ collapsedSidebar }) => {
          if (isLogin === true) {
            return (
              <Layout style={{ minHeight: '100vh' }}>
                <Helmet titleTemplate={'Ecoshare Wallet'} defaultTitle={'Home'} meta={[]} />
                <Sidebar pathname={props.location.pathname} />
                <Layout style={{ paddingLeft: collapsedSidebar ? 80 : 256, position: 'relative' }}>
                  <StyledHeader style={{ paddingRight: 20, backgroundColor: '#fff' }}>
                    <RightContent />
                  </StyledHeader>
                  <Content style={{ margin: '24px', paddingTop: 70 }}>{renderRoutes(isLogin)}</Content>
                </Layout>
              </Layout>
            );
          }
          if (isLogin === false) {
            return <Content style={{ margin: '24px', paddingTop: 70 }}>{renderRoutes(isLogin)}</Content>;
          }
          return <div>Loading....</div>;
        }}
      </AppContext.Consumer>
      <Footer style={{ textAlign: 'center' }}>
        CMS SHXD Việt by <strong>Comartek</strong> v0.1
      </Footer>
    </StyledContainer>
  );
});

export default withRouter(App);
