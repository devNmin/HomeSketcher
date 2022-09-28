import { useState, useContext, useEffect, useRef } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function SizeFilters() {
  const SearchCtx = useContext(SearchContext);
  const wsi = useRef();
  const lsi = useRef();
  const hsi = useRef();
  const widthSizeInput = wsi.current;
  const lengthSizeInput = lsi.current;
  const heightSizeInput = hsi.current;
  const [widthInput, setWidthInput] = useState(null);
  const [lengthInput, setLengthInput] = useState(null);
  const [heightInput, setHeightInput] = useState(null);

  const changeWidthInput = (evnet) => {
    if (widthSizeInput !== undefined && widthSizeInput.value !== 0) {
      setWidthInput(widthSizeInput.value);
    } else {
      setWidthInput(null);
    }
  };
  const changeLengthInput = (event) => {
    if (lengthSizeInput !== undefined && lengthSizeInput.value !== 0) {
      setLengthInput(lengthSizeInput.value);
    } else {
      setLengthInput(null);
    }
  };

  const changeHeightInput = (event) => {
    if (heightSizeInput !== undefined && heightSizeInput.value !== 0) {
      setHeightInput(heightSizeInput.value);
    } else {
      setHeightInput(null);
    }
  };

  useEffect(() => {
    SearchCtx.changeSize({ width: widthInput, length: lengthInput, height: heightInput });
  }, [
    widthInput,
    lengthInput,
    heightInput,
    SearchCtx.width,
    SearchCtx.length,
    SearchCtx.height,
  ]);

  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Size</p>
        <form className={classes.row}>
          <div className={classes.row}>
            <label htmlFor="width">Width</label>
            <input
              type="number"
              id="width"
              placeholder="inch"
              ref={lsi}
              onChange={changeLengthInput}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor="depth">Depth</label>
            <input
              type="number"
              id="depth"
              placeholder="inch"
              ref={wsi}
              onChange={changeWidthInput}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              placeholder="inch"
              ref={hsi}
              onChange={changeHeightInput}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SizeFilters;
