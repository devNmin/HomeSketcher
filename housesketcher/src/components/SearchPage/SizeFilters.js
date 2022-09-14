import classes from './SmallCategoryBox.module.css';

function SizeFilters() {
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Size</p>
        <form className={classes.row}>
          <div className={classes.row}>
            <label htmlFor="width">Width</label>
            <input type="number" id="width" placeholder="inch" />
          </div>
          <div className={classes.row}>
            <label htmlFor="depth">Depth</label>
            <input type="number" id="depth" placeholder="inch" />
          </div>
          <div className={classes.row}>
            <label htmlFor="height">Height</label>
            <input type="number" id="height" placeholder="inch" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SizeFilters;
