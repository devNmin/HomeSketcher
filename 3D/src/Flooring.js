import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { degreesToRadians } from "./geometry";

const Flooring = ({ coords, isInteractive }) => {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(coords[0].x, coords[0].y);
    coords.slice(1).forEach((coord) => shape.lineTo(coord.x, coord.y));
    shape.lineTo(coords[0].x, coords[0].y);
    return shape;
  }, [coords]);

  return (
    <mesh
      position={[0, -1e-3, 0]}
      rotation={[degreesToRadians(90), 0, 0]}
      onClick={(ev) => {
        if (isInteractive) {
          ev.stopPropagation();
        }
      }}
    >
      <shapeBufferGeometry args={[shape]} />
      <FlooringMaterial />
    </mesh>
  );
};

const FlooringMaterial = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);

  return (
    <meshLambertMaterial
      ref={ref}
      roughness={0.5}
      color="#c9b19f" //"#c9a891"
      side={THREE.DoubleSide}
    />
  );
};

export default Flooring;
