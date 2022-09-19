import MainChip from '../Common/MainChip';
import classes from './SmallCategoryBox.module.css';

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
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Style</p>
        <div className={classes.styleName_row}>
          {StyleList.map((styleName) => {
            return <p key={styleName}>{styleName}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default StyleFilters;
