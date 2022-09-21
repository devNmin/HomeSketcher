import { useContext, useEffect, useRef } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function PriceFilters() {
  const minPriceInput = useRef();
  const maxPriceInput = useRef();
  const SearchCtx = useContext(SearchContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const minpInput = minPriceInput;
  const maxpInput = maxPriceInput;

  const price = {
    minp: SearchCtx.minPrice,
    maxp: SearchCtx.maxPrice,
  };
  const chagePriceInput = (event) => {
    if (minpInput.current !== undefined && minpInput.current.value !== 0) {
      price.minp = minpInput.current.value;
    } else {
      price.minp = null;
    }
    if (maxpInput.current !== undefined && maxpInput.current.value !== 0) {
      price.maxp = maxpInput.current.value;
    } else {
      price.maxp = null;
    }
  };
  useEffect(() => {
    SearchCtx.changePrice(price);
  }, [price, SearchCtx.minPrice, SearchCtx.maxPrice]);
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Price</p>
        <form className={classes.row}>
          <div className={classes.row}>
            <label htmlFor="min">Min</label>
            <input
              type="number"
              id="min"
              ref={minPriceInput}
              onChange={chagePriceInput}
            />
          </div>
          <label>~</label>
          <div className={classes.row}>
            <label htmlFor="max">Max</label>
            <input
              type="number"
              id="max"
              placeholder="$"
              ref={maxPriceInput}
              onChange={chagePriceInput}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PriceFilters;
