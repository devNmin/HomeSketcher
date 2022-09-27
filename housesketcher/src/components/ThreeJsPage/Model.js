// npx gltfjsx pot.glb
import React , { useState } from 'react';
import { useGLTF, useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import create from 'zustand'

// const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

export default  function Model (props)  {
  const gltf = useLoader(
    GLTFLoader,
    props.objUrl
  );
  return <primitive object={gltf.scene} scale={0.4} />;
}
