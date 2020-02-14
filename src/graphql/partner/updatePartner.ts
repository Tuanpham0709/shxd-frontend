import { gql } from 'apollo-boost'
export const UPDATE_PARTNER = gql`
  mutation UpdatePartner($data: UpdatePartnerInput!){
    updatePartner(data: $data){
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
`