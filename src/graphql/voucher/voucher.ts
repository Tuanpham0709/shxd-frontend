import { gql } from 'apollo-boost';

export const GET_VOUCHERS = gql`
query GetVouchers ($limit: Int!,$uid: ID,$status:VoucherStatus,$withTrash: Boolean,  $adminStatus: VoucherAdminStatus, ){
  cmsVouchers (limit: $limit, filter: {uid: $uid, status: $status, withTrash: $withTrash, adminStatus: $adminStatus}){
    _id
    medias {
      _id
      thumbnail
      uri
    }
    title
    code
    createdBy
    createdAt
    status
    adminStatus
  }
}
`;

export const SET_VOUCHER_ADMIN_STATUS = gql`
mutation SetVoucherAdminStatus ($_ids: [ID!]!, $adminStatus: VoucherAdminStatus){
  cmsSetVoucherAdminStatus (_ids: $_ids, adminStatus: $adminStatus)
}
`;


export const CREATE_VOUCHER = gql`
 mutation CreateVoucher($title: String!, $code: String!, $pointSpend: Int!, $mediaIds: [ID!], $status: VoucherStatus, $startDate: DateTime!, $endDate: DateTime!){
  createVoucher (data: {
    title: $title, 
    code: $code, 
    pointSpend: $pointSpend, 
    mediaIds: $mediaIds, 
    status: $status, 
    startDate: $startDate, 
    endDate: $endDate
  }){
    _id
    title
    code
  }
} 
`;
