import { gql } from 'apollo-boost';

export const REMOVE_DOCUMENT = gql`
    mutation DeleteDocument($id: ID!){
        deleteDocument(_id: $id)
    }
`