export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_USER_INFO = 'SET_USER_INFO';

const initialAuthState = {
  loading: false,
  authenticated: false,
  failed: false,
  error: null,
  userInfo: {},
};
export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...initialAuthState,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...initialAuthState,
        authenticated: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...initialAuthState,
        failed: true,
        error: action.data,
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.data,
      };
    }
    default: {
      return state;
    }
  }
};