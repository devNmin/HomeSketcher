import React, { useEffect, useContext, useState, useMemo, useRef, } from 'react';
import { Canvas, useThree} from 'react-three-fiber';
import { a, useSpring } from '@react-spring/three';
import { useHistory } from 'react-router-dom';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';

import ModelT from '../components/ThreeJsPage/Modelt';
import  CameraSetup  from '../components/ThreeJsPage/CameraSetup';
import  ScreenShot  from '../components/ThreeJsPage/ScreenShot';
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';
import classes from './ThreeJsPage.module.css';

///////////////////////
import create from 'zustand';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useControls } from 'leva';
import Liked from '../components/ThreeJsPage/Liked';
import Staged from '../components/ThreeJsPage/Staged';
import axios from '../utils/axios';
import AuthContext from '../context/AuthContext';
import ItemUX from '../components/ThreeJsPage/ItemUX';
import ClipLoader from 'react-spinners/ClipLoader';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as THREE from 'three';
//////////////////////////
import ThreeJSContext from '../context/ThreeJSContext.js';
import InputGroup from '../components/ThreeJsPage/helpers/InputGroup';
import CaptureBtn from '../components/ThreeJsPage/helpers/CaptureBtn'
///////2D////////////
import Canvas2D from '../components/ThreeJsPage/2d/drawroom'
////////////////////
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
///////data load (나중에 방 데이터 저장 불러오기 쓸때 참고용)/////////
// import data from '../components/ThreeJsPage/floplan-data.json';
const DevTools = () => {
  const { scene, renderer } = useThree();

  new CustomEvent('observe', { detail: renderer });
  new CustomEvent('observe', { detail: scene });

  return null;
};

const useStore = create((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));

