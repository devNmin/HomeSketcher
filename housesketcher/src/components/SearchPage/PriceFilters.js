import { useState, useContext, useEffect, useRef } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function PriceFilters() {
  const SearchCtx = useContext(SearchContext);
  const mni = useRef();
  const mxi = useRef();
  const minPriceInput = mni.current;
  const maxPriceInput = mxi.current;
  const [minpInput, setMinpInput] = useState(null);
  const [maxpInput, setMaxpInput] = useState(null);

  const chageMinPriceInput = (event) => {
    if (minPriceInput !== undefined && minPriceInput.value !== 0) {
      setMinpInput(minPriceInput.value);
    } else {
      setMinpInput(null);
    }
  };
  const chageMaxPriceInput = (event) => {
    if (maxPriceInput !== undefined && maxPriceInput.value !== 0) {
      setMaxpInput(maxPriceInput.value);
    } else {
      setMaxpInput(null);
    }
  };
  useEffect(() => {
    SearchCtx.changePrice({ minp: minpInput, maxp: maxpInput });
  }, [minpInput, maxpInput, SearchCtx.minPrice, SearchCtx.maxPrice]);

  return (
    <div>
      <hr className={classes.categoryHr} />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Price</p>
        <form className={classes.row}>
          <div className={classes.row}>
            <label htmlFor="min">Min</label>
            <input type="number" id="min" ref={mni} onChange={chageMinPriceInput} />
          </div>
          <label>~</label>
          <div className={classes.row}>
            <label htmlFor="max">Max</label>
            <input
              type="number"
              id="max"
              placeholder="$"
              ref={mxi}
              onChange={chageMaxPriceInput}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PriceFilters;
