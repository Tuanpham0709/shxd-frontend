import { gql } from 'apollo-boost';
export const GET_CMS_USER = gql`
    query GetCMSUser($limit: Int!,  $query: String!){
        cmsGetUsers(limit:$limit , query: $query){
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
export const SEARCH_CMS_USERS = gql`
    query SearchCMSUser($limit: Int!,  $query: String!, $skip: Int){
        cmsGetUsers(limit:$limit , query: $query, skip: $skip){
            total
            users{
                _id
                fullName
            }            
        }
    }
` 