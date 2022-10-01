import React, {useEffect ,useContext, useState, useReducer, useMemo, useRef, Suspense } from 'react';
import { Canvas, useThree, useFrame  } from "react-three-fiber";
import { a, useSpring } from '@react-spring/three';
import { useHistory } from 'react-router-dom';
// import data from '../components/ThreeJsPage/floplan-data.json';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';
import Ground from '../components/ThreeJsPage/Ground';

import  ModelT  from '../components/ThreeJsPage/Modelt';
import Model from '../components/ThreeJsPage/Model';
import  CameraSetup  from '../components/ThreeJsPage/CameraSetup';
import  ScreenShot  from '../components/ThreeJsPage/ScreenShot';
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';
import classes from './ThreeJsPage.module.css';

///////////////////////
import create from 'zustand'
import {  OrbitControls, TransformControls } from '@react-three/drei'
import { useControls } from 'leva'
import Liked from '../components/ThreeJsPage/Liked';
import Staged from '../components/ThreeJsPage/Staged';
import axios from '../utils/axios';
import AuthContext from '../context/AuthContext';
import RecomFurn from '../components/ThreeJsPage/RecomFurn';
import ItemUX from '../components/ThreeJsPage/ItemUX';
import ClipLoader from "react-spinners/ClipLoader";
import CustomScroll from 'react-custom-scroll'
import { button } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as THREE from 'three'
//////////////////////

const DevTools = () => {
  
  const { scene, renderer } = useThree();

  new CustomEvent('observe', { detail: renderer });
  new CustomEvent('observe', { detail: scene });

  return null;
};


const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

