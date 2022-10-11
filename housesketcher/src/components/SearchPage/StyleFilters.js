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
  const [style, setStyle] = useState(null);

  useEffect(() => {
    searchCtx.changeStyle(style);
  }, [style]);

  return (
    <div>
      <hr className={classes.categoryHr} />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Style</p>
        <div className={classes.styleName_row}>
          {StyleList.map((styleName) => {
            return (
              <p
                key={styleName}
                onClick={() => {
                  setStyle(styleName);
                }}
                className={styleName === style ? classes.bold : null}
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
