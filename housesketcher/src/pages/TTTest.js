import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { useGLTF } from '@react-three/drei';
const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const { nodes, materials } = useGLTF('/pot.glb');
  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  return (
    <mesh {...props} onClick={(e) => setTarget(e.object)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    geometry={nodes.normalized_model.geometry}
    material={materials.solid_001_wire}
    rotation={[Math.PI / 2, 0, 0]}
    >
    </mesh>
  )
}

function TTTest() {

  const { target, setTarget } = useStore()
  const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  return (
    <div>
      <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)}>
        
        <Box position={[2, 2, 0]} />

        <Box position={[0, 0, 0]} />
        {target && <TransformControls object={target} mode={mode} />}
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

export default TTTest