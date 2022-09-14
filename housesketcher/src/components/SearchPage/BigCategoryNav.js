import { useState, useEffect } from 'react';

import classes from './BigCategoryNav.module.css';

const BigCategoryList = [
  'Sofas',
  'Beds',
  'Tables',
  'Chairs',
  'Media',
  'Shelves',
  'Closets',
  'Kids',
  'Storage',
  'Lamps',
];
// BigCategoty 선택 ===>>>> api 요청 보냄 ===>>>> 소분류 카테고리 목록 SmallCategoryBox에! 뿌려줌(redux or reactContext)
// 아무것도 선택하지 않았을 떄 기본 : Sofas
function BigCategoryNav() {
  const [bigCategory, setBigCategory] = useState('Sofas');
  useEffect(() => {
    console.log('여기', bigCategory);
  }, [bigCategory]);

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
