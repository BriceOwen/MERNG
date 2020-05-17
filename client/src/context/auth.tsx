import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import {
  AuthPayloadInterface,
  ActionInterface,
  AuthContextInterface,
  UserInterface,
  DecodedTokenInterface,
} from '../util/interfaces';

const initialState: UserInterface = {
  token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
};

if (localStorage.getItem('jwtToken')) {
  const token = localStorage.getItem('jwtToken');
  console.log(token);
  if (token) {
    const decodedToken: DecodedTokenInterface = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.clear();
      // localStorage.removeItem('jwtToken');
    } else {
      initialState.token = token;
      initialState.user = {
        id: decodedToken.userId,
        email: decodedToken.email,
        username: decodedToken.username,
      };
    }
  }
}

const AuthContext = createContext({
  user: {
    id: '',
    username: '',
    email: '',
  },
  token: null,
  login: (userData: AuthPayloadInterface) => {},
  logout: () => {},
});

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: AuthPayloadInterface) => {
    localStorage.setItem('jwtToken', userData.token);
    // localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, token: state.token, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
