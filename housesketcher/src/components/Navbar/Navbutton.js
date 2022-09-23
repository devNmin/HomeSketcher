import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/AuthContext';
import {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import swal from "sweetalert2";

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
            <p  onClick={retestClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer'}}>Retest</p>
            <hr />
            <p onClick= {editClickHandler} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer'}}>Edit Profile</p>
            <hr />
            <p onClick={logoutUser} style={{ marginTop: '0.5rem', marginBottom : '0.5rem' , cursor:'pointer'}}>Logout</p>            
        </Typography>

      </div>
      </Popover>

      </div>
    </div>
  );
}