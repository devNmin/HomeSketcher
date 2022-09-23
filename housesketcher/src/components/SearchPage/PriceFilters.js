import { useState, useContext, useEffect, useRef } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function PriceFilters() {
  const mni = useRef();
  const mxi = useRef();
  const SearchCtx = useContext(SearchContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const minPriceInput = mni.current;
  const maxPriceInput = mxi.current;
  const [minpInput, setMinpInput] = useState(0);
  const [maxpInput, setMaxpInput] = useState(0);

  const chageMinPriceInput = (event) => {
    console.log('event', event.target);
    console.log('here', minPriceInput);
    if (minPriceInput !== undefined && minPriceInput.value !== 0) {
      console.log('abc');
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
    console.log('minpInput', minpInput);
    console.log('maxpInput', maxpInput);
    SearchCtx.changePrice({ minp: minpInput, maxp: maxpInput });
  }, [minpInput, maxpInput]);
  return (
    <div>
      <hr />
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
