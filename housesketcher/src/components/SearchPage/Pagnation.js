import { useState, useEffect, useContext } from 'react';
import classes from './Pagnation.module.css';
import searchContext from '../../context/SearchContext';

function Pagnation() {
  const searchCtx = useContext(searchContext);
  const [pageNum, setPageNum] = useState(0);
  let items = searchCtx.totalPage;
  let pages = [];

  if (pageNum - 2 < 0) {
    pages = [pageNum, pageNum + 1, pageNum + 2, pageNum + 3, pageNum + 4];
  } else if (pageNum - 1 < 0) {
    pages = [pageNum - 1, pageNum, pageNum + 1, pageNum + 2, pageNum + 3];
  } else {
    pages = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2];
  }
  for (let val of pages) {
    if (val > items.length - 1) {
      pages = pages.filter((element) => element !== val);
    }
  }

  // if (pageNum + 1 > items.length - 2) {
  //   const idx = pages.indexOf(pageNum + 1);
  //   if (idx > 0) {
  //     pages = pages.slice(0, idx)
  //   } else if (pageNum + 2 > items)

  // items에는 pageNum -2 -1, pageNum, pageNum + 1 + 2의 값이 들어가야함
  // items -2가 0 이상이 아니면 pageNum +3 +4 추가
  // items의 마지막 값은 총 데이터수 // 20 까지(0부터 시작이니까)
  // 총 데이터 수 % 20 === 0 이면 총 {(데이터수 //20) -1}

  useEffect(() => {
    items = searchCtx.totalPage;
    if (pageNum - 2 < 0) {
      pages = [pageNum, pageNum + 1, pageNum + 2, pageNum + 3, pageNum + 4];
    } else if (pageNum - 1 < 0) {
      pages = [pageNum - 1, pageNum, pageNum + 1, pageNum + 2, pageNum + 3];
    }

    pages = pages.filter((element) => element < items.length);

    searchCtx.changePage(pageNum);
    searchCtx.getFurnitureList();
  }, [pageNum, items, searchCtx.page]);

  return (
    <div className={classes.pagenation_contatiner}>
      <div className={classes.page_num}>
        <p>&lt;</p>
      </div>
      {pages.map((pageNum) => {
        return (
          <div className={classes.page_num} key={pageNum}>
            <p
              onClick={() => {
                setPageNum(pageNum);
              }}
            >
              {pageNum + 1}
            </p>
          </div>
        );
      })}
      <div className={classes.page_num}>
        <p>&gt;</p>
      </div>
    </div>
  );
}

export default Pagnation;
