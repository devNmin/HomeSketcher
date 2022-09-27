import * as THREE from "three";

export const WALL_MATERIAL = new THREE.meshLambertMaterial({
  color: "#a39b9b",
  castShadow: true,
  receiveShadow: true,
  roughness: 0.5
});
WALL_MATERIAL.color.convertSRGBToLinear();

export const DOOR_MATERIAL = new THREE.meshLambertMaterial({});

/**
 * <meshLambertMaterial
          ref={materialRef}
          roughness={0.5}
          args={[{ color: active ? "#a39b9b" : "#a39b9b" }]}
          castShadow={true}
          receiveShadow={true}
        />
 */
