// npx gltfjsx pot.glb
import React , { useEffect, useState } from 'react';
import { useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ModelT (props)  {
  const setTarget = props.setTarget
  // const setObj = props.setObj
  const gltf = useLoader(GLTFLoader, props.objUrl )
  
  const [hovered, setHovered] = useState(false)
  

  useCursor(hovered)  
    
  // return  (  <primitive  object={gltf.scene} {...props}  onClick={(e) => { props.addVector(e.object);e.stopPropagation(); setTarget(e.object);  clcikHandler(e.object);}} onPointerOver={(e) => {props.addVector(e.object); setHovered(true)}} onPointerOut={() => setHovered(false)}/>);
  return  (  <primitive  object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
}
