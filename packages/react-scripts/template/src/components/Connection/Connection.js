/* Structural Modules */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* UI Modules */
import ConnectedIcon from '@material-ui/icons/Wifi';
import DisconnectedIcon from '@material-ui/icons/WifiOff';

/* Functional Modules */
import { ONLINE, OFFLINE } from '../../store/reducers/connectivityReducer';

export const Connection = props => {
  useEffect(() => {
    window.addEventListener('online', () => props.dispatch({ type: ONLINE }));
    window.addEventListener('offline', () => props.dispatch({ type: OFFLINE }));
  });

  return props.online
    ? <ConnectedIcon htmlColor="#7ED321" />
    : <DisconnectedIcon color="error" />;
};

Connection.propTypes = {
  connected: PropTypes.bool,
};

const mapStateToProps = state => ({
  online: state.online,
});

export default connect(mapStateToProps)(Connection);