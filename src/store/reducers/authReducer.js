// ERRORS actions
import { ERROR_CURRENT_USER } from 'src/store/actions/errorsActions';

// AUTH actions
import { SET_CURRENT_USER } from 'src/store/actions/authActions';

import { isEmpty } from 'lodash';

const initialState = {
  message: null,
  open: false,
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    // Display a modal if there is an error during the login or the signup
    case ERROR_CURRENT_USER:
      return {
        ...state,
        message: action.message,
        open: true
      };
    default:
      return state;
  }
};

export default authReducer;
