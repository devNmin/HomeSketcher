import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/AuthContext';
import {useContext} from 'react'

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let {user , logoutUser} = useContext(AuthContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button aria-describedby={id} variant="contained" onClick={handleClick}>
        <b>Hello, {user.user_nickname}</b>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }} >
            <p>Retest</p>
            <hr />
            <p>Edit Profile</p>
            <hr />
            <p onClick={logoutUser}>Logout</p>            
            </Typography>
      </Popover>
    </div>
  );
}