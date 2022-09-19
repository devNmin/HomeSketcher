import { useState, useEffect, useContext } from 'react';

import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function SmallCategoryList() {
  const searchCtx = useContext(SearchContext);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    searchCtx.changeSub(subCategory);
    searchCtx.getFurnitureList();
  }, [subCategory]);

  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Category</p>
        <div className={classes.item}>
          {searchCtx.subCategoryList.map((categoryName) => {
            return (
              <p
                key={categoryName}
                onClick={() => {
                  setSubCategory(categoryName);
                }}
              >
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
