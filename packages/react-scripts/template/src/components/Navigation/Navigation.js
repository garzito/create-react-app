/* Structural Modules */
import React from 'react';
import { connect } from 'react-redux';

/* UI Modules */
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

function a11yProps(index) {
  return {
    id: `navigation-tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const LinkTab = props => <Tab component={Link} {...props} />;

export const Navigation = props => {
  const handleChange = (e, value) => props.onChange(value);

  return (
    <Tabs
      value={props.selected}
      indicatorColor="primary"
      onChange={handleChange}
      aria-label="navigation tabs"
    >
      <LinkTab to="/home" label="Home" value="home" {...a11yProps(0)} />
      {props.authenticated &&
        [
          <LinkTab
            key="gettinStarted"
            to="/getting-started"
            label="Getting Started"
            value="getting-started"
            {...a11yProps(1)}
          />,
          <LinkTab
            key="auditTrail"
            to="/audit-trail"
            label="Audit Trail"
            value="audit-trail"
            {...a11yProps(2)}
          />,
        ]
      }
    </Tabs>
  )
};

const mapStateToProps = state => ({
  authenticated: state.authState.authenticated,
});

export default connect(mapStateToProps)(Navigation);