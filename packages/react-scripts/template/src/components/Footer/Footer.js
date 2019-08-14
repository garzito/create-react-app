import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUIVersion } from './actions';
import classes from './Footer.module.css';

export const Footer = props => {
  const { version, story, update } = props.versionInfo;
  useEffect(() => {
    props.dispatch(getUIVersion());
  }, [version]);
  
  return (
    <footer className={classes.iconicsFooter}>
      <div className={classes.info}>
        <div>
          <span className={classes.title}>Version: </span><span>{version}</span>
        </div>
        <div>
          <span className={classes.title}>Story: </span><span>{story}</span>
        </div>
        <div>
          <span className={classes.title}>Updated: </span><span>{update}</span>
        </div>
      </div>
      <div className={classes.powered}>
        <div className={classes.footerTitle}>Powered by </div>
        <div className={classes.iconics}></div>
      </div>
  </footer>
  );
}

Footer.propTypes = {
  versionInfo: PropTypes.shape({
    version: PropTypes.string,
    update: PropTypes.string,
    story: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  versionInfo: state.versionInfo,
})

export default connect(mapStateToProps)(Footer);