import { gql } from 'apollo-boost';

export const GET_CONFIGS = gql`
 query GetConfigs($limit: Int!){
  getConfigs (limit: $limit){
    _id
    key
    value
  }
} 
`;

export const CREATE_CONFIG = gql`
 mutation CreateConfig($key: String!, $value: String!){
  createConfig (key: $key, value: $value){
    key
    value
  }
} 
`;

export const UPDATE_CONFIG = gql`
 mutation UpdateConfig($_id: ID!, $key: String!, $value: String!){
  updateConfig (_id: $_id, key: $key, value: $value){
    key
    value
  }
} 
`;

export const DELETE_CONFIG = gql`
 mutation DeleteConfig($_id: ID!){
  deleteConfig (_id: $_id)
} 
`;
