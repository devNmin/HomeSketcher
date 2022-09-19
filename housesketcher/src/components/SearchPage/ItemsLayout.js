import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import classes from './itemsLayout.module.css';

function ItemsLayout() {
  const filterCtx = useContext(SearchContext);

  const items = filterCtx.furnitureList;
  console.log(items);

  return (
    <div className={classes.display_flex}>
      {items.map((item) => {
        return (
          <div key={item.id} onClick={() => {}}>
            <img src={item.furniture_image} />
            <p>{item.furniture_name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ItemsLayout;
