import { useState, useEffect, useContext } from 'react';

import classes from './BigCategoryNav.module.css';
import SearchContext from '../../context/SearchContext';

const BigCategoryList = [
  'Shelves',
  'Sofas',
  'Media',
  'Tables',
  'Beds',
  'Chairs',
  'Closets',
  'Lamps',
  'Kids',
];

function BigCategoryNav() {
  const [bigCategory, setBigCategory] = useState('Shelves');
  const filterCtx = useContext(SearchContext);

  useEffect(() => {
    const changeMainAndSub = async () => {
      
      await filterCtx.changeMain(bigCategory);
      await filterCtx.getSubCategoryList(bigCategory);
      await filterCtx.getFurnitureList();

      if (filterCtx.furnitureList.length > 0) {
        
      }
    };
    changeMainAndSub();
  }, [bigCategory, filterCtx.main]);

  return (
    <header className={classes.header}>
      <ul>
        {BigCategoryList.map((categoryName) => {
          return (
            <li
              key={categoryName}
              onClick={() => {
                setBigCategory(categoryName);
              }}
              className={
                categoryName === bigCategory ? classes.selected : classes.unselected
              }
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </header>
  );
}
export default BigCategoryNav;
