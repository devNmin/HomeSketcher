import { useMemo } from "react";
import * as THREE from "three";
import { useThree } from "react-three-fiber";
import { DISTANCE_BETWEEN_FLOORS } from "./constants";

/**
 * attempting to use clip-planes to isolate which floor to show, and
 * by animating the floorplan up and down have it appear between the two
 * clipping planes ... works but doesn't look all that great, but worse is
 * that events seem to not penetrate the clipping planes (or are getting
 * trapped by a clipped object)
 */
const FloorClip = ({ data: { floors }, currentFloor }) => {
  let { gl } = useThree();

  // let height = useMemo(() => {
  //   let rooms = floors[currentFloor].rooms;
  //   return rooms.reduce((height, room) => Math.max(height, room.height), 0);
  // }, [floors, currentFloor]);

  let top = new THREE.Plane(
    new THREE.Vector3(0, -1, 0),
    DISTANCE_BETWEEN_FLOORS / 2
  );
  let bottom = new THREE.Plane(
    new THREE.Vector3(0, 1, 0),
    DISTANCE_BETWEEN_FLOORS / 2
  );

  gl.clippingPlanes = [top, bottom];

  return null;
};

export default FloorClip;
