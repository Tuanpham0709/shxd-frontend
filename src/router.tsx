import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import ProjectPagesList from './pages/ProjectPages';
// import StaffsPage from './pages/StaffsPage';
// import FormEditStaff from './pages/StaffsPage/FormEditStaff';
// import FormNewStaff from './pages/StaffsPage/FormNewStaff';
// import CustomersPage from './pages/CustomersPage';
// import FormNewCustomer from './pages/CustomersPage/FormNewCustomer';
// import FormEditCustomer from './pages/CustomersPage/FormEditCustomer';
import ProjectViewer from './pages/ProjectViewerpage';
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
      <ProtectedRoute exact path="/projects" component={ProjectPagesList} isLogin={isLogin} />
      {/* <ProtectedRoute exact path="/staffs" component={StaffsPage} isLogin={isLogin} />
      <ProtectedRoute exact path="/staffs/create" component={FormNewStaff} isLogin={isLogin} />
      <ProtectedRoute exact path="/staffs/edit" component={FormEditStaff} isLogin={isLogin} /> */}
      {/* <ProtectedRoute exact path="/customers" component={CustomersPage} isLogin={isLogin} /> */}
      {/* <ProtectedRoute exact path="/customers/create" component={FormNewCustomer} isLogin={isLogin} /> */}
      {/* <ProtectedRoute exact path="/customers/edit" component={FormEditCustomer} isLogin={isLogin} /> */}
      <ProtectedRoute exact path="/project/detail" component={ProjectViewer} isLogin={isLogin} />
      <Route exact path="*">
        <React.Suspense fallback={<PageLoading />}>
          <h1>404</h1>
        </React.Suspense>
      </Route>
    </Switch>
  );
}
