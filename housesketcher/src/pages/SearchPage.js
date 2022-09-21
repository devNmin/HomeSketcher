import { useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BigCategoryNav from '../components/SearchPage/BigCategoryNav';
import SmallCategoryBox from '../components/SearchPage/SmallCategoryBox';
import ItemsLayout from '../components/SearchPage/ItemsLayout';
import SortComponentRow from '../components/SearchPage/SortComponentRow';
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
        <SortComponentRow></SortComponentRow>
        <ItemsLayout></ItemsLayout>
      </div>
    </FilterContextProvider>
  );
}

export default SearchPage;
