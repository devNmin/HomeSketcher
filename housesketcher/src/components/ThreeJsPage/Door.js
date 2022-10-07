import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { distance, degreesToRadians, cartesianToPolar } from "./geometry";
import { a, useSpring } from "@react-spring/three";

const DOOR_THICKNESS = 0.05;
const OPEN_ANGLE = -95;
const TINY_AMOUNT = 5e-3;

const Door = ({
  id,
  hinge,
  latch,
  height,
  direction,
  material,
  isOpen,
  isInteractive,
  onToggleState
}) => {
  const shape = useMemo(() => {
    let width = distance(hinge, latch);
    const shape = new THREE.Shape();
    shape.moveTo(TINY_AMOUNT, TINY_AMOUNT);
    shape.lineTo(TINY_AMOUNT, height - TINY_AMOUNT);
    shape.lineTo(width - TINY_AMOUNT, height - TINY_AMOUNT);
    shape.lineTo(width - TINY_AMOUNT, TINY_AMOUNT);
    shape.lineTo(TINY_AMOUNT, TINY_AMOUNT);
    return shape;
  }, [height, hinge, latch]);

  const angle = useMemo(() => {
    return -degreesToRadians(cartesianToPolar(latch, hinge).angle);
  }, [latch, hinge]);

  const rotation = useDoorOpenAnimation({
    isOpen,
    closedAngle: angle,
    direction
  });

  return (
    <a.mesh
      position={[hinge.x, -1e-3, hinge.y]}
      rotation={rotation}
      onClick={(ev) => {
        if (isInteractive) {
          ev.stopPropagation();
          onToggleState(id);
        }
      }}
    >
    <mesh position={[0, 0, -DOOR_THICKNESS / 2]}>
      <extrudeBufferGeometry
        args={[
          shape,
          {
            bevelEnabled: false,
            depth: DOOR_THICKNESS,
            steps: 1
          }
        ]}
      />
      <DoorMaterial {...material} />
    </mesh>
    </a.mesh>
  );
};

const DoorMaterial = ({ color, opacity }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.color.convertSRGBToLinear();
  }, []);

  return opacity ? (
    <meshPhysicalMaterial
      ref={ref}
      args={[
        {
          color: color,
          metalness: 0,
          roughness: 0,
          alphaTest: 0.5,
          depthWrite: false,
          transmission: opacity,
          opacity: 1, // set material.opacity to 1 when material.transmission is non-zero
          transparent: true
        }
      ]}
    />
  ) : (
    <meshBasicMaterial
      ref={ref}
      roughness={0}
      args={[
        {
          color: color
        }
      ]}
    />
  );
};

const useDoorOpenAnimation = ({ isOpen, closedAngle, direction }) => {
  const { rotation } = useSpring({
    rotation: isOpen
      ? [0, closedAngle + degreesToRadians(OPEN_ANGLE) * direction, 0]
      : [0, closedAngle, 0],
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  });

  return rotation;
};

export default Door;
