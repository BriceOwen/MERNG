import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { EventInterface } from '../util/interfaces';
import { CREATE_POST_MUTATION } from '../graphql/post/mutation';
import { FECTH_POSTS_QUERY } from '../graphql/post/query';

interface PostInterface {
  body: string;
}

function PostForm() {
  const [values, setValues] = useState<PostInterface>({
    body: '',
  });
  const client = useApolloClient();

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      console.log(result);
      const data: any = proxy.readQuery({
        query: FECTH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FECTH_POSTS_QUERY,
        data,
      });

      values.body = '';
    },
  });

  const onChange = ({ target: { name, value } }: EventInterface) => {
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    createPost();
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Create a post</h1>
      <Form.Field>
        <Form.Input
          placeholder='Create post'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

export default PostForm;
