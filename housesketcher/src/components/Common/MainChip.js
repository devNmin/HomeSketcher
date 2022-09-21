import { useContext, useEffect } from 'react';

import classes from './MainChip.module.css';
import SearchContext from '../../context/SearchContext';
function Chips(props) {
  const searchCtx = useContext(SearchContext);
  const filters = searchCtx.filters;
  const isSelectedFilter = searchCtx.isSelectedFilter(props.name);
  const filterSelectHandler = function () {
    if (isSelectedFilter) {
      searchCtx.removeFilter(props.name);
    } else {
      searchCtx.addFilter(props.name);
    }
  };
  useEffect(() => {
    if (filters.length > 1) {
      if (filters[filters.length - 1] === 'Liked') {
        searchCtx.getLikedFurnutyreList();
        for (let el of filters) {
          if (el !== 'Liked') {
            searchCtx.removeFilter(el);
          }
        }
      } else {
        for (let el of filters) {
          if (el === 'Liked') {
            searchCtx.removeFilter(el);
          }
        }
      }
    } else {
      if (filters[0] === 'Liked') {
        searchCtx.getLikedFurnutyreList();
      }
    }
  }, [filters]);

  return (
    <div
      className={isSelectedFilter ? classes.selectedChip : classes.chip}
      onClick={filterSelectHandler}
    >
      <p>{props.name}</p>
    </div>
  );
}
export default Chips;
