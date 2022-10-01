import React, { useEffect, useRef } from "react";
import { degreesToRadians } from "./geometry";

const Ground = () => (
  <mesh position={[0, -0.01, 0]} rotation={[degreesToRadians(-90), 0, 0]}>
    <planeBufferGeometry args={[10, 10]} />
    <GroundMaterial />
  </mesh>
);

const GroundMaterial = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);

  return (
    <meshLambertMaterial
      ref={ref}
      roughness={0.5}
      // args={[{ color: "#69b56c" }]}
      args={[{ color: "#bc8f8f" }]}
    />
  );
};

export default Ground;
