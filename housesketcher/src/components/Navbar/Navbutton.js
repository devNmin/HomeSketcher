import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/AuthContext';
import {useContext, useState} from 'react'
import { useHistory } from 'react-router-dom';
import swal from "sweetalert2";
import { color } from '@mui/system';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  let [retestHover, setRetestHover] = useState(false)
  let [editHover, setEditHover] = useState(false)
  let [logoutHover, setLogoutHover] = useState(false)

  let {user , logoutUser} = useContext(AuthContext)
  const history = useHistory()

  const retestClickHandler = () => {
    history.push('/tasteanalysis')
  }

  const editClickHandler = () => {
    history.push('/editprofile')
  }

  

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
      <div>
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
      <div>
        <Typography sx={{ p: 2 }} >
            <span  onMouseEnter={() => { setRetestHover(true) }} 	     
            onMouseLeave={() => { setRetestHover(false) }}  onClick={retestClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer', color : retestHover? '#F3CD58' : null}}>Retest</span>
            <br />
            <span>--------------</span>
            <br />
            <span  onMouseEnter={() => { setEditHover(true) }} 	     
            onMouseLeave={() => { setEditHover(false) }} onClick= {editClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer', color : editHover? '#F3CD58' : null}}>Edit Profile</span>
            <br />
            <span>--------------</span>
            <br />
            <span onMouseEnter={() => { setLogoutHover(true) }} 	     
            onMouseLeave={() => { setLogoutHover(false) }}  onClick={logoutUser} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer',  color : logoutHover? '#F3CD58' : null}}>Logout</span>            
        </Typography>

      </div>
      </Popover>

      </div>
    </div>
  );
}