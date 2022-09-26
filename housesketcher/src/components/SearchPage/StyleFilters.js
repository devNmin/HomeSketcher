import { useState, useEffect, useContext } from 'react';
import classes from './SmallCategoryBox.module.css';
import SearchContext from '../../context/SearchContext';

const StyleList = [
  'Modern',
  'Natural',
  'Minimal',
  'North European',
  'Vintage',
  'Antique',
  'Provence',
  'Mediterranean',
];

function StyleFilters() {
  const searchCtx = useContext(SearchContext);
  const [styleName, setStyleName] = useState(null);

  useEffect(() => {
    searchCtx.changeStyle(styleName);
  }, [styleName]);

  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Style</p>
        <div className={classes.styleName_row}>
          {StyleList.map((styleName) => {
            return (
              <p
                key={styleName}
                onClick={() => {
                  setStyleName(styleName);
                }}
              >
                {styleName}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StyleFilters;
