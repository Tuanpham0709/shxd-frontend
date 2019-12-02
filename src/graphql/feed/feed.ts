import { gql } from 'apollo-boost';

export const GET_FEED = gql`
  query GetFeed($limit: Int!, $after: ID) {
    feeds(limit: $limit, after: $after) {
      _id
      type
      title
      content
      createdAt
      totalLikes
      totalComments
      place {
        _id
        name
      }
      creator {
        _id
        fullName
        photoUrl
      }
      medias {
        type
        thumbnail
      }
    }
  }
`;

export const DELETE_POST = gql`
mutation DeletePost ($_id: ID!){
  deletePost (_id: $_id)
}
`;
