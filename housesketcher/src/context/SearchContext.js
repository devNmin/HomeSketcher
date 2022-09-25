import { createContext, useState, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from '../utils/axios';

const FilterContext = createContext({
  isLoading: false,
  filters: [],
  subCategorys: [],
  furnitureList: [],
  totalPage: [],
  main: '',
  page: 0,
  sub: null,
  minPrice: null,
  maxPrice: null,
  width: null,
  length: null,
  height: null,
  byLike: null,
  byPrice: null,

  addFilter: (filterName) => {},
  removeFilter: (filterName) => {},
  isSelectedFilter: (filterName) => {},
  changePage: (pageNum) => {},
  changeMain: (categoryName) => {},
  changeSub: (categoryName) => {},
  changePrice: (price) => {},
  changeSize: (size) => {},
  changeStyle: (size) => {},
  changeSort: (sortName, direction) => {},

  getSubCategoryList: (categoryName) => {},
  getFurnitureList: () => {},
  getLikedFurnutyreList: () => {},
});

export function FilterContextProvider(props) {
  const [isLoading, setIsLoding] = useState([false]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [furnitureList, setFurnitureList] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState([]);

  const [main, setMain] = useState('Shelves'); // 대분류
  const [sub, setSub] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [style, setStyle] = useState(null);
  const [byPrice, setByPrice] = useState(null);
  const [byLike, setByLike] = useState(null);

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
    return selectedFilters.some((categoryFilter) => categoryFilter === filterName);
  }

  const setPageHandler = (pageNum) => {
    setPage(pageNum);
  };

  const setMainHandler = (categoryName) => {
    setMain(categoryName);
    setSub(null);
    setPage(0);
    setSelectedFilters([]);
  };
  // state 최신값을 사용하기 위해서는 useeffect 실행 조건에 main값을 넣어줘야함

  const setSubHandler = async (categoryName) => {
    setSub(categoryName);
  };

  const setPriceHandler = (price) => {
    setMinPrice(price.minp);
    setMaxPrice(price.maxp);
  };

  const setSizeHandler = (size) => {
    let width = size.width;
    let length = size.length;
    let height = size.height;
    if (width === '') {
      width = null;
    }
    if (length === '') {
      length = null;
    }
    if (height === '') {
      height = null;
    }
    setWidth(width);
    setLength(length);
    setHeight(height);
  };

  const setStyleHandler = (styleName) => {
    setStyle(styleName);
  };

  const setSortHandler = (sortName, direction) => {
    if (sortName === 'byPrice') {
      setByPrice(direction);
    } else if (sortName === 'byLike') {
      setByLike(direction);
    }
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
    const data = {
      page: page,
      main: main,
      sub: sub,
      minPrice: minPrice,
      maxPrice: maxPrice,
      width: width,
      length: length,
      height: height,
      style: style,
      byPrice: byPrice,
      byLike: byLike,
    };

    if (!IsSelectedFilterHandler('Size')) {
      data.width = null;
      data.length = null;
      data.height = null;
    }
    if (!IsSelectedFilterHandler('Price')) {
      data.minPrice = null;
      data.maxPrice = null;
    }
    if (!IsSelectedFilterHandler('Style')) {
      data.style = null;
    }

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
        let totalP = parseInt(response.data.count / 20);
        if (response.data.count % 20 === 0) {
          totalP = totalP - 1;
        }
        let pages = [];
        for (let i = 0; i <= totalP; i++) {
          pages.push(i);
        }
        setTotalPage(pages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likedFurnitureHandler = async () => {
    await axios({
      method: 'get',
      url: BASE_URL + 'furnitures/like/',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    })
      .then((response) => {
        setFurnitureList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const context = {
    isLoading: isLoading,
    filters: selectedFilters,
    subCategoryList: subCategoryList,
    furnitureList: furnitureList,
    totalPage: totalPage,
    main: main,
    page: page,
    sub: sub,
    minPrice: minPrice,
    maxPrice: maxPrice,
    width: width,
    length: length,
    height: height,
    byLike: byLike,
    byPrice: byPrice,

    addFilter: addFilterHandler,
    removeFilter: removeFilterHandler,
    isSelectedFilter: IsSelectedFilterHandler,
    changePage: setPageHandler,
    changeMain: setMainHandler,
    changeSub: setSubHandler,
    changePrice: setPriceHandler,
    changeSize: setSizeHandler,
    changeStyle: setStyleHandler,
    changeSort: setSortHandler,
    getSubCategoryList: SubCategoryListHandler,
    getFurnitureList: furnitureListHandler,
    getLikedFurnutyreList: likedFurnitureHandler,
  };

  return (
    <FilterContext.Provider value={context}>{props.children}</FilterContext.Provider>
  );
}

export default FilterContext;
