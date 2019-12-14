import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import ProjectPageInfo from './pages/Projectpage/index';
import ProjectPagesList from './pages/ProjectPages/index';
import StaffsPage from './pages/StaffsPage/index';
import FormEditStaff from './pages/StaffsPage/FormEditStaff/index';
import FormNewStaff from './pages/StaffsPage/FormNewStaff/index';
import CustomersPage from './pages/CustomersPage/index';
import FormNewCustomer from './pages/CustomersPage/FormNewCustomer/index';
import FormEditCustomer from './pages/CustomersPage/FormEditCustomer/index';
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
      <ProtectedRoute exact path="/page-verifies/:type" component={Request} isLogin={isLogin} />
      <ProtectedRoute exact path="/projects/detail" component={ProjectPageInfo} isLogin={isLogin} />
      <ProtectedRoute exact path="/projects" component={ProjectPagesList} isLogin={isLogin} />
      <ProtectedRoute exact path="/staffs" component={StaffsPage} isLogin={isLogin} />
      <ProtectedRoute exact path="/staffs/create" component={FormNewStaff} isLogin={isLogin} />
      <ProtectedRoute exact path="/staffs/edit" component={FormEditStaff} isLogin={isLogin} />
      <ProtectedRoute exact path="/customers" component={CustomersPage} isLogin={isLogin} />
      <ProtectedRoute exact path="/customers/create" component={FormNewCustomer} isLogin={isLogin} />
      <ProtectedRoute exact path="/customers/edit" component={FormEditCustomer} isLogin={isLogin} />
      <Route exact path="*">
        <React.Suspense fallback={<PageLoading />}>
          <h1>404</h1>
        </React.Suspense>
      </Route>
    </Switch>
  );
}
