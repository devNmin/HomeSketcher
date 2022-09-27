// npx gltfjsx pot.glb
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/pot.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.normalized_model.geometry}
        material={materials.solid_001_wire}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/pot.glb');
