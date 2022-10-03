import React, { useMemo, useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { degreesToRadians } from "./geometry";
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import woodTexture from '../../assets/wood_floor2.jpg';
import ThreeJSContext from '../../context/ThreeJSContext';

const Flooring = ({ coords, isInteractive }) => {
  const ThreeJSCtx = useContext(ThreeJSContext);
  const height = Math.abs(coords[2]['y'] - coords[0]['y']);
  const length = Math.abs(coords[1]['x'] - coords[0]['x']);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(coords[0].x, coords[0].y);
    coords.slice(1).forEach((coord) => shape.lineTo(coord.x, coord.y));
    shape.lineTo(coords[0].x, coords[0].y);
    return shape;
  }, [coords]);

  return (
    <mesh
      position={[(coords[0].x + coords[2].x) / 2, -1e-3, (coords[0].y + coords[2].y) / 2]}
      rotation={[degreesToRadians(90), 0, 0]}      
    >
      <shapeBufferGeometry args={[shape]} />
      <FlooringMaterial />
      <planeGeometry args={[length, height]} />
    </mesh>
  );
};

const FlooringMaterial = () => {
  const ThreeJSCtx = useContext(ThreeJSContext);
  const ref = useRef();
  let colorMap = useLoader(TextureLoader, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpryRpUYx_aMC-7sPV9V-1cDf2q5vc-QbWvWqpmdPLWIoJjkq9-qzNNm-d2RWRTktiD08&usqp=CAU');

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);
    return (
      <meshLambertMaterial
        ref={ref}
        roughness={0.5}
        color={ThreeJSCtx.floorColor}
        side={THREE.DoubleSide}
        map={ThreeJSCtx.floorTexture? colorMap :null}
      />
    );
};

export default Flooring;
