import React, {useState, useMemo, useRef } from 'react';
import { Canvas, useThree  } from "react-three-fiber";
import { a, useSpring } from '@react-spring/three';
import FloorPlan from '../components/ThreeJsPage/FloorPlan';
import Ground from '../components/ThreeJsPage/Ground';

import  ModelT  from '../components/ThreeJsPage/Modelt';
import  CameraSetup  from '../components/ThreeJsPage/CameraSetup';
import { DISTANCE_BETWEEN_FLOORS } from '../components/ThreeJsPage/constants';
import classes from './ThreeJsPage.module.css';

///////////////////////
import create from 'zustand'
import {  OrbitControls, TransformControls } from '@react-three/drei'
import { useControls } from 'leva'
import Liked from '../components/ThreeJsPage/Liked';
import * as THREE from 'three';
//////////////////////


export default function Drawing2d() {
  

  return (
    <div>
      <Canvas>
        
      </Canvas>
    </div>
  )
};