import { gql } from 'apollo-boost';
export const CREATE_CMS_USER = gql`
    mutation CreateCMSUser($data: CreateUserInput!){
        createCMSUser(data: $data){
            _id
        }
    }
`
