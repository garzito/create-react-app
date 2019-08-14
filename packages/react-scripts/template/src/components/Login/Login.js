/* Structural modules */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Functional modules */
import * as actions from './actions';

let openam;
let notifyMinutes;
let paths;
let defaultUnknownUserInfo;

const sendLoginStatusEvent = loginFailed => {
  document.dispatchEvent(new CustomEvent('login-status', { detail: loginFailed }));
};

/**
 * A function to redirect to the login page if not in offline mode.
 */
const login = props => {
  const {
    protocol,
    hostname,
    port = '',
    pathname,
  } = window.location;
  const redirectURL = `${protocol}//${hostname}:${port}${pathname}`;
  const currentPath = paths[props.authType] || { loginA: 'XUI/#login', loginB: '&goto=' };
  const path = `${openam.openamHost}${currentPath.loginA}${openam.openamRealm}${currentPath.loginB}${redirectURL}`;
  
  try {
    window.location = path;
  } catch (err) {
    sendLoginStatusEvent(true);
    props.setUserInfo(defaultUnknownUserInfo);
  }
};

/**
 * A function to redirect to the login page if not in offline mode.
 */
const logout = props => {
  const {
    protocol,
    hostname,
    port = '',
    pathname,
  } = window.location;
  const redirectURL = pathname.includes('components')
    ? `${protocol}//${hostname}:${port}${pathname.split('/')[1]}`
    : `${protocol}//${hostname}:${port}${pathname}`;
  let path = `${openam.openamHost}XUI/#logout${openam.openamRealm}&goto=${redirectURL}`;
  
  if (!props.allowGuest) path += `?logout=true`;
  props.saveAuditText('User logged out');
  
  setTimeout(() => {
    try {
      window.location = path;
    } catch (err) {
      sendLoginStatusEvent(true);
      props.setUserInfo(defaultUnknownUserInfo);
    }
  }, 100);
};

export const validateSession = async props => {
  props.setAuditInit('Starting session validation');
  try {
    await props.validateSession(openam);
    fetchUserInfo(props);
  } catch (err) {
    if (props.allowGuest) {
      sendLoginStatusEvent(true);
      props.setUserInfo(defaultUnknownUserInfo);
    } else {
      login(props);
    }
    return console.error(`Could not validate session: ${err}`);
  }
};

const calculateSessionTimeLeft = timeLeft => {
  const timeoutTime = notifyMinutes * 60;
  const timeLeftForSetTimeout = timeLeft - timeoutTime;

  if (timeLeft <= timeoutTime) {
    return setTimeout(function timerSet() {
      document.dispatchEvent(new CustomEvent('dfw-login-timeout', { detail: { timeLeft } }));
    }, 1000);
  } 
  return setTimeout(function timerSet() {
    document.dispatchEvent(new CustomEvent(
      'dfw-login-timeout',
      { detail: { timeLeft: timeoutTime } }
    ));
  }, timeLeftForSetTimeout * 1000);
};

const fetchSessionTimeLeft = async props => {
  props.setAuditPoint(2, 'Requestion session time left');
  props.setAuditFinal('All done with login');
  props.saveAuditData();
  try {
    const timeLeft = await props.getSessionTimeLeft(openam);
    calculateSessionTimeLeft(timeLeft);
  } catch (err) {
    console.error(`Failed to fetch session time left: ${err}`);
  }
};

export const fetchUserInfo = async props => {
  props.setAuditPoint(1, 'Starting session validation');
  try {
    props.saveAuditText('User logged in');
    await props.getUserInfo(openam);
    sendLoginStatusEvent(false);
    fetchSessionTimeLeft(props);
  } catch (err) {
    console.error(`Failed to fetch user info: ${err}`);
  }
};

export const setInitialValues = props => {
  openam = {
    openamHost: props.config.sso.hasOwnProperty('ssoHost')
      ? `${props.config.sso.ssoHost}/`
      : props.config.sso.hasOwnProperty('openamHost') ? props.config.sso.openamHost : '',
    openamSessionCookieName: props.config.sso.ssoHostSessionCookieName ||
      props.config.sso.openamSessionCookieName || '',
    openamRealm: props.config.sso.ssoRealm || props.config.sso.openamRealm || '',
    openamUserInfo: props.config.sso.openamUserInfo || '',
  };
  notifyMinutes = props.config.components.notifyMinutes;
  paths = {
    rest: {
      loginA : 'XUI/#login',
      loginB : '&goto=',
    },
    oauth: {
      loginA : 'oauth2',
      loginB : '/authorize?response_type=code&client_id=test123&scope=openid&redirect_uri=',
    },
  };
  defaultUnknownUserInfo = {
    uid: props.allowGuest ? ['guest']: ['unknown'],
    userName: props.allowGuest ? 'Guest' : 'Unknown User',
  };
};

export class Login extends React.Component {
  componentDidMount() {
    if (!this.props.config) {
      return console.error("ERROR dfw-login dfwPlatformUIAppConfig not found!");
    }
    // if (!this.props.config.ssohasOwnProperty('components')) {
    //   document.addEventListener('ovp-config-read', setInitialValues, true);
    // } else {
      setInitialValues(this.props);
    // }
    if (!window.localStorage.getItem('uid')) {
      this.props.setUserInfo({ uid: ['unknown'], 'userName': 'Unknown' });
      validateSession(this.props);
    }
    if (!openam.openamHost || !openam.openamSessionCookieName || !openam.openamRealm) {
      sendLoginStatusEvent(true);
      console.error(
        'dfw-login login set to failed because one of the following was blank',
        openam.openamHost,
        openam.openamSessionCookieName,
        openam.openamRealm
      );
      return () => {
        document.removeEventListener('ovp-config-ready');
      };
    }
    validateSession(this.props);
  }

  render() {
    const handleLogin = e => login(this.props);
    const handleLogout = e => logout(this.props);

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { onClick: this.props.authenticated ? handleLogout : handleLogin })
    );
  }
}

Login.defaultProps = {
  authType: 'rest',
  allowGuest: false,
  validateSession: () => {},
  setUserInfo: () => {},
  getUserInfo: () => {},
  getSessionTimeLeft: () => {},
  saveAuditText: () => {},
  saveAuditInit: () => {},
  saveAuditPoint: () => {},
  saveAuditFinal: () => {},
  saveAuditData: () => {},
};

Login.propTypes = {
  authType: PropTypes.oneOf(['rest', 'oauth']).isRequired,
  allowGuest: PropTypes.bool.isRequired,
  config: PropTypes.shape({
    sso: PropTypes.shape({
      ssoHost: PropTypes.string,
      ssoHostSessionCookieName: PropTypes.string,
      ssoRealm: PropTypes.string,
      openamHost: PropTypes.string,
      openamSessionCookieName: PropTypes.string,
      openamRealm: PropTypes.string,
      openamUserInfo: PropTypes.string,
      components: PropTypes.object,
    }),
    components: PropTypes.shape({
      notifyMinutes: PropTypes.number,
    }),
  }).isRequired,
  validateSession: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  getSessionTimeLeft: PropTypes.func.isRequired,
  saveAuditText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  config: state.config,
  authenticated: state.authState.authenticated,
});

export default connect(
  mapStateToProps,
  {
    validateSession: actions.validateSession,
    setUserInfo: actions.setUserInfo,
    getUserInfo: actions.getUserInfo,
    getSessionTimeLeft: actions.getSessionTimeLeft,
  }
)(Login);