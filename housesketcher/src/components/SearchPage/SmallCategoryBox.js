import { useState } from 'react';

import MainChip from '../Common/MainChip';

import classes from './SmallCategoryBox.module.css';

function SmallCategoryBox() {
  const [isSelected, setIsSelected] = useState([]);
  function selectHandler(name) {
    setIsSelected.push(name);
    console.log(isSelected);
  }

  return (
    <div className={classes.container}>
      <div className={classes.category_box}>
        <div className={classes.row}>
          <p className={classes.category_name}>Select Detail</p>
          <div className={classes.row_justify_between}>
            <div className={classes.row}>
              <MainChip name="Size" onClick={selectHandler} />
              <MainChip name="Price" onClick={selectHandler} />
            </div>
            <div className={classes.row}>
              <MainChip name="Style" onClick={selectHandler} />
              <MainChip name="Liked" onClick={selectHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCategoryBox;
