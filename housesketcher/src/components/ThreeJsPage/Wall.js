import React, { useMemo, useState, useRef, useEffect, useContext } from 'react';
import {
  distance,
  degreesToRadians,
  arrangeClockwise,
  cartesianToPolar,
} from './geometry';
import * as THREE from 'three';
import ThreeJSContext from '../../context/ThreeJSContext';

const WALL_THICKNESS = 0.1;
const HALF_WALL_THICKNESS = WALL_THICKNESS / 2;

const Wall = ({ a, b, height, doors = [], windows = [], color }) => {
  const { position, rotation, corners, doorsRelative, windowsRelative } = useMemo(() => {
    const length = distance(a, b) + WALL_THICKNESS;
    const angleFromAtoB = cartesianToPolar(b, a).angle;
    // console.log("color", color)
    // if(color === ""){
    //   console.log('colorcolorcolor')
    //   color= '#ffffff'
    // }
    return {
      position: [a.x, 0, a.y],
      rotation: [0, degreesToRadians(-angleFromAtoB), 0],
      corners: [
        [0, 0],
        [0, height],
        [length, height],
        [length, 0],
      ],
      doorsRelative: doors.map(({ hinge, latch, height }) => {
        let hingePos = distance(a, hinge) + HALF_WALL_THICKNESS;
        let latchPos = distance(a, latch) + HALF_WALL_THICKNESS;
        return {
          corners: noNegativeValues(
            arrangeClockwise([
              { x: hingePos, y: 0.0 },
              { x: hingePos, y: height },
              { x: latchPos, y: height },
              { x: latchPos, y: 0.0 },
            ])
          ),
        };
      }),
      windowsRelative: windows.map(({ left, right, sill, lintel }) => {
        let leftPos = distance(a, left) + HALF_WALL_THICKNESS;
        let rightPos = distance(a, right) + HALF_WALL_THICKNESS;
        return {
          corners: noNegativeValues(
            arrangeClockwise([
              { x: leftPos, y: sill },
              { x: leftPos, y: lintel },
              { x: rightPos, y: lintel },
              { x: rightPos, y: sill },
            ])
          ),
        };
      }),
    };
  }, [a, b, height, doors, windows]);

  const shape = useMemo(() => {
    
    const shape = new THREE.Shape();
    shape.moveTo(corners[0][0], corners[0][1]);
    corners.slice(1).forEach((corner) => shape.lineTo(corner[0], corner[1]));
    shape.lineTo(corners[0][0], corners[0][1]);
    doorsRelative.concat(windowsRelative).forEach(({ corners }) => {
      const hole = new THREE.Path();
      hole.moveTo(corners[0].x, corners[0].y);
      corners.slice(1).forEach((corner) => hole.lineTo(corner.x, corner.y));
      shape.holes.push(hole);
    });
    return shape;
  }, [corners, doorsRelative, windowsRelative]);
  //three.module.js:49463 THREE.ExtrudeBufferGeometry has been renamed to THREE.ExtrudeGeometry.
  function WallMesh(){
    const length = 12, width = 8;
    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const material = new THREE.MeshBasicMaterial( { color: '0x00ff00' } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    
    return mesh
  }

  return (
    <mesh position={position} rotation={rotation}>
      <mesh position={[-HALF_WALL_THICKNESS, 0, -HALF_WALL_THICKNESS]}>
        <extrudeGeometry
          args={[
            shape,
            {
              bevelEnabled: false,
              depth: WALL_THICKNESS,
              steps: 1,
            },
          ]}
        />
        <WallMaterial color={color} />
      </mesh>
    </mesh>
  );
};

const WallMaterial = ({color}) => {
  const ref = useRef();
  const ThreeJSCtx = useContext(ThreeJSContext);

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);

  return (
    <meshLambertMaterial
      ref={ref}
      roughness={0.5}
      color={color}
      castShadow={true}
      receiveShadow={true}
    />
  );
};

const noNegativeValues = (coords) =>
  coords.map(({ x, y }) => ({ x: Math.max(0, x), y: Math.max(0, y) }));

export default Wall;
