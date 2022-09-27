import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, TransformControls, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'

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
  return (
    <Canvas dpr={[1, 2]} onPointerMissed={() => setTarget(null)}>
      <Box position={[2, 2, 0]} />
      <Box />
      {target && <TransformControls object={target} mode={mode} />}
      <OrbitControls makeDefault />
    </Canvas>
  )
}
