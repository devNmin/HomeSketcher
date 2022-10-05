import ThreeJSContext from '../../../context/ThreeJSContext';
import { useContext, useEffect, useState } from 'react';
import classes from './InputGroup.module.css'
/// icon 
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
///
const textures = {
  wood: 'https://www.psdgraphics.com/wp-content/uploads/2013/05/basketball-floor-texture.jpg',
};

function InputGroup() {
  const ThreeJSCtx = useContext(ThreeJSContext);
  function wallColorHandler(e) {
    ThreeJSCtx.changeWallColor(e.target.value);
  }
  function floorColorHandler(e) {
    ThreeJSCtx.changeFloorColor(e.target.value);
  }
  const floorTextureHandler = (name) => {
    ThreeJSCtx.changeFloorTexture(name);
  };

  const [styleControlDisplay, setStyleControlDisplay] = useState(false);
  const [objectControlDisplay, setObjectControlDisplay] = useState(false)

  //console.log('ThreeJSCtx.floorTexture', ThreeJSCtx.floorTexture);
  return (
    <div>
      <div className={classes.display_flex}>
        <ColorLensOutlinedIcon onClick={()=>{setStyleControlDisplay(true)}} />
        <LivingOutlinedIcon />
      </div>
      {/* 벽 색 인풋 받기 */} 
      <div>
        <div>
          <label htmlFor="wallColor">wall color</label>
          <input
            type="color"
            id="wallColor"
            value={ThreeJSCtx.wallColor}
            onChange={(e) => {
              wallColorHandler(e);
            }}
          />
          <label htmlFor="floorColor">floor color</label>
          <input
            type="color"
            id="floorColor"
            value={ThreeJSCtx.floorColor}
            onChange={(e) => {
              floorColorHandler(e);
            }}
          />
          <div>
            {ThreeJSCtx.floorTexture ? (
              <p
                onClick={() => {
                  floorTextureHandler('plane');
                }}
              >
                wood
              </p>
            ) : (
              <p
                onClick={() => {
                  floorTextureHandler('wood');
                }}
              >
                plane
              </p>
            )}
          </div>
        </div>
        <div className={classes.display_flex}>
          <p onClick={()=>ThreeJSCtx.changeMode('translate')}>translate</p>
          <p onClick={()=>ThreeJSCtx.changeMode('rotate')}>rotate</p>
          <p onClick={()=>ThreeJSCtx.changeMode('scale')}>scale</p>
        </div>
      </div>
    </div>
  );
}

export default InputGroup;
