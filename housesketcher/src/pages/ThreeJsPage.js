import React, { useState, useReducer, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
// import data from '../components/ThreeJsPage/floplan-data.json';

import CameraSetup from '../components/ThreeJsPage/CameraSetup';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';
import Ground from '../components/ThreeJsPage/Ground';
import FloorClip from '../components/ThreeJsPage/FloorClip';

import './ThreeJsPage.module.css';
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const DevTools = () => {
  const { scene, renderer } = useThree();

  new CustomEvent('observe', { detail: renderer });
  new CustomEvent('observe', { detail: scene });

  return null;
};

// export default function App() {

//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/abc">abc</Link>
//           </li>
//         </ul>

//         <hr />

//         <Routes>
//           <Route path="/abc" element={<Abc />} />

//         </Routes>
//       </div>
//     </Router>

//   );
// }

export default function App() {
  let [currentFloor, setCurrentFloor] = useState(0);
  let [showCorners, setShowCorners] = useState(false);
  let [orthoCamera, setOrthoCamera] = useState(false);
  let [doorStates, toggleDoorState] = useDoorStates();

  let [X, setX] = useState(0);
  let [Y, setY] = useState(0);
  let [H, setH] = useState(0);
  const XXX = useRef();
  const YYY = useRef();
  const HHH = useRef();

  const changeXHandler = () => {
    if (XXX.current.value !== undefined) {
      setX(XXX.current.value);
    } else {
      setX(5);
    }
  };
  const changeYHandler = () => {
    if (YYY.current.value !== undefined) {
      setY(YYY.current.value);
    } else {
      setY(5);
    }
  };
  const changeHHandler = () => {
    if (HHH.current.value !== undefined) {
      setH(HHH.current.value);
    } else {
      setH(1);
    }
  };
  let newItem = {
    floors: [
      {
        y: 0,
        doors: [],
        windows: [],
        rooms: [
          {
            id: 'ROOM2',
            height: H,
            coords: [
              { x: 0, y: 0 },
              { x: X, y: 0 },
              { x: X, y: Y },
              { x: 0, y: Y },
            ],
          },
        ],
      },
    ],
  };
  let animatedFloorPosition = useFloorTransitionAnimation({
    floors: newItem.floors,
    currentFloor,
  });

  return (
    <div className="App">
      <Canvas
        key={`isometric-${orthoCamera}`}
        orthographic={orthoCamera}
        invalidateframeloop="false"
      >
        <CameraSetup />

        <ambientLight intensity={0.5} color="#eef" />
        <pointLight position={[20, 10, -10]} decay={1} castShadow={true} />
        <pointLight position={[-20, 20, 5]} decay={1} castShadow={true} />

        <a.group position={animatedFloorPosition}>
          <FloorPlan
            interactiveFloors={[currentFloor]}
            data={newItem}
            showCorners={showCorners}
            doorStates={doorStates}
            onToggleDoorState={toggleDoorState}
          />
        </a.group>

        <FloorClip currentFloor={currentFloor} data={newItem} />

        <DevTools />
      </Canvas>

      <div className="controls perspectiveControls">
        <div>
          <label htmlFor="isometricView">Isometric View</label>
          <input
            name="isometricView"
            type="checkbox"
            checked={orthoCamera}
            onChange={() => setOrthoCamera(!orthoCamera)}
          />
        </div>
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

      <div className="help">
        <div>left-mouse button + drag to rotate</div>
        <form>
          <label htmlFor="xx">X</label>
          <input id="xx" ref={XXX} onChange={changeXHandler} />
          <label htmlFor="yy">Y</label>
          <input id="yy" ref={YYY} onChange={changeYHandler} />
          <label htmlFor="hh">H</label>
          <input id="hh" ref={HHH} onChange={changeHHandler} />
          <button>제출</button>
        </form>

        <div>right-mouse button + drag to translate</div>
        <div>mouse-wheel to zoom</div>
        {/* <div>click a wall/floor to select it</div> */}
        <div>toggle perspective/isometric and corners from controls at top-right</div>
      </div>

      <div className="controls floorControls">
        {Array.from({ length: newItem.floors.length }).map((_, i) => {
          let floorNumber = newItem.floors.length - (i + 1);
          return (
            <div key={`room-${floorNumber}`}>
              <label htmlFor={`room-${floorNumber}`}>{`room ${floorNumber}`}</label>
              <input
                type="radio"
                checked={floorNumber === currentFloor}
                onChange={() => setCurrentFloor(floorNumber)}
              />
            </div>
          );
        })}
      </div>

      <div className="controls doorControls">
        {newItem.floors[currentFloor].doors
          .filter(({ direction }) => direction !== 0)
          .map(({ id }) => (
            <div key={id}>
              <label htmlFor={`door-${id}`}>{id} door</label>
              <input
                name={`door-${id}`}
                type="checkbox"
                checked={doorStates[id] || false}
                onChange={() => toggleDoorState(id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
const useDoorStates = () => {
  let [doorStates, dispatch] = useReducer((state, action) => {
    let { id } = action;
    switch (action.type) {
      case 'toggle': {
        return {
          ...state,
          [id]: !state[id],
        };
      }
      default:
        throw new Error();
    }
  }, {});
  let toggleDoorState = (id) => dispatch({ type: 'toggle', id });
  return [doorStates, toggleDoorState];
};

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
