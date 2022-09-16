import { useState, useEffect, useContext } from 'react';
import SearchContext from '../../context/SearchContext';
function ItemsLayout() {
  const filterCtx = useContext(SearchContext);
  useEffect(() => {
    const items = filterCtx.furnitureList;
  }, []);

  return (
    <div>
      {filterCtx.furnitureList.map((item) => {
        return (
          <p key={item.id} onClick={() => {}}>
            {item.furniture_name}
          </p>
        );
      })}
    </div>
  );
}

export default ItemsLayout;
