/* Structural Modules */
import React, { useState } from 'react';

/* UI Modules */
import Popover from '@material-ui/core/Popover';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import NotificationsDialog from './NotificationsDialog';

export const NotificationsIcon = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;

  return (
    <React.Fragment>
      <NotificationsNone
        aria-describedby={id}
        htmlColor="#ffffff"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <NotificationsDialog close={handleClose} />
      </Popover>
    </React.Fragment>
  )
};

export default NotificationsIcon;