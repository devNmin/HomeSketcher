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

///////2D////////////
import Canvas2D from '../components/ThreeJsPage/2d/drawroom'
////////////////////

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

  let currentFloor = 0; // 지금은 1층뿐 복층 건물 이용할때 응용가능 
  let offsetCanvasX = -5.92; // 2D 에서 3D 그려줄 때 생기는 canvas 오차 Offset
  let offsetCanvasY = -4.615; // 2D 에서 3D 그려줄 때 생기는 canvas 오차 Offset
  let [clickRoom, setClickRoom] = useState(0); // 방 넘버 object 클릭시 이용
  let [valueChange, setvalueChange] = useState(false); // 방수치 적용 handler 
  let [initCamera, setinitCamera] = useState(0); // 카메라 뷰 전환 
  let [downloadFlag, setDownloadFlag] = useState(false); // DownLoad

  let [objList, setObjList] = useState([]) // object 리스트 
  let [recomList, setRecomList] = useState([]) // 추천 리스트
  let [isOpen, setIsOpen] = useState(true) //메뉴 토글 
  
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
        console.log(err);
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
    objUrl['centerX'] = (threeInfo[roomNumber].coords[0]['x']+threeInfo[roomNumber].coords[2]['x'])/2+offsetCanvasX
    objUrl['centerY'] = (threeInfo[roomNumber].coords[0]['y']+threeInfo[roomNumber].coords[2]['y'])/2+offsetCanvasY

    if (objList.includes(objUrl)) {
      
    } else {
      setObjList([...objList, objUrl]);    

    }
  };

  // 가구 obj 제거하기
  const removeobjListHandler = (objUrl) => {
    setObjList(objList.filter((obj) => obj.id !== objUrl.id));
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

  //isCollison : 충돌 발생 여부  | setIsCollison : isCollison 토글 시키는 함수

  let [preX, setpreX] = useState(0.0);
  let [preY, setpreY] = useState(0.0);
  let [preZ, setpreZ] = useState(0.0);
  
  
  //================2D==================
  let [roomNumber, setRoomNumber] = useState(0);
  const [showResults, setShowResults] =useState(false)
  let [mouseList] = useState([])
  let [roomList,setRoomList] = useState([])

  let [threeInfo, setThreeInfo] = useState([])

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
    let targetBox = objBox[props.uuid];

    
    // 높이 제한

    if (target.position.y < 0) {
      target.position.y = preY;
    }
    if (target.position.y + (targetBox.max.y - targetBox.min.y) / 2 > 0) {
      target.position.y = preY;
    }
  // })

    
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

  // useContext
  const ThreeJSCtx = useContext(ThreeJSContext);

  function wallColorHandler(e) {
    
    ThreeJSCtx.changeWallColor(e.target.value);
  }

  let [wallNum, setWallNum] = useState(0);

  function wallCreate(){
    
    for (let index = 0; index < threeInfo.length; index++) {
      const element = threeInfo[index]['coords'];
      
      // Wall Top , Right 
      for (let i = 0; i < 2;i++){

        let min = new THREE.Vector3(element[i]['x']+offsetCanvasX, -2, element[i]['y']+offsetCanvasY);
        let max = new THREE.Vector3(element[i+1]['x']+offsetCanvasX, 2, element[i+1]['y']+offsetCanvasY);
        let wall = new THREE.Box3(min, max);
        let key = 'wallNumber_'+index+'_'+i
        objBox[key]=wall

        setWallNum(wallNum+1)
        
      }
      // Wall Bottom, Left
      for (let i = 2; i <4;i++){
        let max = new THREE.Vector3(element[i]['x']+offsetCanvasX, 2, element[i]['y']+offsetCanvasY);
        let min = new THREE.Vector3(element[(i+1)%4]['x']+offsetCanvasX, -2, element[(i+1)%4]['y']+offsetCanvasY);
        let wall = new THREE.Box3(min, max);
        let key = 'wallNumber_'+index+'_'+i

        objBox[key]=wall
        setWallNum(wallNum+1)
        
      }
    }
  }

  const removeRoom = (roomNum)=>{
    let length = roomList.length;

    let newRoomList = [];
    let newThreeList = [];

    for(let i = 0; i < length; i++){
      if(roomList[i].num !== roomNum){
        newRoomList.push(roomList[i]);
        newThreeList.push(threeInfo[i]);
      }
    }
    setClickRoom(newRoomList[0].num);
    setRoomList(newRoomList);
    setThreeInfo(newThreeList);
    setvalueChange(!valueChange);
  }

  return (
    <div className={classes.three_body}>
      {/* 가구 UX 창 */}

      <div className={classes.LeftItems} style={{ overflowY: 'scroll' }}>
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex' }}>
            <DropdownButton
            as={ButtonGroup}
            key= 'Warning'
            id={`dropdown-variants-Warning`}
            variant={'Warning'.toLowerCase()}
            title={roomList[0] ? `Room #${clickRoom+1}`: 'Room List' }
            // title={'Room List'}
            style={{ width : '45%'}}
            >
            {roomList.map((value) =>(
              <div>
                <Dropdown.Item onClick={()=> {setClickRoom(value.num); setRoomNumber(value.num) }} >Room #{value.num+1}</Dropdown.Item>
              </div>
            ))}
              

            </DropdownButton>
          <button onClick={() => {setinitCamera(((initCamera+1)%3)); setDownloadFlag(false);}} style={{ width: '45%', marginLeft: '40px'}}>view change </button>
           
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
          <button  onClick={() => {setDownloadFlag(!downloadFlag)}}>
            Capture
          </button>
          <button style={{ display : 'absolute', marginLeft:'70px'}} onClick={exitHandler}>Exit</button>
        </div>
      </div>

      <div className={classes.RightItems} style={{ backgroundColor: '#E3E8EC' }}>
        {!showResults && <Canvas2D roomNum = {roomNum} valueChange ={valueChange} threeInfo = {threeInfo} showResults = {showResults} roomList = {roomList} setRoomList={setRoomList} isRect = {isRect} mouseList = {mouseList} ></Canvas2D>}
        {showResults &&<Canvas 
          // onPointerMissed = 밖에 클릭시 target null로 만들기
          key={`isometric-${false}`}
          orthographic={false}
          invalidateframeloop="false"
        >
          {/* 가구 3D 모델 */}
          {objList.map((obj) => (
            <ModelT
              position = {[obj.centerX,0,obj.centerY]}
              onPointerMissed={() => setTarget(null)}
              objUrl={obj.glb_url}
              setTarget={setTarget}
            />
          ))}

          {/* <Ground/> */}
       
          <CameraSetup initCamera = {initCamera}/>          
          <ScreenShot  downloadFlag={downloadFlag}/>          
          <ambientLight intensity={0.5} color="#eef" />
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
            <div>
              <button onClick={() => {setShowResults(!showResults) ; wallCreate()}}>change</button>
            </div>
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
                      <button onClick={(e) => {e.preventDefault();setvalueChange(!valueChange)}} style ={{width : '45%', marginRight : '5px'}} >적용</button>
                      <button  style ={{width : '45%'}} onClick={(e)=>{e.preventDefault(); removeRoom(value.num)}}>삭제</button>
                      
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
