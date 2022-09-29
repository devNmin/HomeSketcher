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

  useEffect(() => {
    items = searchCtx.totalPage;
    pages = pages.filter((element) => element < items.length);

    searchCtx.changePage(pageNum);
  }, [pageNum, searchCtx.page]);

  return (
    <div className={classes.pagenation_contatiner}>
      <div className={classes.page_num}>
        <p
          onClick={() => {
            setPageNum(0);
          }}
        >
          &lt;&lt;
        </p>
      </div>
      {pages.map((page) => {
        return (
          <div
            className={page === pageNum ? classes.now_page : classes.page_num}
            key={page}
            onClick={() => {
              setPageNum(page);
            }}
          >
            <p>{page + 1}</p>
          </div>
        );
      })}
      <div className={classes.page_num}>
        <p
          onClick={() => {
            setPageNum(items.length - 1);
          }}
        >
          &gt;&gt;
        </p>
      </div>
    </div>
  );
}

export default Pagnation;
