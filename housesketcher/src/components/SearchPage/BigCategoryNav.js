import { useState, useEffect, useContext } from 'react';

import classes from './BigCategoryNav.module.css';
import SearchContext from '../../context/SearchContext';

const BigCategoryList = [
  'Shelves',
  'Sofas',
  'Media',
  'Tables',
  'Beds',
  'Chairs',
  'Closets',
  'Lamps',
  'Kids',
];
// BigCategoty 선택 ===>>>> api 요청 보냄 ===>>>> 소분류 카테고리 목록 SmallCategoryBox에! 뿌려줌(redux or reactContext)
// 아무것도 선택하지 않았을 떄 기본 : Sofas
function BigCategoryNav() {
  const [isLoading, setIsLoding] = useState(true);
  const [bigCategory, setBigCategory] = useState('Shelves');
  const filterCtx = useContext(SearchContext);

  useEffect(() => {
    const changeMainAndSub = async () => {
      setIsLoding(true);
      await filterCtx.changeMain(bigCategory);
      await filterCtx.getSubCategoryList(bigCategory);
      await filterCtx.getFurnitureList();

      if (filterCtx.furnitureList.length > 0) {
        setIsLoding(false);
      }
    };
    changeMainAndSub();
  }, [bigCategory, filterCtx.main]);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  return (
    <header className={classes.header}>
      <ul>
        {BigCategoryList.map((categoryName) => {
          return (
            <li
              key={categoryName}
              onClick={() => {
                setBigCategory(categoryName);
              }}
              className={
                categoryName === bigCategory
                  ? classes.selected
                  : classes.unselected
              }
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </header>
  );
}
export default BigCategoryNav;
