import { useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import BigCategoryNav from '../components/SearchPage/BigCategoryNav';
import SmallCategoryBox from '../components/SearchPage/SmallCategoryBox';
import ItemsLayout from '../components/SearchPage/ItemsLayout';
import SortComponentRow from '../components/SearchPage/SortComponentRow';
import { FilterContextProvider } from '../context/SearchContext';
import SearchContext from '../context/SearchContext';
import Footer from '../components/Footer/Footer';
import { useTheme } from '../context/themeProvider'
import ThemeToggle from '../theme/ThemeToggle'

import classes from './SearchPage.module.css';

function SearchPage() {
  const searchCtx = useContext(SearchContext);
  const [ThemeMode, toggleTheme] = useTheme();
  var style = ['padding : 30px 20px', 'margin : 20px 0','background : linear-gradient(#F3CD58, #FFE8F3)',
  'font-size : 25px','font-weight : bold','text-align : center','color : #ffffff'].join(';');
  console.log('%c This is Searchpage in this page, you can find all furnitures you want!', style);
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
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        </ThemeToggle>
        <Navbar />
        <BigCategoryNav></BigCategoryNav>
        <SmallCategoryBox></SmallCategoryBox>
        <SortComponentRow></SortComponentRow>
        <ItemsLayout></ItemsLayout>
      </div>
      <Footer />
    </FilterContextProvider>
  );
}

export default SearchPage;
