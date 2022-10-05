// npx gltfjsx pot.glb
import React , { useEffect, useState } from 'react';
import { useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ModelT (props)  {
  const setTarget = props.setTarget
  let furniture = props.scale
  const gltf = useLoader(GLTFLoader, props.objUrl )
  // console.log("furniturefurniture",furniture)
  const [hovered, setHovered] = useState(false) // 진산아 들어왔니?
  
  // 스케일 적용시 
  // 벽이 이상해짐 이유 찾아봐야할듯 
  // ikea 값이 이상한건 너무 이상하게 obj가 들어감 

  const scalevalue = [furniture.furniture_width * 2.54 / furniture.glb_width, furniture.furniture_height * 2.54 / (furniture.glb_height), furniture.furniture_length * 2.54/ furniture.glb_length]
  
  useCursor(hovered)  
  // return  (  <primitive  scale = {scalevalue} object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
}
