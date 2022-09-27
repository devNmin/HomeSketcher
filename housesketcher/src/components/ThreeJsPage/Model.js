// npx gltfjsx pot.glb
import React , { useState } from 'react';
import { useGLTF, useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import create from 'zustand'

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

export default  function Model (props)  {

  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  const gltf = useLoader(
    GLTFLoader,
    props.objUrl
  );
  useCursor(hovered)
  
  function testz(dd){
    console.log('-----------------')
    console.log(dd)
  }
  // return <primitive onClick={(e) => {setTarget(e.object)}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} object={gltf.scene} scale={1} />;
  return <primitive onClick={(e) => {setTarget(e.object); testz(e.object) }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} object={gltf.scene} scale={1} />;
}
