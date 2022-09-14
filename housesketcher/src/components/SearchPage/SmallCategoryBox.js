import { useContext } from 'react';

import CategoryFilters from './CategoryFilters';
import SmallCategoryList from './SmallCategoryList';
import SizeFilters from './SizeFilters';
import PriceFilters from './PriceFilters';
import StyleFilters from './StyleFilters';

import classes from './SmallCategoryBox.module.css';
import FilterContext from '../../store/search';

function SmallCategoryBox() {
  const filterCtx = useContext(FilterContext);

  return (
    <div className={classes.container}>
      <div className={classes.category_box}>
        <CategoryFilters />
        <SmallCategoryList />

        {filterCtx.isSelectedFilter('Size') && <SizeFilters />}
        {filterCtx.isSelectedFilter('Price') && <PriceFilters />}
        {filterCtx.isSelectedFilter('Style') && <StyleFilters />}
      </div>
    </div>
  );
}

export default SmallCategoryBox;
