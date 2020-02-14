import { gql } from 'apollo-boost';
export const CREATE_PARTNER = gql`
  mutation CreatePartner($data: CreatePartnerInput!){
    createPartner(data: $data){
      _id
    }
  }
`