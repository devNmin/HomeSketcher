import { useState, useEffect, useContext } from 'react';

import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function SmallCategoryList() {
  const filterCtx = useContext(SearchContext);
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Category</p>
        <div>
          {filterCtx.subCategoryList.map((categoryName) => {
            return (
              <p key={categoryName} onClick={() => {}}>
                {categoryName}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SmallCategoryList;
