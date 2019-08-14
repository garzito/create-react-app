/* Structural Modules */
import React from 'react';
import PropTypes from 'prop-types';

/* Functional Modules */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
  },
  padding: {
    padding: theme.spacing(1, 3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#eaeaea',
  },
  close: {
    marginLeft: '0.5rem',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    borderRadius: 0,
    padding: theme.spacing(2),
    fontSize: '1rem',
  },
  itemsContainer: {
    minHeight: 350,
  },
}));

export const NotificationsDialog = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.padding}>
        <header className={classes.header}>
          <Typography className={classes.title} variant="h6" component="span">Notifications</Typography>
          <a href="#clearNotifications">Clear All</a>
          <CloseIcon className={classes.close} onClick={props.close} />
        </header>
      </div>
      <div className={classes.searchBar}>
        <div className={classes.padding}>
          <TextField
            className={classes.input}
            placeholder="Search notifications"
            fullWidth
            InputProps={{
              'aria-label': 'search notifications',
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
            }}
          />
        </div>
      </div>
      <div>
        <div className={`${classes.padding} ${classes.itemsContainer}`} />
      </div>
      <div>
        <Button variant="contained" color="primary" className={classes.button}>Show detail ></Button>
      </div>
    </div>
  )
};

NotificationsDialog.propTypes = {
  close: PropTypes.func,
};

export default NotificationsDialog;