// npx gltfjsx pot.glb
import React , { useState } from 'react';
import { useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



export default function Model (props)  {
  const useStore = props.testStore
  const gltf = useLoader(
    GLTFLoader,
    props.objUrl
  );

  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)

  function clcikHandler(data){
    console.log('------------')
    console.log('data',data)
    setTarget(data)
    console.log('------------')
    console.log('setTargetsetTargetsetTarget',data)
    console.log('------------')
    // console.log('target',target)
  }

  useCursor(hovered)  
  
  // return <primitive onClick={(e) => {setTarget(e.object)}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} object={gltf.scene} scale={1} />;
  return  (
  <primitive  object={gltf.scene} {...props}  onClick={(e) => {setTarget(e.object); clcikHandler(e.object)}} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}/>
  );
}
