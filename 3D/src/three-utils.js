import * as THREE from "three";

export const setOpacity = (obj, opacity) => {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.opacity = opacity;
    }
  });
};
