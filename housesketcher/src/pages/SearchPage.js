import BigCategoryNav from '../components/SearchPage/BigCategoryNav';
import SmallCategoryBox from '../components/SearchPage/SmallCategoryBox';
import ItemsLayout from '../components/SearchPage/ItemsLayout';
import Navbar from '../components/Navbar/Navbar';
import { FilterContextProvider } from '../context/SearchContext';
function SearchPage() {
  return (
    <FilterContextProvider>
      <Navbar />
      <BigCategoryNav></BigCategoryNav>
      <SmallCategoryBox></SmallCategoryBox>
      <ItemsLayout></ItemsLayout>
    </FilterContextProvider>
  );
}

export default SearchPage;
