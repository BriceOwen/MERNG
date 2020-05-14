import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { REGISTER_USER } from '../graphql/auth/mutation';

interface userInterface {
  username: string;
  email: string;
  password: string;
}

// interface errorInterface {
//   username: string;
//   email: string;
//   password: string;
// }

function Register(props: any) {
  // const [errors, setErrors] = useState();
  const [values, setValues] = useState<userInterface>({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      props.history.push('/');
    },
    onError(err) {
      console.log(err);
      // if (err && err.graphQLErrors[0] && err.graphQLErrors[0].extensions) {
      //   console.log(err.graphQLErrors[0].extensions.exception.errors);
      //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // }
    },
    variables: values,
  });

  const onChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username'
          type='text'
          name='username'
          value={values.username}
          // error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          value={values.email}
          // error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          // error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {/* {Object.values(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value: any, idx: number) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Register;
