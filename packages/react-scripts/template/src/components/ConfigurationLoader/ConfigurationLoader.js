/* Structural Modules */
import React from 'react';
import { connect } from 'react-redux';

/* Functional Modules */
import { getConfig } from './actions';

class ConfigurationLoader extends React.Component {
  componentDidMount() {
    this.props.getConfig();
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  config: state.config,
});

export default connect(
  mapStateToProps,
  { getConfig }
)(ConfigurationLoader);