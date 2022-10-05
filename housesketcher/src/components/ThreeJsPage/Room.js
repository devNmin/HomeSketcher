import React, { useMemo, useContext } from "react";
import { pointIsOnSegment } from "./geometry";
import ThreeJSContext from '../../context/ThreeJSContext';
import Flooring from "./Flooring";
import Wall from "./Wall";
import Corner from "./Corner";
const Room = ({
  id,
  coords,
  height,
  doors,
  windows,
  showCorners = true,
  isInteractive = true
}) => {
  const walls = useMemo(
    () =>
      coords.map((_, i) => {
        const a = coords[i];
        const b = coords[(i + 1) % coords.length];
        return {
          a,
          b,
          height,
          doors: doors.filter((door) => doorIsOnWall(door, [a, b])),
          windows: windows.filter((window) => windowIsOnWall(window, [a, b]))
        };
      }),
    [coords, height, doors, windows]
  );
  const ThreeJSCtx = useContext(ThreeJSContext);
  return (
    <group>
      {walls.map((wall) => (

        wall.a.x | wall.a.y | wall.b.x | wall.b.y ? <Wall
          key={`${id}-wall-[${wall.a.x},${wall.a.y}],[${wall.b.x},${wall.b.y}]`}
          {...wall}
          isInteractive={isInteractive}
          
          color={ThreeJSCtx.wallColor2[Number(id.substr(4, id.length-4))]}
          
        />:null
       
      ))}

      <Flooring coords={coords} isInteractive={isInteractive} />
      {showCorners &&
        coords.map(({ x, y: z }) => {
          let top = [x, height, z];
          let bottom = [x, 0, z];
          return [
            <Corner key={`top-corner-${x},${height},${z}`} coord={top} />,
            <Corner key={`bottom-corner-${x},0,${z}`} coord={bottom} />
          ];
        })}
    </group>
  );
};

const doorIsOnWall = ({ hinge }, wall) => pointIsOnSegment(hinge, wall);

const windowIsOnWall = ({ left }, wall) => pointIsOnSegment(left, wall);

export default Room;
