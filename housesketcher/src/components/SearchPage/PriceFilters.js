import classes from './SmallCategoryBox.module.css';

function PriceFilters() {
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Price</p>
        <form className={classes.row}>
          <div className={classes.row}>
            <label htmlFor="min">Min</label>
            <input type="number" id="min" placeholder="$" />
          </div>
          <label>~</label>
          <div className={classes.row}>
            <label htmlFor="max">Max</label>
            <input type="number" id="max" placeholder="$" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PriceFilters;
