import { createContext, useState } from 'react';

const ThreeJSContext = createContext({
  wallColor: '',
  changeWallColor: () => {},
  roomCnt : 0,
  changeRoomCnt : ()=>{},
  floorColor: '',
  changeFloorColor: () => {},
  floorTexture: null,      
  changeFloorTexture: () => {},
  mode: '',
  changeMode: () => {},
  initCamera: 0,
  setInitCamera: () => {},
  downloadFlag: false,
  setDownloadFlag: () => {},
});




export function ThreeJSContextProvider(props) {
  
  const [wallColor, setWallColor] = useState('#a39b9b');
  const [roomCnt, setRoomCnt] = useState(0);
  const [floorColor, setFloorColor] = useState('#E5D8B0');
  const [floorTexture, setFloorTexture] = useState('wood');
  const [mode, setMode] = useState('translate');
  const [initCamera, setInitCamera] = useState(0);
  const [downloadFlag, setDownloadFlag] = useState(false);

  const wallColorHandler = (color) => {
    setWallColor(color);
  };
  const floorColorHandler = (color) => {
    setFloorColor(color);
  };
  const floorTextureHandler = (texture) => {
    if (texture === 'wood') {
      setFloorTexture(texture);
    } else {
      setFloorTexture(null);
    }
  };
  const roomCntHandler = (roomCnt)=>{
    setRoomCnt(roomCnt)
  }
  const modeHandler = (name) => {
    setMode(name)
    //console.log('context', mode)
  }
  const initCameraHandler = (value) => {
    setInitCamera(value)
  }
  const downloadFlagHandler = (value) => {
    setDownloadFlag(value)
    //ThreeJSCtx
  }

  const context = {
    wallColor: wallColor,
    changeWallColor: wallColorHandler,
    roomCnt: roomCnt,
    changeRoomCnt : roomCntHandler,
    floorColor: floorColor,
    changeFloorColor: floorColorHandler,
    floorTexture: floorTexture,      
    changeFloorTexture: floorTextureHandler,
    mode: mode,
    changeMode: modeHandler,
    initCamera: initCamera,
    setInitCamera: initCameraHandler,
    downloadFlag: downloadFlag,
    setDownloadFlag: downloadFlagHandler,
  };

  return (
    <ThreeJSContext.Provider value={context}>{props.children}</ThreeJSContext.Provider>
  );
}

export default ThreeJSContext;
