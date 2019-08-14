import { getCookie } from '../../helpers/getCookie';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_USER_INFO,
} from './reducer';

export const getValidationStatus = ({ openamSessionCookieName, openamHost }) => async dispatch => {
  try {
    const token = getCookie(openamSessionCookieName);
    const url = `${openamHost}json/sessions/${token}?_action=validate`;
    const response = await fetch(url, { method: 'POST' });

    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const validateSession = openAmData => async dispatch => {
  dispatch(loginStart);
  try {
    const validationStatus = await dispatch(getValidationStatus(openAmData));
    const parsedResponse = await validationStatus.json();
    const inLogoutPage = window.location.href.includes('?logout');

    if (!inLogoutPage && parsedResponse.valid) {
      dispatch(loginSuccess);
      dispatch(setUserInfo({ uid: [parsedResponse.uid], userName: parsedResponse.uid }));
      return Promise.resolve();
    } else {
      dispatch(loginFailed('Invalid session.'));
      return Promise.reject('Invalid session.');
    }
  } catch (err) {
    console.error(`Validation request failed: ${err}`);
  }
};

export const getUserInfo = ({ openamUserInfo }) => async (dispatch, getState) => {
  try {
    const userId = Array.isArray(getState().authState.userInfo.uid)
      ? getState().authState.userInfo.uid[0]
      : getState().authState.userInfo.uid;
    const url = `${openamUserInfo}${userId}`;
    const reqOptions = {
      method: 'GET',
      headers: {},
      credentials: 'include',
    };
    const response = await fetch(url, reqOptions);
    const { user } = await response.json();
    const {
      userid,
      firstName,
      lastName
    } = user;

    dispatch(setUserInfo({ uid: [userid], userName: `${firstName} ${lastName}`}));
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getSessionTimeLeft = ({ openamSessionCookieName, openamHost }) => async dispatch => {
  const token = getCookie(openamSessionCookieName);
  const url = `${openamHost}json/sessions/`;
  const headers = {
    'Content-Type': 'application/json',
    [openamSessionCookieName]: token,
  };
  const body = JSON.stringify({
    _action: 'getTimeLeft',
    tokenId: token,
  });

  try {
    const response = await fetch(url, { headers, body, method: 'POST' });
    return Promise.resolve(response.body.maxtime);
  } catch (err) {
    Promise.reject(err);
  }
};

export const setUserInfo = userInfo => dispatch => {
  dispatch({
    type: SET_USER_INFO,
    data: userInfo,
  });
  localStorage.setItem('uid', JSON.stringify(userInfo));
}

export const loginStart = { type: LOGIN_START };
export const loginSuccess = { type: LOGIN_SUCCESS };
export const loginFailed = error => ({
  type: LOGIN_FAILED,
  data: error,
});