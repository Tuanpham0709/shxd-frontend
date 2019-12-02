import { gql } from 'apollo-boost';

export const GET_PAGE_VERIFY = gql`
query GetPageVerify($limit: Int!, $after: String, $q: String, $status: VerifyStatus, $type: VerifyFor){
  cmsGetVerifies(limit: $limit, q: $q, after: $after, filter: {status: $status, type: $type}){
    _id
    targetName
    targetKeyName
    type
    targetType
    status
    description
    createdAt
  }
}
`;

export const SET_VERIFY_STATUS = gql`
mutation CmsSetVerifyStatus ($_id: ID!, $status: VerifyStatus!){
  cmsSetVerifyStatus (_id: $_id, status: $status)
}
`;
