import { gql } from 'apollo-boost';
export const UPDATE_CMS_USER = gql`
    mutation UpdateUserInfo($data: UpdaterUserInfo!, $id: ID!){
        updateUserInfo( userId: $id, data: $data){
            fullName
            username
            address
            email
            group
        }
    }
`
