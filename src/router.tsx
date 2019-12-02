import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import UserPage from './pages/UserPage';
import UserUpdate from './pages/UserPage/update';
import UserCreate from './pages/UserPage/create';

const PageLoading = () => (
  <div
    style={{
      width: '100vw',
      position: 'absolute',
      height: '100vh',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <h6>Loading...</h6>
  </div>
);

const ProtectedRoute = ({ component: Component = null, path, children = null, user = null, isLogin, ...rest }) => {
  if (!isLogin) return <Redirect to={'/login'} />;
  if (children) {
    return (
      <Route path={path} {...rest}>
        {children}
      </Route>
    );
  }
  return <Route path={path} {...rest} render={props => <Component {...props} />} />;
};

export default function renderRoutes(isLogin: boolean) {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Homepage} isLogin={isLogin} />
      <ProtectedRoute exact path="/users" component={UserPage} isLogin={isLogin} />
      <ProtectedRoute exact path="/users/create" component={UserCreate} isLogin={isLogin} />
      <ProtectedRoute exact path="/users/:type" component={UserPage} isLogin={isLogin} />
      <ProtectedRoute exact path="/users/:id/edit" component={UserUpdate} isLogin={isLogin} />
      <ProtectedRoute exact path="/page-verifies/:type" component={Request} isLogin={isLogin} />\
      <Route exact path="*">
        <React.Suspense fallback={<PageLoading />}>
          <h1>404</h1>
        </React.Suspense>
      </Route>
    </Switch>
  );
}
