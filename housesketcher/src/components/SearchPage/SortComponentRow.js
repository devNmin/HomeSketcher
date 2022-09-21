import { useState, useContext, useEffect } from 'react';
import classes from './SortComponentRow.module.css';
import SearchContext from '../../context/SearchContext';
import { collapseClasses } from '@mui/material';

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
const SortName = { none: null, price: 'byPrice', like: 'byLike' };
const SortDetail = { none: null, ascending: 'high', descending: 'low' };

function SortComponentRow() {
  const searchCtx = useContext(SearchContext);
  const [sortName, setsortName] = useState(null);
  const [sortDetail, setSortDetail] = useState(null);
  useEffect(() => {
    if (sortName === 'none') {
      setSortDetail('none');
    }
    searchCtx.changeSort(SortName[sortName], SortDetail[sortDetail]);
  }, [sortName, sortDetail]);
  return (
    <div className={classes.row_width}>
      <div className={classes.flex_around}>
        <p className={classes.category_name}>
          {searchCtx.sub ? searchCtx.sub : searchCtx.main}
        </p>
        <div className={classes.display_flex}>
          <p>Sort</p>
          <div className={classes.display_flex}>
            <div className={classes.sort_name}>
              <p>{sortName ? sortName : 'none'}</p>
              <hr />
              <div>
                {Object.keys(SortName).map((name) => {
                  return (
                    <p
                      key={name}
                      onClick={() => {
                        setsortName(name);
                      }}
                    >
                      {name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={classes.sort_name}>
              <p>{sortDetail ? sortDetail : 'none'}</p>
              <hr />
              {sortName !== 'none' ? (
                <div>
                  {Object.keys(SortDetail).map((name) => {
                    return (
                      <p
                        key={name}
                        onClick={() => {
                          setSortDetail(name);
                        }}
                      >
                        {name}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortComponentRow;
