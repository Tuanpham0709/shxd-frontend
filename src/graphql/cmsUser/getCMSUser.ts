import { gql } from 'apollo-boost';
export const GET_CMS_USER = gql`
    query GetCMSUser($limit: Int!){
        cmsGetUsers(limit:$limit){
            total
            users{
                _id
                email
                username
                fullName
                phoneNumber
                address
                group
                userType
                identityNumber
                dateOfBirth
                relationshipStatus
                level
                createdBy
                createdAt
                updatedAt
            }            
        }
    }
`