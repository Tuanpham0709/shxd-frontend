import { gql } from 'apollo-boost';
export const REMOVE_PARTNER = gql`
    mutation DeletePartner($id: ID!){
        deletePartner(_id: $id)
    }
`