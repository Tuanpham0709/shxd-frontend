import { gql } from 'apollo-boost';

export const GET_CMS_USER_PARTNER = gql`
    query GetBothCMSUserPartner( $query:String, $limitCMSUsers: Int!,$skipPartners: Int, $limitPartners: Int!){
    getPartners( query: $query, limit: $limitPartners,skip: $skipPartners){
        total 
        partners{
            partnerCode
            name
        }
    }
    cmsGetUsers(limit: $limitCMSUsers){
            total
            users{
                fullName
            }
           
        }
    } 
`