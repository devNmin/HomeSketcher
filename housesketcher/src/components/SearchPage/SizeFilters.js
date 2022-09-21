import { useContext, useEffect, useRef } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function SizeFilters() {
  const widthInput = useRef();
  const lengthInput = useRef();
  const heightInput = useRef();
  const SearchCtx = useContext(SearchContext);

  const maxSize = {
    width: SearchCtx.width,
    length: SearchCtx.length,
    height: SearchCtx.height,
  };

  const changeSizeInput = (event) => {
    if (widthInput.current !== undefined && widthInput.current.value !== 0) {
      maxSize.width = widthInput.current.value;
    } else {
      maxSize.width = null;
    }
    if (lengthInput.current !== undefined && lengthInput.current.value !== 0) {
      maxSize.length = lengthInput.current.value;
    } else {
      maxSize.length = null;
    }
    if (heightInput.current !== undefined && heightInput.current.value !== 0) {
      maxSize.height = heightInput.current.value;
    } else {
      maxSize.height = null;
    }
    SearchCtx.changeSize(maxSize);
  };
  useEffect(() => {
    SearchCtx.changeSize(maxSize);
  }, [maxSize, SearchCtx.width, SearchCtx.length, SearchCtx.height]);

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
              ref={widthInput}
              onChange={changeSizeInput}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor="depth">Depth</label>
            <input
              type="number"
              id="depth"
              placeholder="inch"
              ref={lengthInput}
              onChange={changeSizeInput}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              placeholder="inch"
              ref={heightInput}
              onChange={changeSizeInput}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SizeFilters;
