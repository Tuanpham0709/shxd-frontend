import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      idToken
      refreshToken
      expiresAt
    }
  }
`;
