import { useContext } from 'react';

import classes from './MainChip.module.css';
import SearchContext from '../../context/SearchContext';
function Chips(props) {
  const searchCtx = useContext(SearchContext);

  const isSelectedFilter = searchCtx.isSelectedFilter(props.name);
  const filterSelectHandler = function () {
    if (isSelectedFilter) {
      searchCtx.removeFilter(props.name);
    } else {
      searchCtx.addFilter(props.name);
    }
  };

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
