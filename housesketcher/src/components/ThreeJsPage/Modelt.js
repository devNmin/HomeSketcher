// npx gltfjsx pot.glb
import React , { useEffect, useState ,useContext} from 'react';
import { useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeJSContext from '../../context/ThreeJSContext.js';

export default function ModelT (props)  {
  const setTarget = props.setTarget
  const ThreeJSCtx = useContext(ThreeJSContext);
  // let objList = ThreeJSCtx.objList;
  
  // let furniture = props.scale
  const gltf = useLoader(GLTFLoader, props.objUrl )
  // console.log("furniturefurniture",furniture)
  const [hovered, setHovered] = useState(false) // 진산아 들어왔니?
  
 

  useCursor(hovered)
  // return  (  <primitive  scale = {scalevalue} object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  // return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);

}
