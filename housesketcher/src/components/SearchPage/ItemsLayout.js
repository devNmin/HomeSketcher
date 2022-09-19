import { useState, useEffect, useContext } from 'react';
import SearchContext from '../../context/SearchContext';
function ItemsLayout() {
  const filterCtx = useContext(SearchContext);

  const items = filterCtx.furnitureList;

  return (
    <div>
      {items.map((item) => {
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
