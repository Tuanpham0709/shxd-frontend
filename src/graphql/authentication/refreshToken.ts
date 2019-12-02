import { gql } from 'apollo-boost';

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      idToken
      refreshToken
      expiresAt
    }
  }
`;
