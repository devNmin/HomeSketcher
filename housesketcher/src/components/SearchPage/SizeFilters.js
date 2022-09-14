import classes from './SmallCategoryBox.module.css';

function SizeFilters() {
  return (
    <div>
      <hr />
      <div className={classes.row}>
        <p className={classes.category_name}>Size</p>
        <form className={classes.row_justify_between}>
          <div className={classes.row}>
            <label for="width">Width</label>
            <input type="number" id="width" placeholder="inch" />
          </div>
          <div className={classes.row}>
            <label for="depth">Depth</label>
            <input type="number" id="depth" placeholder="inch" />
          </div>
          <div className={classes.row}>
            <label for="height">Height</label>
            <input type="number" id="height" placeholder="inch" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SizeFilters;
