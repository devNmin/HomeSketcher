import MainChip from '../Common/MainChip';
import classes from './SmallCategoryBox.module.css';

function CategoryFilters() {
  return (
    <div className={classes.row}>
      <p className={classes.category_name}>Select Detail</p>
      <div className={classes.row_justify_between}>
        <div className={classes.row}>
          <MainChip name="Size" />
          <MainChip name="Price" />
          <MainChip name="Style" />
        </div>
        <div className={classes.row}>
          <MainChip name="Liked" />
        </div>
      </div>
    </div>
  );
}

export default CategoryFilters;
