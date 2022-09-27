// npx gltfjsx pot.glb
import React , { useState } from 'react';
import { useGLTF, useCursor} from '@react-three/drei';

import create from 'zustand'

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))
export function Model(props) {
  const { nodes, materials } = useGLTF('/pot.glb');
  const setTarget = useStore((state) => state.setTarget)

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
      <mesh {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
      // <mesh {...props} onClick={(e) => cc(e)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        geometry={nodes.normalized_model.geometry}
        material={materials.solid_001_wire}
        rotation={[Math.PI / 2, 0, 0]}
      >
      </mesh>
  );
}

useGLTF.preload('/pot.glb');
