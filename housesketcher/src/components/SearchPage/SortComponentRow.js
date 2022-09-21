import { useState, useContext } from 'react';
import classes from './SortComponentRow.module.css';
import SearchContext from '../../context/SearchContext';

/* 
byPrice	string
title: Byprice
minLength: 1
가격 높낮이순. 높은순 high, 낮은순 low, 없으면 null

byLike	string
title: Bylike
minLength: 1
좋아요 많고 작은 순. 높은순 high, 낮은순 low, 없으면 null
*/
const SortName = { Null: null, Price: 'byPrice', Like: 'byLike' };
const SortDetail = { Null: null, ascending: 'high', descending: 'low' };

function SortComponentRow() {
  const searchCtx = useContext(SearchContext);
  const [sortName, setsortName] = useState(null);
  const [sortDetail, setSortDetail] = useState(null);
  return (
    <div className={classes.display_flex}>
      <p>{searchCtx.main}</p>
      <div>
        <p>Sort</p>
        <div>
          <div>
            <div>
              <p>{sortName}</p>
              <hr />
            </div>
            <div>
              {Object.keys(SortName).map((name) => {
                return <p key={name}>{name}</p>;
              })}
            </div>
          </div>
          <div>
            <div>
              <p>{sortDetail}</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortComponentRow;
