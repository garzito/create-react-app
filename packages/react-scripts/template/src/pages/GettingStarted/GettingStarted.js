/* Structural Modules */
import React, { useState } from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

/* UI Modules */
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import SimplePage from './components/SimplePage';
import SimpleDropdown from './components/SimpleDropdown';
import TreeAndEditor from './components/TreeAndEditor';
import MultiSelect from './components/MultiSelect';
import { NoMatch } from '../../helpers/404';

/* Functional Modules */
import { useStyles, usePaperStyles } from './styles';

export const GettingStarted = props => {
  const classes = useStyles();
  const paperClasses = usePaperStyles();
  const [open, setOpen] = useState(true);
  const routes = [
    { path: 'step-one', text: 'Step One', component: StepOne },
    { path: 'step-two', text: 'Step Two', component: StepTwo },
    { path: 'step-three', text: 'Step Three', component: StepThree },
    { path: 'simple-page', text: 'Simple Binding Example', component: SimplePage },
    { path: 'dropdown-page', text: 'Simple Dropdown Example', component: SimpleDropdown },
    { path: 'tree-editor', text: 'Tree and Editor Example', component: TreeAndEditor },
    { path: 'multi-select', text: 'Multi Select Example', component: MultiSelect },
    { path: 'vaadin-example', text: 'Grid Example', component: NoMatch },
  ];
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        className={`${classes.appBar} ${open ? classes.appBarShift : ''}`}
      >
        <Toolbar>
          <IconButton
            color="#000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={`${classes.menuButton} ${open ? classes.hide : ''}`}
          >
            <MenuIcon />
          </IconButton>
          Getting Started
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map(({path, text}, index) => (
            <NavLink
              key={text}
              className={classes.link}
              activeClassName={classes.activeLink}
              to={`/getting-started/${path}`}
            >
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <div className={`${open ? classes.contentShift : ''}`}>
        <Paper className={paperClasses.root}>
          <Switch>
            <Redirect exact from='/getting-started' to='/getting-started/step-one'/>
            {routes.map((route, i) => (
              <Route
                key={route.path}
                path={`/getting-started/${route.path}`}
                render={props => <route.component {...props} />}
              />
            ))}
            <Route component={NoMatch} />
          </Switch>
        </Paper>
      </div>
    </div>
  );
};

export default GettingStarted;