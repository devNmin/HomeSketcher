import React from "react";

const Corner = ({ coord }) => {
  return (
    <mesh position={coord}>
      <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
      <meshLambertMaterial
        roughness={0.5}
        color={"red"}
        opacity={0.75}
        transparent={true}
      />
    </mesh>
  );
};

export default Corner;
