import gql from 'graphql-tag';

export const FECTH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      author {
        id
        username
        email
      }
      likeCount
      commentCount
      likes {
        id
        author {
          id
          username
        }
      }
      comments {
        id
        body
        author {
          id
          username
        }
        createdAt
      }
      createdAt
    }
  }
`;
