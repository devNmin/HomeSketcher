import ThreeJSContext from '../../../context/ThreeJSContext';
import { useContext } from 'react';
import classes from './CaptureBtn.module.css'
/// icon 
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';

function CaptureBtn() {
  const ThreeJSCtx = useContext(ThreeJSContext);
  return (
    <div>
      <div className={classes.icon_box2}>
        <ChairOutlinedIcon fontSize="large"/>
      </div>
      <div className={classes.icon_box}>
        <CameraAltOutlinedIcon fontSize="large" onClick={() => {ThreeJSCtx.setDownloadFlag(!ThreeJSCtx.downloadFlag)}} />
      </div>
    </div>
  );
}

export default CaptureBtn;
