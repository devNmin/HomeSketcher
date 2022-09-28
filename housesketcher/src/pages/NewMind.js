import { useState, useRef,useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three';
import { useGLTF, OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';
import FloorClip from '../components/ThreeJsPage/FloorClip';

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const { nodes, materials } = useGLTF('/pot.glb');
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh {...props} 
      geometry={nodes.normalized_model.geometry}
      material={materials.solid_001_wire}
      onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        
      {/* <boxGeometry />
      <meshNormalMaterial /> */}
    </mesh>
  )
}

export default function App() {
  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  
  let currentFloor= 0;
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
          {
            "id": "ROOM3",
            "height": H,
            "coords": [
              { "x": 0, "y": 0 },
              { "x": X/3, "y": 0 },
              { "x": X/3, "y": Y/5 },
              { "x": 0, "y": Y/5 }
            ]
          }
        ],
      },
    ],
  };
  let animatedFloorPosition = useFloorTransitionAnimation({
    floors: newItem.floors,
    currentFloor,
  });

  return (
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)}>
      <Box position={[2, 2, 0]} />
      <Box />
      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
      <a.group position={animatedFloorPosition}>
            <FloorPlan
              interactiveFloors={[currentFloor]}
              data={newItem}
              showCorners={showCorners}
              />
          </a.group>

          <FloorClip currentFloor={currentFloor} data={newItem} />
    </Canvas>
  )
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