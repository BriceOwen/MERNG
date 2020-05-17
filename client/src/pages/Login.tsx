import React, { useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../graphql/auth/mutation';
import { getIsLoggedIn } from '../util/authentication';

interface userInterface {
  username: string;
  password: string;
}

// interface errorInterface {
//   username: string;
//   email: string;
//   password: string;
// }

function Login(props: any) {
  const context = useContext(AuthContext);
  // const [errors, setErrors] = useState();
  const [values, setValues] = useState<userInterface>({
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
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

  useEffect(() => {
    console.log('getIsLoggedIn', getIsLoggedIn);
    if (getIsLoggedIn()) {
      props.history.push('/');
    }
  }, [getIsLoggedIn()]);

  const onChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
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
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          // error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
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

export default Login;
