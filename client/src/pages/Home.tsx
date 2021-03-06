import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';

import { FECTH_POSTS_QUERY } from '../graphql/post/query';
import PostForm from '../components/PostForm';

function Home() {
  const { data, loading, error } = useQuery(FECTH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && user.id && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          data &&
          data.getPosts.map((post: any) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
