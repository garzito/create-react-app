/* Structural Modules */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* UI Modules */
import Audit from '../Audit/Audit';
import Login from '../Login/Login';
import Connection from '../Connection/Connection';
import NotificationsIcon from '../Notifications/NotificationsIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import classes from './Header.module.css';

export const Header = props => {
  const [changelogOpen, setChangelogOpen] = useState(false);
  const {
    config: {
      guest,
      appId,
    },
    authState = {},
    online,
  } = props;
  const showChangelog = () => setChangelogOpen(true);
  const closeChangelog = () => setChangelogOpen(false);
  
  return (
    <div className={classes.header}>
      <div className={classes.brand}>
        <a href="/">
          <span className={classes.logo}></span>
          <span className={classes.projectName}>{props.project_name}</span>
        </a>
      </div>
      <div className={classes.userTools}>
        <span className={classes.welcomeTitle}>Welcome, </span>
        <span className={classes.welcomeName}>{authState.authenticated ? authState.userInfo.userName : 'Guest'}</span>
        <div className={classes.iconsWrapper}>
          <Connection />
          {authState.authenticated && <NotificationsIcon />}
          {online && authState.authenticated && <SettingsIcon onClick={() => {}} />}
          <HelpIcon onClick={showChangelog} />
        </div>
        {/* <ovp-preferences id="prefs"><slot></slot></ovp-preferences> */}
        <Audit entityId="" entityName="Login" severity="INFO" applicationId={appId}>
          {props => (<Login allowGuest={guest} {...props}>
            <span className={classes.welcomeLogout}>
              |&nbsp;&nbsp;<span className={classes.headerAnchor}>{authState.authenticated ? 'Logout' : 'Login'}</span>
            </span>
          </Login>)}
        </Audit>
      </div>
      <Dialog open={changelogOpen} onClose={closeChangelog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">CHANGELOG and README</DialogTitle>
        <DialogContent>
          <DialogContentText />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangelog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Header.propTypes = {
  authState: PropTypes.shape({
    authenticated: PropTypes.bool,
    userInfo: PropTypes.shape({
      userName: PropTypes.string
    }),
  }),
  config: PropTypes.shape({
    guest: PropTypes.bool,
  }),
  online: PropTypes.bool,
};

const mapDispatchToProps = state => ({
  authState: state.authState,
  config: state.config,
  online: state.online,
});

export default connect(mapDispatchToProps)(Header);