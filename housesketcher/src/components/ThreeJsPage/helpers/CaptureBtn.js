import ThreeJSContext from '../../../context/ThreeJSContext';
import { useContext } from 'react';
import classes from './CaptureBtn.module.css'
/// icon 
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {stepsss} from '../../joyride/steps'
import Joyride from "react-joyride";

function CaptureBtn() {
  const ThreeJSCtx = useContext(ThreeJSContext);
  return (
    <div className={classes.icon_box} >
      <CameraAltOutlinedIcon data-joyride="capture" fontSize="large" onClick={() => {ThreeJSCtx.setDownloadFlag(!ThreeJSCtx.downloadFlag)}} />
    </div>
  );
}

export default CaptureBtn;
