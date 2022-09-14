import { useContext } from 'react';

import CategoryFilters from './CategoryFilters';
import SizeFilters from './SizeFilters';
import PriceFilters from './PriceFilters';

import classes from './SmallCategoryBox.module.css';
import FilterContext from '../../store/search';

function SmallCategoryBox() {
  const filterCtx = useContext(FilterContext);

  return (
    <div className={classes.container}>
      <div className={classes.category_box}>
        <CategoryFilters />
        <div>Category</div>

        {filterCtx.isSelectedFilter('Size') && <SizeFilters />}
        {filterCtx.isSelectedFilter('Price') && <PriceFilters />}
        {filterCtx.isSelectedFilter('Style') && <div>Style</div>}
      </div>
    </div>
  );
}

export default SmallCategoryBox;
