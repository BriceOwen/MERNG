import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
