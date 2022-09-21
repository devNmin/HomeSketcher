import { useContext } from 'react';
import BigCategoryNav from '../components/SearchPage/BigCategoryNav';
import SmallCategoryBox from '../components/SearchPage/SmallCategoryBox';
import ItemsLayout from '../components/SearchPage/ItemsLayout';
import Navbar from '../components/Navbar/Navbar';
import { FilterContextProvider } from '../context/SearchContext';
import SearchContext from '../context/SearchContext';

import classes from './SearchPage.module.css';

function SearchPage() {
  const searchCtx = useContext(SearchContext);
  if (searchCtx.isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
  return (
    <FilterContextProvider>
      <div className={classes.gradient}>
        <Navbar />
        <BigCategoryNav></BigCategoryNav>
        <SmallCategoryBox></SmallCategoryBox>
        <ItemsLayout></ItemsLayout>
      </div>
    </FilterContextProvider>
  );
}

export default SearchPage;
