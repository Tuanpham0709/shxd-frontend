import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider as ApolloProviderHook } from '@apollo/react-hooks';
import App from './containers/App/App';
import './vendor';
import client from './apollo';
import MainTheme from './themes/main';
import history from './history';
import AppProvider from './contexts/AppContext';
import { AuthContextProvider } from './contexts/AuthContext'

async function getCommonData(): Promise<any> {
  // First data calling here
  return true;
}

const renderApp = () => {
  render(
    <ApolloProvider client={client}>
      <ApolloProviderHook client={client}>
        <ThemeProvider theme={MainTheme}>
          <AuthContextProvider>
            <AppProvider>
              <Router history={history}>
                <App />
              </Router>
            </AppProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </ApolloProviderHook>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

getCommonData()
  .then(() => renderApp())
  .catch(e => console.error(e));
