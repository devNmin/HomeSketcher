import { createContext, useState } from 'react';

const ThreeJSContext = createContext({
  wallColor: '',
  changeWallColor: () => {},
});

export function ThreeJSContextProvider(props) {
  const [wallColor, setWallColor] = useState('#a39b9b');

  const wallColorHandler = (color) => {
    setWallColor(color);
  };

  const context = {
    wallColor: wallColor,
    changeWallColor: wallColorHandler,
  };

  return (
    <ThreeJSContext.Provider value={context}>{props.children}</ThreeJSContext.Provider>
  );
}

export default ThreeJSContext;