// ThreeJsPage 
export default function ThreeJsPage() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  // let [currentFloor, setCurrentFloor] = useState(0);
  let { BASE_URL } = useContext(AuthContext);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  let currentFloor= 0;
  let [showCorners, setShowCorners] = useState(false);
  let [orthoCamera, setOrthoCamera] = useState(false);
  let [initCamera, setinitCamera] = useState(0);
  let [downloadFlag, setDownloadFlag] = useState(false);
  let [objList, setObjList] = useState([])
  let [recomList, setRecomList] = useState([])
  let [isOpen, setIsOpen] = useState(true)

  const makeRoomClick = async () => {
    console.log('Clicked makeRoom button!');
  }

  const getRecomFurnitures = async () => {
    await axios({
      method: 'get',
      url: BASE_URL + 'furnitures/3d/furniture/',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    }).then (
      (response) => {
        setRecomList(Object.entries(response.data))
        console.log('recomList', recomList);
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  let totalcost = 0
  objList.forEach((obj) => {
    totalcost += obj.furniture_price
  })

  useEffect(() => {
    getRecomFurnitures();
    setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
  }, [])

  
  // 가구 obj 더해주기 
  const addobjListHandler = (objUrl) => {
    console.log(objUrl);
    if (objList.includes(objUrl)){
      console.log(' 중복');
    }else {
      setObjList(
         [...objList, objUrl]
      )
      console.log('위의 것을 넣습니다.');
      console.log(objList);
    }
  }

  // 가구 obj 제거하기 
  const removeobjListHandler = (objUrl) => {
    console.log('remove', objUrl);
    setObjList(
      objList.filter(obj => obj.id !== objUrl.id)
    )

  }

  let [X, setX] = useState(0);
  let [Y, setY] = useState(0);
  let [H, setH] = useState(0);
  const XXX = useRef();
  const YYY = useRef();
  const HHH = useRef();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const changeXHandler = () => {
    console.log(objList)
    if (XXX.current.value !== undefined) {
      setX(parseInt(XXX.current.value));
    }
  };
  const changeYHandler = () => {
    if (YYY.current.value !== undefined) {
      setY(parseInt(YYY.current.value));
    }
  };
  const changeHHandler = () => {
    if (HHH.current.value !== undefined) {
      setH(parseFloat(HHH.current.value));
    }
  };
  let roomMain = {
    id: 'roomMain',
    height: H,
    coords: [
      { x: 0, y: 0 },
      { x: X, y: 0 },
      { x: X, y: Y },
      { x: 0, y: Y },
    ],
  }

  let newItem = {
    floors: [
      {
        y: 0,
        doors: [],
        windows: [],
        rooms: [
          roomMain,
        ],
      },
    ],
  };
  let animatedFloorPosition = useFloorTransitionAnimation({
    floors: newItem.floors,
    currentFloor,
  });
  ////
  const exitHandler = () => {
    history.push('/')
  }


  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  /////

  //checkIntersect -> 충돌 확인, true일때 충돌난 경우

  // objBox에 setBox를 이용해서 box들을 json 형태로 저장한다.
  let [objBox, setBox] =useState({ });
  
  //isCollison : 충돌 발생 여부  | setIsCollison : isCollison 토글 시키는 함수

  
  let [preX, setpreX] = useState(0.0);
  let [preY, setpreY] = useState(0.0);
  let [preZ, setpreZ] = useState(0.0);
  let [preXYZ, setpreXYZ] = useState([]);


  
  function ObjectChangeHandler(props){
    const box = new THREE.Box3().setFromObject(props); // 현재 박스

    // setBox -> objBox 리스트. 가구 box들을 저장하는 리스트. 현재 위치를 업데이트 해 줌.
    setBox(prevState => ({
          ...prevState,
          [props.uuid]: box,
        }));
    let targetBox = objBox[props.uuid]
    // 벽 충돌
    // x 축 : -6 ~ 
    if (-5.92+(targetBox.max.x-targetBox.min.x)/2> props.position.x){
      target.position.x = preX
    }
    if (-5.92+X-(targetBox.max.x-targetBox.min.x)/2 < props.position.x){
      target.position.x = preX
    }
    
    if (-4.615 + (targetBox.max.z-targetBox.min.z)/2> props.position.z){
      target.position.z = preZ
    }
    if (-4.615+Y -(targetBox.max.z-targetBox.min.z)/2 < props.position.z){
      target.position.z = preZ
    }
    if (target.position.y < 0){
      target.position.y = preY
    }
    if (target.position.y + (targetBox.max.y - targetBox.min.y)/2 > H ){
      target.position.y = preY
    }
    

    // Check collision box -> 충돌 확인 // 오브젝트간 충돌
    for (const key in objBox) {
      console.log("key ============ ",key)
      if(props.uuid !==key){ // 자기 자신 아닌 경우
        if (box.intersectsBox(objBox[key])){ // 충돌이 발생한 경우
          console.log("충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌충돌")
          // target.position.x = preXYZ.x
          // target.position.y = preXYZ.y
          // target.position.z = preXYZ.z
          target.position.x = preX
          target.position.y = preY
          target.position.z = preZ
          // break // 충돌 했으니 for문 탈출
        }
        
      }
    }

    setpreX(target.position.x)
    setpreY(target.position.y)
    setpreZ(target.position.z)
    setpreXYZ([...preXYZ, target.position] )
    
  }
  return (
    <div className={classes.three_body} >
        {/* 가구 UX 창 */}
      
          <div className={classes.LeftItems} style = {{ overflowY : 'scroll' }}>
          <div style={{ padding : '30px' }}>
            <div style={{display : 'flex'}}>
            
            <DropdownButton
            as={ButtonGroup}
            key= 'Warning'
            id={`dropdown-variants-Warning`}
            variant={'Warning'.toLowerCase()}
            title='Room List'
            style={{ width : '45%'}}
          >
            <Dropdown.Item eventKey="1">Room #1</Dropdown.Item>
            <Dropdown.Item eventKey="2">Room #2</Dropdown.Item>
            <Dropdown.Item eventKey="3">Room #3</Dropdown.Item>          
          </DropdownButton>
          <button style={{ width: '45%', marginLeft: '40px'}}>Make room </button>
           
            </div>                      
            <br />
            <br />

            <button style={{ display : 'absolute'}}
             onClick={() => {setinitCamera(((initCamera+1)%3)); setDownloadFlag(false);}}
            >Reset View</button>
            <button style={{ display : 'absolute'}}
             onClick={() => {setDownloadFlag(!downloadFlag)}}
            >Capture and download</button>
            
            <button style={{ width: '100%'}}>Staged Furnitures</button>
            <Staged furnitures = {objList} removeObj ={removeobjListHandler}/>
            <br />
            <div style={{display : 'flex', justifyContent: 'center'}}>
              Total Cost : {totalcost} $
            </div>
            <br />


            {loading? 
            <b>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Setting for</h3>          
            </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Your furnitures</h3>
            </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <ClipLoader color={'#F3CD58'} loading={loading}  size={50} />
                
            </div>

            </b>
            :
            null            
            }
            
            <button onClick={()=>toggleMenu()} style={{ width: '100%', marginBottom: '1px' , display : loading? 'none' : null}}>Liked Furnitures</button>
            {loading? null : <div>
              {
                isOpen? <Liked addObj = {addobjListHandler}/> : null    

              }

            </div>
              } 
            {recomList.map(([key, value]) => (
              <div  key = {key} style ={{ display : loading? 'none' : null}}>
                <ItemUX furnkey = {key} furnvalue = {value} addobjHandler = {addobjListHandler}/>
                {/* <button style={{ width: '100%'}}>{key}</button>
                <RecomFurn addObj = {addobjListHandler} furnitures = {value}/> */}
              </div>             
            
            )

            )}
            <br />            
            <button onClick={exitHandler}>Exit</button>  
                         

          </div>
          </div>

      

        <div className={classes.RightItems} style = {{ backgroundColor : '#E3E8EC'}}>
        <Canvas   
        // onPointerMissed = 밖에 클릭시 target null로 만들기 
          key={`isometric-${orthoCamera}`}
          orthographic={orthoCamera}
          invalidateframeloop="false">
          {/* 가구 3D 모델 */}
          {objList.map((obj) => (
            <ModelT onPointerMissed={() => setTarget(null)} objUrl = {obj.glb_url}  setTarget = {setTarget} />
          ))
          }
          
          {/* <Ground/> */}
          <CameraSetup initCamera = {initCamera}/>          
          <ScreenShot  downloadFlag={downloadFlag}/>          
          <ambientLight intensity={0.5} color="#eef" />
          <pointLight position={[20, 10, -10]} decay={1} castShadow={true} />
          <pointLight position={[-20, 20, 5]} decay={1} castShadow={true} />

          <a.group position={animatedFloorPosition} style ={{zIndex : 1}}>
            <FloorPlan
              interactiveFloors={[currentFloor]}
              data={newItem}
              showCorners={showCorners}               
              />
          </a.group>

          {target && <TransformControls onChange={(e) => { ObjectChangeHandler(target); }} object={target} mode={mode} />}
          <OrbitControls makeDefault />
          <DevTools />
        </Canvas>
      <div>
        



        {/* 뷰 + 코너 확인 */}
        <div className={`${classes.controls} ${classes.perspectiveControls}`}>
          <div>
            <label htmlFor="showCorners">show corners</label>
            <input
              name="showCorners"
              type="checkbox"
              checked={showCorners}
              onChange={() => setShowCorners(!showCorners)}
            />
          </div>
        </div>


        {/* 방 수치 입력 */}
        <div className={classes.help} >
          <form>
            <label htmlFor="xx">X</label>
            <input id="xx" ref={XXX} onChange={changeXHandler} />
            <label htmlFor="yy">Y</label>
            <input id="yy" ref={YYY} onChange={changeYHandler} />
            <label htmlFor="hh">H</label>
            <input id="hh" ref={HHH} onChange={changeHHandler} />
          </form>
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
}
