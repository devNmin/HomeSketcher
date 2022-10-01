import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "react-three-fiber";


const CameraSetup = (props) => {
  
  let { gl, scene, camera } = useThree()

  useEffect(() => {
    gl.gammaFactor = 2.2;
    gl.outputEncoding = THREE.sRGBEncoding;

    // camera.lookAt(7, 1.2, 5);

    camera.zoom = 1.5;
    let x =0, y=0, z=0
    if(props.initCamera === 0){
      console.log("0 번 카메라")
      x =0
      y=20
      z=0
    }
    else if(props.initCamera === 1){
      console.log("1 번 카메라")
      x= 10
      y= 15
      z= 8
    }
    else if(props.initCamera === 2){
      console.log("2 번 카메라")
      x= -10
      y= 15
      z= 8
      
    }
    console.log("point", x + " " + y + " " + z )
    camera.position.set(x,y,z);
    if (props.downloadFlag ){
      
      gl.render(scene, camera)
      camera.position.set(-10,15,8);

      let screenshot = gl.domElement.toDataURL()
      console.log(screenshot)
      var link = document.createElement('a');

      link.setAttribute('href', screenshot);
      link.setAttribute('target', '_blank');
      link.setAttribute('download', 'test');

      link.click();
      // props.downloadFlag =false
    }
    

  }, [camera, gl, props.initCamera, props.downloadFlag, scene]);


};

export default CameraSetup;
