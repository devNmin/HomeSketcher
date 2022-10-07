import ThreeJSContext from '../../../context/ThreeJSContext';
import { useContext, useEffect, useState } from 'react';
import classes from './InputGroup.module.css'
/// icon 
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
///
// const textures = {
//   wood: 'https://www.psdgraphics.com/wp-content/uploads/2013/05/basketball-floor-texture.jpg',
// };



function InputGroup() {
  const ThreeJSCtx = useContext(ThreeJSContext);
  function wallColorHandler(e) {
    ThreeJSCtx.changeWallColor2(e.target.value);
  }
  function floorColorHandler(e) {
    ThreeJSCtx.changeFloorColor(e.target.value);
  }
  // const floorTextureHandler = (name) => {
  //   ThreeJSCtx.changeFloorTexture(name);
  // };





  //console.log('ThreeJSCtx.floorTexture', ThreeJSCtx.floorTexture);
  return (
    <div className={classes.display_flex}>
      <div className={classes.inputs_box}></div>
      <div className={classes.style_div}>
        <div className={classes.style_icon_box}>
          <ColorLensOutlinedIcon fontSize="large" />
        </div>
        <div className={classes.style_inputs}>
          <div className={classes.input_div}>
            <label htmlFor="wallColor">wall</label>
            <input
              type="color"
              id="wallColor"
              // value={ThreeJSCtx.wallColor}
              onChange={(e) => {
                wallColorHandler(e);
              }}
            />
          </div>
          <div className={classes.input_div}>
            <label htmlFor="floorColor">floor</label>
            <input
              type="color"
              id="floorColor"
              value={ThreeJSCtx.floorColor}
              onChange={(e) => {
                floorColorHandler(e);
              }}
            />
          </div>
          {/* // 바닥 재질 바꾸기...> 바꾸고 랜더링이 안되서 지워둠
          <div>
            {ThreeJSCtx.floorTexture ? 
              <p
                onClick={() => {
                  floorTextureHandler('plane');
                }}
              >
                wood
              </p>
              : 
              <p
                onClick={() => {
                  floorTextureHandler('wood');
                }}
              >
                plane
              </p>
            }
          </div> 
          */}
        </div>
      </div>
      <div className={classes.object_div}>
        <div className={classes.object_icon_box}>
          <LivingOutlinedIcon fontSize="large" />
        </div>
        <div className={classes.object_inputs}>
          <p onClick={()=>ThreeJSCtx.changeMode('translate')}>Translate</p>
          <p onClick={()=>ThreeJSCtx.changeMode('rotate')}>Rotate</p>
          <p onClick={()=>ThreeJSCtx.changeMode('scale')}>Scale</p>
        </div>
      </div>
      <div className={classes.camera_div}>
        <div onClick={() => {ThreeJSCtx.setInitCamera(((ThreeJSCtx.initCamera+1)%3)); ThreeJSCtx.setDownloadFlag(false);}}>
          <RemoveRedEyeOutlinedIcon fontSize="large"  />
        </div>
      </div>
    </div>
  );
}

export default InputGroup;
