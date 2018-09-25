import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import store from 'src/store';
import { ERROR_CURRENT_USER } from 'src/store/actions/errorsActions';
import { setCurrentUser } from 'src/store/actions/authActions';

export const registerUser = (response) => {
  const { token } = response.data;
  // set the token in the local storage
  localStorage.setItem('jwtToken', token);
  // set the axios authentification to be the responded token
  setAuthToken(token);
  // call the method jwt-decode from the lib jwt to decode the user's token
  const decoded = jwt_decode(token);
  console.log(decoded, 'Signup User Token Decoded (auth/setUser.js)');
  // dispatch an action to set the current user with the decoded token
  store.dispatch(setCurrentUser(decoded));
};

export const loginUser = (response) => {
  const { token } = response.data;
  // set the token in the local storage
  localStorage.setItem('jwtToken', token);
  // set the axios authentification to be the responded token
  setAuthToken(token);
  // call the method jwt-decode from the lib jwt to decode the user's token
  const decoded = jwt_decode(token);
  console.log(decoded, 'Login User Token Decoded (auth/setUser.js)');
  // dispatch an action to set the current user with the decoded token
  store.dispatch(setCurrentUser(decoded));
};

export const logoutUser = dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  store.dispatch(setCurrentUser({}));
};

export const loginError = (message, open) => {
  store.dispatch({ type: ERROR_CURRENT_USER, message, open });
};

export const signupError = (message, open) => {
  store.dispatch({ type: ERROR_CURRENT_USER, message, open });
};
