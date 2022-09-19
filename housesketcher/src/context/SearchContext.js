import { createContext, useState, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const FilterContext = createContext({
  filters: [],
  subCategorys: [],
  furnitureList: [],
  main: '',
  page: 0,
  sub: null,
  minPrice: null,
  maxPrice: null,
  width: null,
  length: null,
  height: null,
  addFilter: (filterName) => {},
  removeFilter: (filterName) => {},
  changePage: (pageNum) => {},
  changeMain: (categoryName) => {},
  changeSub: (categoryName) => {},
  changePrice: (price) => {},
  changeSize: (size) => {},

  getSubCategoryList: (categoryName) => {},
  getFurnitureList: () => {},
});

export function FilterContextProvider(props) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [furnitureList, setFurnitureList] = useState([]);

  const [page, setPage] = useState(0);
  const [main, setMain] = useState('Shelves'); // 대분류
  const [sub, setSub] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);

  let { BASE_URL } = useContext(AuthContext);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );

  const addFilterHandler = (filterName) => {
    setSelectedFilters((prevList) => [...prevList, filterName]);
  };

  function removeFilterHandler(filterName) {
    setSelectedFilters((prevSelectedFilters) => {
      return prevSelectedFilters.filter(
        (categoryFilter) => categoryFilter !== filterName
      );
    });
  }

  function IsSelectedFilterHandler(filterName) {
    return selectedFilters.some(
      (categoryFilter) => categoryFilter === filterName
    );
  }

  const setPageHandler = (pageNum) => {
    setPage(pageNum);
  };

  const setMainHandler = (categoryName) => {
    setMain(categoryName);
  };
  // state 최신값을 사용하기 위해서는 useeffect 실행 조건에 main값을 넣어줘야함

  const setSubHandler = (categoryName) => {
    setSub(categoryName);
  };

  const setPriceHandler = (price) => {
    let minp = price.minp;
    let maxp = price.maxp;
    setMinPrice(minp);
    setMaxPrice(maxp);
  };

  const setSizeHandler = (size) => {
    console.log('여기', size);
    let width = size.width;
    let length = size.length;
    let height = size.height;
    if (width === 0) {
      width = null;
    }
    if (length === 0) {
      length = null;
    }
    if (height === 0) {
      height = null;
    }
    setWidth(width);
    setLength(length);
    setHeight(height);
  };

  const SubCategoryListHandler = async (categoryName) => {
    await axios
      .get(BASE_URL + `furnitures/filter/main/${categoryName}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        if (response.data.subCategories.length > 0) {
          setSubCategoryList(response.data.subCategories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const furnitureListHandler = async () => {
    // 선택된 필터에 있는 것들 아니면 초기화 해야함
    const data = {
      page: page,
      main: main,
      sub: sub,
      minPrice: minPrice,
      maxPrice: maxPrice,
      width: width,
      length: length,
      height: height,
      style: null,
    };
    console.log('furniture', data);
    await axios({
      method: 'post',
      url: BASE_URL + 'furnitures/search/',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
      data: data,
    })
      .then((response) => {
        setFurnitureList(response.data.furnitures);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const context = {
    filters: selectedFilters,
    subCategoryList: subCategoryList,
    furnitureList: furnitureList,
    main: main,
    page: page,
    sub: sub,
    minPrice: minPrice,
    maxPrice: maxPrice,
    width: width,
    length: length,
    height: height,
    addFilter: addFilterHandler,
    removeFilter: removeFilterHandler,
    isSelectedFilter: IsSelectedFilterHandler,
    changePage: setPageHandler,
    changeMain: setMainHandler,
    changeSub: setSubHandler,
    changePrice: setPriceHandler,
    changeSize: setSizeHandler,
    getSubCategoryList: SubCategoryListHandler,
    getFurnitureList: furnitureListHandler,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
