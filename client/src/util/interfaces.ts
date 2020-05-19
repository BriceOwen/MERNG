export interface AuthPayloadInterface {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ActionInterface {
  type: string;
  payload: any;
}

export interface AuthContextInterface {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  login: (userData: AuthPayloadInterface) => {};
  logout: () => {};
}

export interface UserInterface {
  token: string | null;
  user: {
    id: string | null;
    username: string | null;
    email: string | null;
  };
}

export interface DecodedTokenInterface {
  email: string;
  exp: number;
  iat: number;
  userId: string;
  username: string;
}

export interface EventInterface {
  target: {
    name: string;
    value: string;
  };
}
