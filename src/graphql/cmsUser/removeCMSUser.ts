import { gql } from 'apollo-boost';
export const REMOVE_CMS_USER = gql`
    mutation RemoveCMSUser($id: ID!){ 
        removeCMSUser(userId: $id)
    }
`
