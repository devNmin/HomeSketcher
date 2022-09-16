import { useContext } from 'react';

import classes from './MainChip.module.css';
import FilterContext from '../../context/SearchContext';
function Chips(props) {
  const filterCtx = useContext(FilterContext);

  const isSelectedFilter = filterCtx.isSelectedFilter(props.name);
  const filterSelectHandler = function () {
    if (isSelectedFilter) {
      filterCtx.removeFilter(props.name);
    } else {
      filterCtx.addFilter(props.name);
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
