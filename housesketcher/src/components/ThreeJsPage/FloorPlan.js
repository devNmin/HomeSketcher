import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Room from './Room';
import Door from './Door';
import Window from './Window';
import Ground from './Ground';
import { setOpacity } from './three-utils';
import { DISTANCE_BETWEEN_FLOORS } from './constants';

const FloorPlan = ({
  data,
  showCorners,
  doorStates = {},
  interactiveFloors = [],
  onToggleDoorState,
}) => (
  <group position={[-6, 0, -4.5]}>
    {data.floors.map((floor, index) => {
      let isInteractive = interactiveFloors.includes(index);
      return (
        <Floor
          key={index}
          isInteractive={isInteractive}
          floor={floor}
          level={DISTANCE_BETWEEN_FLOORS * index}
          showCorners={showCorners}
          doorStates={doorStates}
          onToggleDoorState={onToggleDoorState}
        />
      );
    })}
  </group>
);

const Floor = ({
  floor,
  level,
  showCorners,
  isInteractive,
  doorStates,
  onToggleDoorState,
}) => {
  let ref = useRef();
  // useEffect(() => {
  //   var obj = { opacity: isInteractive ? 0 : 1 };
  //   gsap.to(obj, {
  //     duration: 1,
  //     opacity: isInteractive ? 1 : 0,
  //     onUpdate: function () {
  //       setOpacity(ref.current, obj.opacity);
  //     }
  //   });
  // }, [isInteractive]);

  return (
    <group ref={ref} position={[0, level, 0]}>
      {floor.rooms.map((r) => (
        <Room
          key={r.id}
          {...r}
          doors={floor.doors}
          windows={floor.windows}
          showCorners={showCorners}
          isInteractive={isInteractive}
        />
      ))}
      {floor.doors.map((d) => (
        <Door
          key={d.id}
          {...d}
          isOpen={doorStates[d.id]}
          onToggleState={onToggleDoorState}
          isInteractive={isInteractive}
        />
      ))}
      {floor.windows.map((w) => (
        <Window key={w.id} {...w} isInteractive={isInteractive} />
      ))}
    </group>
  );
};

export default FloorPlan;
