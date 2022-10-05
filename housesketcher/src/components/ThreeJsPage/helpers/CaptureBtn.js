import ThreeJSContext from '../../../context/ThreeJSContext';
import { useContext } from 'react';
import classes from './CaptureBtn.module.css'
/// icon 
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';



function CaptureBtn() {
  const ThreeJSCtx = useContext(ThreeJSContext);
  return (
    <div className={classes.icon_box}>
      <CameraAltOutlinedIcon fontSize="large" onClick={() => {ThreeJSCtx.setDownloadFlag(!ThreeJSCtx.downloadFlag)}} />
    </div>
  );
}

export default CaptureBtn;
