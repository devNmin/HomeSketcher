import classes from './SmallCategoryBox.module.css';

function SmallCategoryList() {
  return (
    <div>
      <hr />
      <div className={classes.category_line}>
        <p className={classes.category_name}>Category</p>
        <div></div>
      </div>
    </div>
  );
}

export default SmallCategoryList;
