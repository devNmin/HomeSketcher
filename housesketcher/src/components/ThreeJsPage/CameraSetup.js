import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import CameraMouseControl from './CameraMouseControl';

const CameraSetup = () => {
  let { camera, gl } = useThree();

  useEffect(() => {
    gl.gammaFactor = 2.2;
    gl.outputEncoding = THREE.sRGBEncoding;

    camera.lookAt(7, 1.2, 5);

    if (camera.type === 'PerspectiveCamera') {
      camera.zoom = 1.5;
      camera.position.set(10, 15, 8);
    } else {
      camera.position.set(4, 5, -0.8);
      camera.far = 10000;
      camera.near = -1000;
      camera.zoom = 60;
    }
  }, []);

  return <CameraMouseControl />;
};

export default CameraSetup;
