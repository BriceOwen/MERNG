import React, { Component, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const AuthRoute: React.SFC<RouteProps> = ({ component, ...rest }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.username ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
