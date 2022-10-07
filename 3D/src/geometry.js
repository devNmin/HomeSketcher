export const LARGE_DISTANCE = 1e9;
export const MARGIN_OF_ERROR = 1e-6;
export const REFERENCE_DIRECTION = 0;

export const degreesToRadians = (degrees) => (degrees * Math.PI) / 180.0;

export const radiansToDegrees = (radians) => radians * (180.0 / Math.PI);

export const vector = (from, to) => ({ x: from.x - to.x, y: from.y - to.y });

export const magnitude = (vector) =>
  Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

export const distance = (from, to) => magnitude(vector(from, to));

export const polarToCartesian = ({ angle, range }, orig = { x: 0, y: 0 }) => {
  let angleInRadians = degreesToRadians(REFERENCE_DIRECTION + angle);
  let cartesian = {
    x: range * Math.cos(angleInRadians),
    y: range * Math.sin(angleInRadians)
  };
  return { x: orig.x + cartesian.x, y: orig.y + cartesian.y };
};

export const cartesianToPolar = (point, orig = { x: 0, y: 0 }) => {
  let v = vector(point, orig);
  let range = magnitude(v);
  let angle = radiansToDegrees(Math.atan2(v.y, v.x));
  return { range, angle: angle - REFERENCE_DIRECTION };
};

export const pointIsOnSegment = ({ x, y }, [a, b]) =>
  x - MARGIN_OF_ERROR <= Math.max(a.x, b.x) &&
  x + MARGIN_OF_ERROR >= Math.min(a.x, b.x) &&
  y - MARGIN_OF_ERROR <= Math.max(a.y, b.y) &&
  y + MARGIN_OF_ERROR >= Math.min(a.y, b.y);

export const lineIntersectsLine = ([a, b], [c, d]) => {
  let a1 = b.y - a.y;
  let b1 = a.x - b.x;
  let c1 = a1 * a.x + b1 * a.y;

  let a2 = d.y - c.y;
  let b2 = c.x - d.x;
  let c2 = a2 * c.x + b2 * c.y;

  let determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    // parallel lines, never intersect
    return false;
  } else {
    let x = (b2 * c1 - b1 * c2) / determinant;
    let y = (a1 * c2 - a2 * c1) / determinant;

    return { x, y };
  }
};

const segmentIntersectsSegment = (l1, l2) => {
  let pointOfIntersection = lineIntersectsLine(l1, l2);
  if (
    pointOfIntersection &&
    pointIsOnSegment(pointOfIntersection, l1) &&
    pointIsOnSegment(pointOfIntersection, l2)
  ) {
    return pointOfIntersection;
  } else {
    return false;
  }
};

export const isClockwise = (a, b) => {
  return b > a || a - b > 180;
};

export const nearestIntersection = (from, angle, walls, coords) => {
  let to = polarToCartesian({ range: LARGE_DISTANCE, angle }, from);
  let intersections = walls
    .map(([a, b]) =>
      segmentIntersectsSegment([from, to], [coords[a], coords[b]])
    )
    .filter((intersection) => !!intersection)
    .map((intersection) => ({
      intersection,
      distance: distance(intersection, from)
    }))
    .sort((a, b) => a.distance - b.distance);

  return intersections?.[0]?.intersection;
};

export const calcCentroid = (points) => {
  let sum = points.reduce(
    ({ x, y }, p) => ({
      x: x + p.x,
      y: y + p.y
    }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / points.length, y: sum.y / points.length };
};

export const arrangeClockwise = (arrayOfPoints, origin) => {
  let o = origin || calcCentroid(arrayOfPoints);
  let polar = arrayOfPoints.map((p) => cartesianToPolar(p, o));
  let clockwise = polar.sort((a, b) => a.angle - b.angle);
  return clockwise.map((p) => polarToCartesian(p, o));
};

export const getVisibilityPolygon = (from, cartesianCoords) => {
  // wall corners as indexes into the cartesian coords array
  let walls = cartesianCoords.map((_, i) => [
    i,
    (i + 1) % cartesianCoords.length
  ]);

  // get all points in polar coords, giving us angles from camera
  let polar = cartesianCoords.map((c) => cartesianToPolar(c, from));

  // reduce to the set of unique angles that we need to test
  const unique = Array.from(
    polar.reduce((r, { angle }) => r.add(angle), new Set())
  );

  // sort into clockwise order
  const clockwise = unique.sort((a, b) => a - b);

  // produce angles slightly CCW and CW of each angle in the list
  const checkPoints = clockwise
    .map((angle) => [angle - 0.01, angle, angle + 0.01])
    .flat();

  // for each angle, find the nearest intersection with a wall
  return checkPoints.map((angle) => {
    return nearestIntersection(from, angle, walls, cartesianCoords);
  });
};
