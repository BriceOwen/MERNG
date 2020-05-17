import jwtDecode from 'jwt-decode';
import { DecodedTokenInterface } from './interfaces';

export const getIsLoggedIn = () => {
  if (localStorage.getItem('jwtToken')) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: DecodedTokenInterface = jwtDecode(token);
      console.log(decodedToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.clear();
        return false;
      }
      return true;
    }
  }
  return false;
};
