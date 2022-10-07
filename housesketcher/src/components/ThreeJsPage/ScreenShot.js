import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "react-three-fiber";


const ScreenShot = (props) => {
  
  let { gl, scene, camera } = useThree()

  useEffect(() => {
    // gl.gammaFactor = 2.2;
    gl.outputEncoding = THREE.sRGBEncoding;

    // camera.lookAt(7, 1.2, 5);

    if (props.downloadFlag ){
      
      gl.render(scene, camera)
      let screenshot = gl.domElement.toDataURL()
      // a tag 만들어서 href를 base64 주소로 만들어서 그걸 다운로드 
      var link = document.createElement('a');

      link.setAttribute('href', screenshot);
      link.setAttribute('target', '_blank');
      link.setAttribute('download', 'CaptureImage');

      link.click();
    }

  }, [camera, gl, props.initCamera, props.downloadFlag, scene]);


};

export default ScreenShot;
