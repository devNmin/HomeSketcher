import { useState, useContext, useEffect } from 'react';
import classes from './SortComponentRow.module.css';
import SearchContext from '../../context/SearchContext';

const SortNames = { none: null, price: 'byPrice', like: 'byLike' };
const SortDetails = { none: null, descending: 'high', ascending: 'low' };
function SortComponentRow() {
  const searchCtx = useContext(SearchContext);
  const [sortName, setsortName] = useState('none');
  const [sortDetail, setSortDetail] = useState('none');
  useEffect(() => {
    if (sortName === 'none') {
      setSortDetail('none');
    }
    if (sortName === 'price') {
      searchCtx.changeSort('byLike', null);
      searchCtx.changeSort('byPrice', SortDetails[sortDetail]);
    } else {
      searchCtx.changeSort('byPrice', null);
      searchCtx.changeSort('byLike', SortDetails[sortDetail]);
    }
    searchCtx.getFurnitureList();
  }, [sortName, sortDetail, searchCtx.byLike, searchCtx.byPrice]);
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
                {Object.keys(SortNames).map((name) => {
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
                  {Object.keys(SortDetails).map((name) => {
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
