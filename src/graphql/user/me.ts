import { gql } from 'apollo-boost';

export const GET_ME = gql`
 query GetMe{
  me {
    email
    username
    fullName
    photoUrl
    gender
  }
} 
`;
