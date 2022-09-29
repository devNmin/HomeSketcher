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
  const hisory = useHistory()

  const retestClickHandler = () => {
    hisory.push('/tasteanalysis')
  }

  const editClickHandler = () => {
    new swal({
      title: 'Edit your profile',
      input: 'email',
      inputPlaceholder: 'Example@email.xxx',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (email === 'example@email.com') {
              swal.showValidationError(
                'This email is already taken.'
              )
            }
            resolve()
          }, 2000)
        })
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Thank you for subscribe!',
          html: 'Submitted email: ' + result.value
        })
      }
    })
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
            <p  onMouseEnter={() => { setRetestHover(true) }} 	     
            onMouseLeave={() => { setRetestHover(false) }}  onClick={retestClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer', color : retestHover? '#F3CD58' : null}}>Retest</p>
            <hr />
            <p  onMouseEnter={() => { setEditHover(true) }} 	     
            onMouseLeave={() => { setEditHover(false) }} onClick= {editClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer', color : editHover? '#F3CD58' : null}}>Edit Profile</p>
            <hr />
            <p onMouseEnter={() => { setLogoutHover(true) }} 	     
            onMouseLeave={() => { setLogoutHover(false) }}  onClick={logoutUser} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer',  color : logoutHover? '#F3CD58' : null}}>Logout</p>            
        </Typography>

      </div>
      </Popover>

      </div>
    </div>
  );
}