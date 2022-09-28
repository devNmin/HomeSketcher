import { useEffect, useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import Pagnation from './Pagnation';
import classes from './itemsLayout.module.css';
import LikeFurniture from '../Like/LikeFurniture';

function ItemsLayout() {
  const searchCtx = useContext(SearchContext);
  const items = searchCtx.furnitureList;
  useEffect(() => {
    searchCtx.getFurnitureList();
  }, [searchCtx.sub, searchCtx.byLike, searchCtx.byPrice, searchCtx.page]);
  if (!items.length) {
    return (
      <div className={classes.display_flex}>
        <h2>No results were found for your search</h2>
      </div>
    );
  }
  return (
    <>
      <div className={classes.display_flex}>
        {items.map((item) => {
          return (
            <div  key={item.id} className={classes.item_container}>
              <LikeFurniture
                key={item.id}
                furniture={item}
                onClick={() => {}}
              ></LikeFurniture>
            </div>
          );
        })}
      </div>
      <Pagnation></Pagnation>
      <div className={classes.blank}></div>
    </>
  );
}

export default ItemsLayout;
