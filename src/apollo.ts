import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { getToken } from './helpers/tokenHelpers';
import { createUploadLink } from 'apollo-upload-client';

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, uploadLink),
});

console.log(client);

export default client;
