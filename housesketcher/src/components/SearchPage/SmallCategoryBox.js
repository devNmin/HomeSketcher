import { useContext } from 'react';

import CategoryFilters from './CategoryFilters';
import SmallCategoryList from './SmallCategoryList';
import SizeFilters from './SizeFilters';
import PriceFilters from './PriceFilters';
import StyleFilters from './StyleFilters';
import FilterRequestButton from './FilterRequestButton';

import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

function SmallCategoryBox() {
  const searchCtx = useContext(SearchContext);

  return (
    <div className={classes.container}>
      <div className={classes.category_box}>
        <CategoryFilters />
        <SmallCategoryList />

        {searchCtx.isSelectedFilter('Size') && <SizeFilters />}
        {searchCtx.isSelectedFilter('Price') && <PriceFilters />}
        {searchCtx.isSelectedFilter('Style') && <StyleFilters />}
        {searchCtx.filters.length > 0 && !searchCtx.isSelectedFilter('Liked') && (
          <FilterRequestButton />
        )}
      </div>
    </div>
  );
}

export default SmallCategoryBox;
