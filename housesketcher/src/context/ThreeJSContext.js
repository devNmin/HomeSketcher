import { createContext, useState } from 'react';

const ThreeJSContext = createContext({
  roomCnt: 0,
  changeRoomCnt: () => {},
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
  ///
  wallColor2: {},
  changeWallColor2: () => {},
  roomNum: 0,
  changeRoomNum: () => {},

  //roomList, threeInfo
  roomList: [],
  setRoomList: () => {},
  threeInfo: [],
  setThreeInfo: () => {},
  //roomList, threeInfo
  wallListHander: () => {},

  //objList
  objList: [],
  setObjList: () => {},
});

export function ThreeJSContextProvider(props) {
  const [roomCnt, setRoomCnt] = useState(0);
  const [floorColor, setFloorColor] = useState('#E5D8B0');
  const [floorTexture, setFloorTexture] = useState('wood');
  const [mode, setMode] = useState('translate');
  const [initCamera, setInitCamera] = useState(0);
  const [downloadFlag, setDownloadFlag] = useState(false);
  ///
  const [wallColor2, setWallColor2] = useState({});
  const [wallColor, setWallColor] = useState('#FAFAFA');
  const [roomNum, setRoomNum] = useState(0);

  //roomList, threeInfo
  const [roomList, setRoomList] = useState([]);
  const [threeInfo, setThreeInfo] = useState([]);
  //roomList, threeInfo

  //objList
  const [objList, setObjList] = useState([]); // object 리스트

  //objList
  const objListHandler = (objList) => {
    setObjList(objList);
  };

  //roomList, threeInfo
  const roomListHandler = (room) => {
    setRoomList(room);
  };
  const threeInfoHandler = (three) => {
    setThreeInfo(three);
  };

  ///
  const wallColorHandler2 = (color) => {
    setWallColor2((prevState) => ({
      ...prevState,
      [roomNum]: color,
    }));
    // wallColor2[roomNum] = color;

    // setWallColor2(wallColor2);
  };
  const wallListHander = (dict) => {
    setWallColor2(dict);
  };
  const roomNumHandler = (num) => {
    setRoomNum(num);
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
  const roomCntHandler = (roomCnt) => {
    setRoomCnt(roomCnt);
  };
  const modeHandler = (name) => {
    setMode(name);
    //console.log('context', mode)
  };
  const initCameraHandler = (value) => {
    setInitCamera(value);
  };
  const downloadFlagHandler = (value) => {
    setDownloadFlag(value);
    //ThreeJSCtx
  };

  const context = {
    roomCnt: roomCnt,
    changeRoomCnt: roomCntHandler,
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

    wallColor2: wallColor2,
    changeWallColor2: wallColorHandler2,
    roomNum: roomNum,
    changeRoomNum: roomNumHandler,

    //roomList, threeInfo
    roomList: roomList,
    changeRoomList: roomListHandler,
    threeInfo: threeInfo,
    changeThreeInfo: threeInfoHandler,
    wallListHander: wallListHander,
    //roomList, threeInfo

    //objList
    objList: objList,
    objListHandler: objListHandler,
  };

  return (
    <ThreeJSContext.Provider value={context}>{props.children}</ThreeJSContext.Provider>
  );
}

export default ThreeJSContext;
