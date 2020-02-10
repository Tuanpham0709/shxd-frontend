import { gql } from 'apollo-boost';
export const GET_PARTNERS = gql`
query GetPartners( $query:String, $limit: Int!,$skip: Int){
    getPartners( query: $query, limit: $limit,skip: $skip){
        total  
        partners{
            _id
            name
            partnerCode
            projectName
            projectCode
            chairmanName
            ceoName
            departmentName
            accountantName
            address
            email
            phone
        }
    }
}
`
export const SEARCH_PARTNER_NAME = gql`
    query SearchPartnerName($query:String, $limit: Int!,$skip: Int) {
        getPartners(query: $query, limit: $limit, skip: $skip){
            total 
            partners {
                _id
                name
                partnerCode
            }
        }
    }
`