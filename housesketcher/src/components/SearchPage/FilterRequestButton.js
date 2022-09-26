import { useContext, useEffect, useState } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function FilterRequestButton() {
  const searchCtx = useContext(SearchContext);
  useEffect(() => {
    searchCtx.getFurnitureList();
  }, []);
  return (
    <div>
      <div className={classes.category_line}>
        <p className={classes.category_name}></p>
        <button className={classes.request_button} onClick={searchCtx.getFurnitureList}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default FilterRequestButton;
