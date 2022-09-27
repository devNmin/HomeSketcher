import React, { useState, useReducer, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
// import data from '../components/ThreeJsPage/floplan-data.json';
import CameraSetup from '../components/ThreeJsPage/CameraSetup';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';
import FloorClip from '../components/ThreeJsPage/FloorClip';

import { Model } from '../components/ThreeJsPage/Model';
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';
import classes from './ThreeJsPage.module.css';

const DevTools = () => {
  const { scene, renderer } = useThree();

  new CustomEvent('observe', { detail: renderer });
  new CustomEvent('observe', { detail: scene });

  return null;
};

export default function App() {
  let [currentFloor, setCurrentFloor] = useState(0);
  let [showCorners, setShowCorners] = useState(false);
  let [orthoCamera, setOrthoCamera] = useState(false);

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
    <div className={classes.three_body}>
      <div className={classes.canvas_css}>
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
            />
          </a.group>

          <FloorClip currentFloor={currentFloor} data={newItem} />
          <Model position={[0, 0, 0]} />

          <DevTools />
        </Canvas>
      </div>
      <div>
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
          <form>
            <label htmlFor="xx">X</label>
            <input id="xx" ref={XXX} onChange={changeXHandler} />
            <label htmlFor="yy">Y</label>
            <input id="yy" ref={YYY} onChange={changeYHandler} />
            <label htmlFor="hh">H</label>
            <input id="hh" ref={HHH} onChange={changeHHandler} />
          </form>
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
                <input name={`door-${id}`} type="checkbox" />
              </div>
            ))}
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
