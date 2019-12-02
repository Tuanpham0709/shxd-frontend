import { gql } from 'apollo-boost';

export const GET_USERS = gql`
 query GetUsers($query: String!, $limit: Int!, $termStatus: TermStatus, $status: UserStatus){
  cmsGetUsers (query: $query, limit: $limit, filter: { termStatus: $termStatus, status: $status }){
    _id
    username
    photoUrl
    email
    gender
    phoneNumber
    fullName
    deleted
    createdAt
    totalFriends
    totalPosts
    group
    termStatus
  }
} 
`;

export const GET_USER = gql`
 query GetUser($userId: ID!){
  cmsGetUser (userId: $userId) {
    _id
    username
    photoUrl
    email
    gender
    phoneNumber
    fullName
    deleted
    createdAt
    totalFriends
    totalPosts
    group
    termStatus
  }
} 
`;

export const UPDATE_USER_GROUP = gql`
 mutation UpdateUserGroup($userId: ID!, $group: UserGroup!){
  updateUserGroup (userId: $userId, group: $group)
} 
`;

export const BLOCK_USER = gql`
 mutation BlockUser($targetId: ID!){
  blockUser (targetId: $targetId)
} 
`;

export const CMS_SET_USER_STATUS = gql`
 mutation CmsSetUserStatus($_id: ID!, $termStatus: TermStatus!, $model: ReportFor!, $reason: String){
  cmsSetTermStatus (_id: $_id, termStatus: $termStatus, model: $model, reason: $reason)
} 
`;


export const UNBLOCK_USER = gql`
 mutation UnblockUser($targetId: ID!){
  unBlockUser (targetId: $targetId)
} 
`;
