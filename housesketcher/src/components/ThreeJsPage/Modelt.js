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
  const [hovered, setHovered] = useState(false)
  
  let scalevalue = [furniture.furniture_width * 2.54 / furniture.glb_width, furniture.furniture_height * 2.54 / (furniture.glb_height / 5), furniture.furniture_length * 2.54/ furniture.glb_length]
  useCursor(hovered)  
  // return  (  <primitive  object={gltf.scene} {...props}  onClick={(e) => { props.addVector(e.object);e.stopPropagation(); setTarget(e.object);  clcikHandler(e.object);}} onPointerOver={(e) => {props.addVector(e.object); setHovered(true)}} onPointerOut={() => setHovered(false)}/>);
  return  (  <primitive  scale = {scalevalue} object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  // return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
}
