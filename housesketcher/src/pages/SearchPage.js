import BigCategoryNav from '../components/SearchPage/BigCategoryNav';
import SmallCategoryBox from '../components/SearchPage/SmallCategoryBox';
import ItemsLayout from '../components/SearchPage/ItemsLayout';
import Navbar from '../components/Navbar/Navbar';
function SearchPage() {
  return (
    <div>
      <Navbar />
      <BigCategoryNav></BigCategoryNav>
      <SmallCategoryBox></SmallCategoryBox>
      <ItemsLayout></ItemsLayout>
    </div>
  );
}

export default SearchPage;