// ThreeJsPage
export default function ThreeJsPage() {
  
  const [loading, setLoading] = useState(false); // 가구 loading 
  const history = useHistory(); // exit 누를시 홈으로 
  let { BASE_URL } = useContext(AuthContext); 
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  ); // Token 
  const ThreeJSCtx = useContext(ThreeJSContext);

  let currentFloor = 0; // 지금은 1층뿐 복층 건물 이용할때 응용가능 
  let offsetCanvasX = -5.92; // 2D 에서 3D 그려줄 때 생기는 canvas 오차 Offset
  let offsetCanvasY = -4.615; // 2D 에서 3D 그려줄 때 생기는 canvas 오차 Offset
  let [clickRoom, setClickRoom] = useState(0); // 방 넘버 object 클릭시 이용
  let [valueChange, setvalueChange] = useState(false); // 방수치 적용 handler 
  // let [objList, setObjList] = useState([]) // object 리스트 
  let [recomList, setRecomList] = useState([]) // 추천 리스트
  let [isOpen, setIsOpen] = useState(true) //메뉴 토글 
  let [urls, setUrls] = useState([])

  let objList = ThreeJSCtx.objList;

  // 추천 아이템 Axios
  const getRecomFurnitures = async () => {
    await axios({
      method: 'get',
      url: BASE_URL + 'furnitures/3d/furniture/',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    })
      .then((response) => {
        setRecomList(Object.entries(response.data));
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // 총 가격 계산
  let totalcost = 0;
  objList.forEach((obj) => {
    totalcost += obj.furniture_price;
  });

  //useEffetct
  useEffect(() => {
    getRecomFurnitures();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

  // 가구 obj 더해주기
  const addobjListHandler = (objUrl) => {
    // roomList  0 여기에 room number 넣어주면 됨 
    // modelT에 position을 넣기위해 centerX,Y를 추가해줌
    
    // uuid를 추가해줘야하는데 방법이 없을까? target을 클릭을 안해서 uuid도 모름 
    // 따라서 obj클릭쪽에서 업데이트를 해줘야하는데 어떤 objurl인지 매칭이안됨
    let length = roomList.length;
    for(let i = 0; i < length; i++){
      
      if(roomList[i].num === roomNumber){

        objUrl['centerX'] = (threeInfo[i].coords[0]['x']+threeInfo[i].coords[2]['x'])/2+offsetCanvasX
        objUrl['centerY'] = (threeInfo[i].coords[0]['y']+threeInfo[i].coords[2]['y'])/2+offsetCanvasY
        // objUrl['rotation'] = {"_x":0 ,"_y": 0, "_z":0}
        // objUrl['scale'] = {"x":1 ,"y": 1, "z":1}

        break;
      }
    }

    if (urls.includes(objUrl.glb_url)) {      
      alert('Sorry! Same glb file cannot be added to 3D canvas!')  
    } else {
      let data = objList;
      data.push(objUrl);
      // setObjList([...objList, objUrl]);
      ThreeJSCtx.objListHandler(data);
      setUrls([...urls, objUrl.glb_url])         
    }

  };

  // 가구 obj 제거하기
  const removeobjListHandler = (objUrl) => {
    // setObjList(objList.filter((obj) => obj.id !== objUrl.id));
    ThreeJSCtx.objListHandler(objList.filter((obj) => obj.id !== objUrl.id))

  };

  // toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // 방수치 X값 변경(가로)
  const changeXHandler = (e) => {
    
    // e.target.value*45 = math.abs(nx-fx)
    if (roomList[e.target.id]['fx'] < roomList[e.target.id]['nx']){
 
      roomList[e.target.id]['nx'] = parseFloat(e.target.value)*45+roomList[e.target.id]['fx']
      roomList[e.target.id]['centerX'] = (roomList[e.target.id]['fx']+roomList[e.target.id]['nx'])/2

      threeInfo[e.target.id]['coords'][1]['x'] = threeInfo[e.target.id]['coords'][0]['x']+parseFloat(e.target.value)
      threeInfo[e.target.id]['coords'][2]['x'] = threeInfo[e.target.id]['coords'][0]['x']+parseFloat(e.target.value)
    }
    else{
      roomList[e.target.id]['fx'] = roomList[e.target.id]['nx']- parseFloat(e.target.value)*45
      roomList[e.target.id]['centerX'] = (roomList[e.target.id]['fx']+roomList[e.target.id]['nx'])/2

      threeInfo[e.target.id]['coords'][0]['x'] = threeInfo[e.target.id]['coords'][1]['x']-parseFloat(e.target.value)
      threeInfo[e.target.id]['coords'][3]['x'] = threeInfo[e.target.id]['coords'][1]['x']-parseFloat(e.target.value)
    }
    wallCreate() //벽 업데이트
  };
  // 방수치 Y값 변경(세로)
  const changeYHandler = (e) => {
    if (roomList[e.target.id]['fy'] < roomList[e.target.id]['ny']){

      roomList[e.target.id]['ny'] = parseFloat(e.target.value)*45+roomList[e.target.id]['fy']
      roomList[e.target.id]['centerY'] = (roomList[e.target.id]['fy']+roomList[e.target.id]['ny'])/2 // 룸 센터좌표 업데이트 

      threeInfo[e.target.id]['coords'][2]['y'] = threeInfo[e.target.id]['coords'][0]['y']+parseFloat(e.target.value)
      threeInfo[e.target.id]['coords'][3]['y'] = threeInfo[e.target.id]['coords'][0]['y']+parseFloat(e.target.value)
    }
    else{
      roomList[e.target.id]['fy'] = roomList[e.target.id]['ny']- parseFloat(e.target.value)*45
      roomList[e.target.id]['centerY'] = (roomList[e.target.id]['fy']+roomList[e.target.id]['ny'])/2 // 룸 센터좌표 업데이트 

      threeInfo[e.target.id]['coords'][0]['y'] = threeInfo[e.target.id]['coords'][1]['y']-parseFloat(e.target.value)
      threeInfo[e.target.id]['coords'][1]['y'] = threeInfo[e.target.id]['coords'][1]['y']-parseFloat(e.target.value)
    }
    wallCreate() //벽 업데이트
  };

  
  const exitHandler = () => {
    history.push('/');
  };

  const { target, setTarget } = useStore();
  
  
  


  //checkIntersect -> 충돌 확인, true일때 충돌난 경우

  // objBox에 setBox를 이용해서 box들을 json 형태로 저장한다.
  let [objBox, setBox] = useState({});
  let [objPosition, setObjPosition] = useState({});
  // let [objRotation, setObjRotation] = useState({});
  // let [objScale, setObjScale] = useState({});

  //isCollison : 충돌 발생 여부  | setIsCollison : isCollison 토글 시키는 함수

  let [preX, setpreX] = useState(0.0);
  let [preY, setpreY] = useState(0.0);
  let [preZ, setpreZ] = useState(0.0);
  
  
  //================2D==================
  let [roomNumber, setRoomNumber] = useState(0);
  const [showResults, setShowResults] =useState(false)
  let [mouseList] = useState([])
  // let [roomList,setRoomList] = useState([])
  let roomList = ThreeJSCtx.roomList;
  let setRoomList = ThreeJSCtx.changeRoomList;
  let threeInfo = ThreeJSCtx.threeInfo;
  let setThreeInfo = ThreeJSCtx.changeThreeInfo;

  // let [threeInfo, setThreeInfo] = useState([])

  let [isRect,setIsRect] = useState(true);
  

  let newItem = {
    floors: [
      {
        y: 0,
        doors: [],
        windows: [],
        rooms: threeInfo
      },
    ],
  };
  
  // 
  
  let animatedFloorPosition = useFloorTransitionAnimation({
    floors: newItem.floors,
    currentFloor,
  });

  let [roomNum, setDeleteRoom] = useState();

  //================2D=================

  function ObjectChangeHandler(props) {
    
    const box = new THREE.Box3().setFromObject(props); // 현재 박스
    
    // setBox -> objBox 리스트. 가구 box들을 저장하는 리스트. 현재 위치를 업데이트 해 줌.
    setBox((prevState) => ({
      ...prevState,
      [props.uuid]: box,
    }));
    
    setObjPosition((prevState) => ({
      ...prevState,
      [props.uuid]: box,
    }));
    
    // setObjRotation((prevState) => ({
    //   ...prevState,
    //   [props.uuid]: props.rotation,
    // }));
    // setObjScale((prevState) => ({
    //   ...prevState,
    //   [props.uuid]: props.scale,
    // }));
    
    let targetBox = objBox[props.uuid];
    
    if (targetBox && ((target.position.y < 0) ||(targetBox.max.y > 2.4))) {
      target.position.y = preY;
    }
  

    // let result2 = Object.entries(objRotation); 

    // for (let index = 0; index < result2.length; index++) {
    //   // let uuid = result2[index][0]
    //   let objRotations = result2[index][1]
    //   console.log("objRotation: ",objRotations)
    //   objList[index]['rotation'] = objRotations
    // }
    // // console.log("후후후",objList)
    // // ----------------------------------
    
    // // console.log("result3" , result3)
    // let result3 = Object.entries(objScale); 
    
    // for (let index = 0; index < result3.length; index++) {
    //   // let uuid = result3[index][0]
    //   let objScales = result3[index][1]
    //   // console.log("objBoxPosition: ", objScales)
    //   objList[index]['scale'] = objScales
    // }



    // setObjRotation((prevState) => ({
    //   ...prevState,
    //   [props.uuid]: props.rotation,
    // }));
    // setObjScale((prevState) => ({
    //   ...prevState,
    //   [props.uuid]: props.scale,
    // }));
    
    // 벽 충돌 포함
    // Check collision box -> 충돌 확인 // 오브젝트간 충돌
    for (const key in objBox) {
      if(props.uuid !==key){ // 자기 자신 아닌 경우
        // if (box.intersectsBox(objBox[key])){ // 충돌이 발생한 경우
        if (box.intersectsBox(objBox[key])){ // 충돌이 발생한 경우
          // 이전 좌표로 고정 
          target.position.x = preX;
          target.position.y = preY;
          target.position.z = preZ;
        }        
      }
    }
    // 이전 좌표 업데이트 
    setpreX(target.position.x);
    setpreY(target.position.y);
    setpreZ(target.position.z);

    
 
  }


  let [wallNum, setWallNum] = useState(0);

  function wallCreate(){
    
    for (let index = 0; index < threeInfo.length; index++) {
      const element = threeInfo[index]['coords'];
      const wallOffset = 0.2
      const wallOffset2 = 0.1
      const wallHeight = 2
      // Wall Top , Right 
      for (let i = 0; i < 2;i++){

        let min = new THREE.Vector3(element[i]['x']+offsetCanvasX-wallOffset, -wallHeight, element[i]['y']+offsetCanvasY+wallOffset+0.1);
        let max = new THREE.Vector3(element[i+1]['x']+offsetCanvasX-wallOffset, wallHeight, element[i+1]['y']+offsetCanvasY+wallOffset+0.1);
        let wall = new THREE.Box3(min, max);
        let key = 'wallNumber_'+index+'_'+i
        objBox[key]=wall

        setWallNum(wallNum+1)
        
      }
      // Wall Bottom, Left
      for (let i = 2; i <4;i++){
        let max = new THREE.Vector3(element[i]['x']+offsetCanvasX+wallOffset2, wallHeight, element[i]['y']+offsetCanvasY+wallOffset2);
        let min = new THREE.Vector3(element[(i+1)%4]['x']+offsetCanvasX, -wallHeight, element[(i+1)%4]['y']+offsetCanvasY);
        let wall = new THREE.Box3(min, max);
        let key = 'wallNumber_'+index+'_'+i

        objBox[key]=wall
        setWallNum(wallNum+1)
        
      }
    }

  }

  

  //방 삭제 함수
  const removeRoom = (roomNum)=>{
    let length = roomList.length;
    
    let newRoomList = [];
    let newThreeList = [];
    let newColorJson = {};

    
    for(let i = 0; i < length; i++){
      if(roomList[i].num !== roomNum){
        newRoomList.push(roomList[i]);
        newThreeList.push(threeInfo[i]);
        newColorJson[roomList[i].num] = ThreeJSCtx.wallColor2[roomList[i].num];
      }
    }
    //방이 있을 때만 적용
    if(newRoomList.length>0){
      setClickRoom(newRoomList[0].num);
    }
    // else{
      // setClickRoom(roomNum);
      // console.log("fffffffff",roomNum);
    // }
    setRoomList(newRoomList);
    setThreeInfo(newThreeList);
    ThreeJSCtx.wallListHander(newColorJson)
    
    setvalueChange(!valueChange);
    
  }

  // 내가 설정한 방 정보 저장 -> 1개만 됨
  const myRoomSave =  async() =>{
    let userInfo = localStorage.getItem('userInfo')
    let user_id = JSON.parse(userInfo)['id'];

    let wallColor = ThreeJSCtx.wallColor2;


    let result = Object.entries(objPosition);  //objPosition 0 1 2 3 4 5 
    for (let index = 0; index < result.length; index++) {
      let uuid = result[index][0]
      let objBoxPosition = objBox[uuid]
      
      objList[index]['centerX'] = (objBoxPosition.max.x+objBoxPosition.min.x)/2
      objList[index]['centerY'] = (objBoxPosition.max.z+objBoxPosition.min.z)/2
      break
    }

      
    // let result2 = Object.entries(objRotation);
    // for (let index = 0; index < result2.length; index++) {
    //   let objRotations = result2[index][1]
    //   console.log("objRotation: ",objRotations)
    //   objList[index]['rotation'] = objRotations
    // }
    
    // let result3 = Object.entries(objScale); 
    
    // for (let index = 0; index < result3.length; index++) {
      
    //   let objScales = result3[index][1]
    //   objList[index]['scale'] = objScales
    // }

    let save_json = {}
    save_json['roomList'] = roomList
    save_json['threeInfo'] = threeInfo
    save_json['objList'] = objList
    save_json['objBox'] = objBox
    save_json['wallColor'] = wallColor;
    
    await axios({
      method: 'post',
      url: 'https://j7b304.p.ssafy.io/fastapi/' + `myroom/save/`+user_id,
      data : save_json ,
      headers:{
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then((response) => {
      alert("Room save success");
    })
    .catch((err) => {
      alert("Room save failed! Try again Please");
    });
  }

  
  // 내가 저장한 최신 방 불러오기
  const myRoomLoad = async(modelHouse)=>{
      let userInfo = localStorage.getItem('userInfo')
      let user_id = JSON.parse(userInfo)['id'];

      //true 이면 모델하우스 예시를 뽑아오도록 바꿈
      if(modelHouse){
        user_id = 30; //모델하우스 파일명을 넣어줌
      }
    
      await axios({
        method: 'get',
        url: 'https://j7b304.p.ssafy.io/fastapi/' + `myroom/load/${user_id}`,
        headers:{
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      })
        .then((response) => {
          let data = response.data;
          ThreeJSCtx.changeRoomCnt(data.roomList[data.roomList.length-1].num+1)
          ThreeJSCtx.wallListHander(data.wallColor)
          setShowResults(false)
          setRoomList(data.roomList);
          setThreeInfo(data.threeInfo);
          // setObjList(data.objList);
          ThreeJSCtx.objListHandler(data.objList);
          // setObjRotation(data.objList.rotation);
          // setObjScale(data.objList.scale);
          setBox(data.objBox);
          wallCreate(); 
          setvalueChange(!valueChange);
        })
        .catch((err) => {
          alert("Room Loading failed! please try again");
        });
  };
  

  return (
    <div className={classes.three_body}>
      {/* 가구 UX 창 */}

      <div className={classes.LeftItems} style={{ overflowY: 'scroll' }}>
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex' }}>
            <DropdownButton
                // onClick={() => {test(); }}
                as={ButtonGroup}
                key= 'Warning'
                id={`dropdown-variants-Warning`}
                variant={'Warning'.toLowerCase()}
                title={
                  clickRoom ? `Room #${clickRoom+1}`: 'Room List' 
                }
                // title={
                //   roomList.length>0 ? `Room #${clickRoom+1}`: 'Room List' 
                // }
                // title={'Room List'}
                style={{ width : '45%'}}
                >
                {roomList.map((value) =>(
                  <div>
                    <Dropdown.Item onClick={()=> {setClickRoom(value.num); setRoomNumber(value.num); ThreeJSCtx.changeRoomNum(value.num) }} >Room #{value.num+1}</Dropdown.Item>
                  </div>
                ))}
                  

              </DropdownButton>
     
          {/* 여기밑에부분은 테스트용임을 알림니다. */}
          <div style={{ width: '45%' }}>
            <button onClick={() => myRoomSave()} className={classes.save_load}>Save</button>
            <button onClick={() => myRoomLoad(false)} className={`${classes.save_load} ${classes.margin_top}`}>Load</button>
          </div> 
          </div>                      
            <br />
            <br />
                        
            <button style={{ width: '100%'}}>Staged Furnitures</button>
            <Staged furnitures = {objList} removeObj ={removeobjListHandler}/>
            <br />
            <div style={{display : 'flex', justifyContent: 'center'}}>
              Total Cost : {totalcost} $
            </div>
            <br />


          {loading ? (
            <b>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3>Setting for</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h3>Your furnitures</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ClipLoader color={'#F3CD58'} loading={loading} size={50} />
              </div>
            </b>
          ) : null}

          <button
            onClick={() => toggleMenu()}
            style={{
              width: '100%',
              marginBottom: '1px',
              display: loading ? 'none' : null,
            }}
          >
            Liked Furnitures
          </button>
          {loading ? null : (
            <div>{isOpen ? <Liked addObj={addobjListHandler} /> : null}</div>
          )}
          {recomList.map(([key, value]) => (
            <div key={key} style={{ display: loading ? 'none' : null }}>
              <ItemUX furnkey={key} furnvalue={value} addobjHandler={addobjListHandler} />
            </div>
          ))}
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={exitHandler}>Exit</button>
          </div>
        </div>
      </div>

      <div className={classes.RightItems} style={{ backgroundColor: '#E3E8EC' }}>
        {!showResults && <Canvas2D roomNum = {roomNum} valueChange ={valueChange} threeInfo = {threeInfo} showResults = {showResults} roomList = {roomList} setRoomList={setRoomList} isRect = {isRect} mouseList = {mouseList} ></Canvas2D>}
        {showResults &&<Canvas 
          // onPointerMissed = 밖에 클릭시 target null로 만들기
          onPointerMissed={() => setTarget(null)}
          key={`isometric-${false}`}
          orthographic={false}
          invalidateframeloop="false"
        >
          {/* 가구 3D 모델 */}
          {objList.map((obj) => (
            <ModelT
              position = {[obj.centerX,0,obj.centerY]}
              onPointerMissed={() => setTarget(null)}
              // scale = {[obj.scale.x,obj.scale.y,obj.scale.z]}
              // rotation = {[obj.rotation._x,obj.rotation._y,obj.rotation._z]}
              objUrl={obj.glb_url}
              setTarget={setTarget}
            />
          ))}

          {/* <Ground/> */}
       
          <CameraSetup initCamera = {ThreeJSCtx.initCamera}/>          
          <ScreenShot  downloadFlag={ThreeJSCtx.downloadFlag}/>          
          <ambientLight intensity={0.5} color="#eeeeff" />
          <pointLight position={[20, 10, -10]} decay={1} castShadow={true} />
          <pointLight position={[-20, 20, 5]} decay={1} castShadow={true} />

          <a.group position={animatedFloorPosition} style={{ zIndex: 1 }}>
            <FloorPlan
              interactiveFloors={[currentFloor]}
              data={newItem}
              showCorners={false}
            />
          </a.group>

          {target && (
            <TransformControls 
              onChange={(e) => {
                ObjectChangeHandler(target);
              }}
              object={target}
              mode= {ThreeJSCtx.mode}
            />
          )}
          <OrbitControls makeDefault />
          <DevTools />
        </Canvas>}
        <div>
          
          {/* 뷰 + 코너 확인 */}
          <div className={`${classes.controls} ${classes.perspectiveControls}`}>
            <button
              className={classes.change_btn} 
              onClick={(e) => {
                e.preventDefault(); 
                setShowResults(!showResults) ; 
                wallCreate();  
                setvalueChange(!valueChange);
                // setTimeout(() => {
                // }, 100);
              }}>
              Change
            </button>
            <button className={classes.model_house} onClick={(e)=>{
              e.preventDefault();
              myRoomLoad(true);
            }}>ModelHouse</button>
           
              
           
            </div>

            {/* 방 수치 변경 */}
            <div className={classes.help}>
              {roomList.map(value => (
                <div className={clickRoom !== value.num ? classes.display_none : null}>
                  <form>
                    <p className={classes.room_title}>Room {value.num+1}</p>
                    <label className={classes.room_size_input} htmlFor="x" style={{ marginRight : '6px'}}>Width :</label>                    
                    <input id={`${value.num}`} placeholder={(Math.abs(value.nx-value.fx)/45).toFixed(2)} onChange={(e)=>{changeXHandler(e)}}  />
                    <label className={classes.room_size_input}>(m)</label>       
                    <br/>
                    <label className={classes.room_size_input} htmlFor="y" style={{ marginRight : '4px'}}>Height: </label>
                    <input id={`${value.num}`} placeholder={(Math.abs(value.ny-value.fy)/45).toFixed(2)} onChange={(e)=>{changeYHandler(e)}} />
                    <label className={classes.room_size_input}>(m)</label>       
                    <br/>
                    <br/> 
                    <div style={{ display : 'flex', justifyContent: 'center'}}>
                      <button onClick={(e) => {e.preventDefault();setvalueChange(!valueChange)}} style ={{width : '45%', marginRight : '5px'}} >apply</button>
                      <button  style ={{width : '45%'}} onClick={(e)=>{e.preventDefault(); removeRoom(value.num)}} >delete</button>
                      
                    </div>                   
                  </form>
                </div>
              ))}
            </div>
            
            
            <div className={`${classes.controls} ${classes.doorControls}`}>
              {newItem.floors[currentFloor].doors
                .filter(({ direction }) => direction !== 0)
                .map(({ id }) => (
                  <div key={id}>
                    <label htmlFor={`door-${id}`}>{id} door</label>
                    <input name={`door-${id}`} type="checkbox" />
                  </div>
                ))}
            </div>
            {/* 벽 색 인풋 받기 */}
            <InputGroup />
            <CaptureBtn />
            
          </div>
          </div>
      </div>
    
  );
}

const useFloorTransitionAnimation = ({ floors, currentFloor }) => {
  let currentFloorY = useMemo(() => {
    return floors
      .slice(0, currentFloor + 1)
      .reduce((y, floor, index) => y + DISTANCE_BETWEEN_FLOORS * index, 0);
  }, [floors, currentFloor]);

  const { position } = useSpring({
    position: [0, -currentFloorY, 0],
    config: { mass: 6, tension: 500, friction: 100, precision: 0.0001 },
  });

  return position;
};
