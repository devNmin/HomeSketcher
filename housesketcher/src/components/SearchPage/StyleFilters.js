import classes from './SmallCategoryBox.module.css';

function StyleFilters() {
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Style</p>
        <div></div>
      </div>
    </div>
  );
}

export default StyleFilters;
