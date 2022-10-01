import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "react-three-fiber";


const CameraSetup = () => {
  let { camera, gl } = useThree();

  useEffect(() => {
    gl.gammaFactor = 2.2;
    gl.outputEncoding = THREE.sRGBEncoding;

    camera.lookAt(7, 1.2, 5);

    camera.zoom = 1.5;
    camera.position.set(10, 15, 8);

  }, []);


};

export default CameraSetup;
