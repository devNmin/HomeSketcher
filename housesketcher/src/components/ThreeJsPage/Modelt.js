// npx gltfjsx pot.glb
import React , { useEffect, useState ,useContext} from 'react';
import { useCursor} from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeJSContext from '../../context/ThreeJSContext.js';

export default function ModelT (props)  {
  const setTarget = props.setTarget
  const ThreeJSCtx = useContext(ThreeJSContext);
  let objList = ThreeJSCtx.objList;

  // let furniture = props.scale
  const gltf = useLoader(GLTFLoader, props.objUrl )
  // console.log("furniturefurniture",furniture)
  const [hovered, setHovered] = useState(false) // 진산아 들어왔니?
  
  // const rotationValue = 
  // if(props.scale.x === undefined){
  // const scalevaluse = [objList[0].scale.x, objList[0].scale.y, objList[0].scale.z]
  // }

  // 스케일 적용시 
  // 벽이 이상해짐 이유 찾아봐야할듯 
  // ikea 값이 이상한건 너무 이상하게 obj가 들어감 
  
  // const scalevalue = [furniture.furniture_width * 2.54 / furniture.glb_width, furniture.furniture_height * 2.54 / (furniture.glb_height), furniture.furniture_length * 2.54/ furniture.glb_length]
  // console.log("rrrrrrrrrrrrrr", props.scale.x)
  
  
  // console.log("scalevaluse", scalevaluse)
  // let scaleValues = [1,1,1]
  // let rotationValues = [0,0,0]
  // if(props.scale !== undefined){
  //   scaleValues = [props.scale.x, props.scale.y, props.scale.z]
  // }
  // if(props.rotation !== undefined){
  //   rotationValues = [props.rotation['_x'], props.rotation['_y'],props.rotation['_z']]
  // }
  
  // console.log(rotationValues)
  
  
  useCursor(hovered)
  // return  (  <primitive  scale = {scalevalue} object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);
  // return  (  <primitive   object={gltf.scene} position={props.position} onClick={(e) => {e.stopPropagation(); setTarget(e.object);}} onPointerOver={(e) => setHovered(true)} onPointerOut={() => setHovered(false)}/>);

}
