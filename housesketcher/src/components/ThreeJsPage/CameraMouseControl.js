import React, { useRef, useEffect } from 'react';
import { useFrame,extend, useThree } from "react-three-fiber";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { OrbitControls } from '@react-three/drei';

extend({ OrbitControls });

const Controls = () => {
  const { camera, gl, invalidate } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  useEffect(() => void ref.current.addEventListener('change', invalidate), [invalidate]);
  return <orbitControls ref={ref} enableDamping args={[camera, gl.domElement]} />;
};

export default Controls;
