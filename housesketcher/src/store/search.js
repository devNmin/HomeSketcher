import { createContext, useState } from 'react';

/* 
page*	integer
title: Page
페이지 번호 0부터 줘야함

main*	string
title: Main
minLength: 1
가구 대분류

sub*	string
title: Sub
minLength: 1
가구 소분류

minPrice	number
title: Minprice
가구 최소 가격. 없으면 null

maxPrice	number
title: Maxprice
가구 최대 가격. 없으면 null

width	number
title: Width
가구 가로 길이

length	number
title: Length
가구 세로 길이

height	number
title: Height
가구 높이

*/

const FilterContext = createContext({
  categotyFilters: [],
  addFilter: (filterName) => {},
  removeFilter: (filterName) => {},
  isSelectedFilter: (filterName) => {},
  changePage: (pageNum) => {},
  changeBigCategory: (categoryName) => {},
});

export function FilterContextProvider(props) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [page, setPage] = useState([0]);
  const [main, setMain] = useState('Sofas & sectionals'); // 대분류
  const [sub, setSub] = useState('');

  const setPageHandler = (pageNum) => {
    setPage(pageNum);
  };

  const addFilterHandler = (filterName) => {
    setSelectedFilters((prevList) => [...prevList, filterName]);
  };

  function removeFilterHandler(filterName) {
    setSelectedFilters((prevSelectedFilters) => {
      return prevSelectedFilters.filter(
        (categoryFilter) => categoryFilter !== filterName
      );
    });
  }

  function IsSelectedFilterHandler(filterName) {
    return selectedFilters.some(
      (categoryFilter) => categoryFilter === filterName
    );
  }

  const context = {
    filters: selectedFilters,
    addFilter: addFilterHandler,
    removeFilter: removeFilterHandler,
    isSelectedFilter: IsSelectedFilterHandler,
    changePage: setPageHandler,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
