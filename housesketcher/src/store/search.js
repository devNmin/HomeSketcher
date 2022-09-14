import { createContext, useState } from 'react';

const FilterContext = createContext({
  categotyFilters: [],
  addFilter: (categoryFilter) => {},
  removeFilter: (filterId) => {},
  isSelectedFilter: (filterId) => {},
});

export function FilterContextProvider(props) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  function addFilterHandler(categoryFilter) {
    setSelectedFilters((prevSelectedFilters) => {
      prevSelectedFilters.concat(categoryFilter);
    });
  }

  function removeFilterHandler(filterId) {
    setSelectedFilters((prevSelectedFilters) => {
      return prevSelectedFilters.filter(
        (categoryFilter) => categoryFilter.id !== filterId
      );
    });
  }

  function IsSelectedFilterHandler(filterId) {
    return selectedFilters.some((categoryFilter) => categoryFilter.id === filterId);
  }

  const context = {
    filters: selectedFilters,
    addFilter: addFilterHandler,
    removeFilter: removeFilterHandler,
    isSelectedFilter: IsSelectedFilterHandler,
  };

  return (
    <FilterContext.Provider value={context}>{props.children}</FilterContext.Provider>
  );
}

export default FilterContext;
