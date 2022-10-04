import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { distance, degreesToRadians, cartesianToPolar } from "./geometry";

const GLASS_COLOR = "#66f";
const GLASS_OPACITY = 0.5;
const WINDOW_THICKNESS = 0.05;

const Window = ({ id, left, right, sill, lintel }) => {
  const shape = useMemo(() => {
    let width = distance(left, right);
    let height = Math.abs(sill - lintel);
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, height);
    shape.lineTo(width, height);
    shape.lineTo(width, 0);
    shape.lineTo(0, 0);
    return shape;
  }, [left, right, sill, lintel]);

  const angle = useMemo(() => {
    return -degreesToRadians(cartesianToPolar(left, right).angle);
  }, [left, right]);

  return (
    <mesh position={[right.x, sill, right.y]} rotation={[0, angle, 0]}>
      <mesh position={[0, 0, -WINDOW_THICKNESS / 2]}>
        {/* <extrudeBufferGeometry
          args={[
            shape,
            {
              bevelEnabled: false,
              depth: WINDOW_THICKNESS,
              steps: 1
            }
          ]}
        /> */}
        <GlassMaterial />
      </mesh>
    </mesh>
  );
};

const GlassMaterial = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);

  return (
    <meshPhysicalMaterial
      ref={ref}
      args={[
        {
          color: GLASS_COLOR,
          metalness: 0,
          roughness: 0,
          alphaTest: 0.5,
          depthWrite: false,
          transmission: GLASS_OPACITY, // use material.transmission for glass materials
          opacity: 1, // set material.opacity to 1 when material.transmission is non-zero
          transparent: true
        }
      ]}
    />
  );
};

export default Window;
