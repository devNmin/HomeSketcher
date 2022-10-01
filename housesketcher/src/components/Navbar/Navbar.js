import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

import logo from '../../assets/Logo.png';
import styles from './Navbar.module.css';
import AuthContext from '../../context/AuthContext';
import Navbutton from './Navbutton';
// import { padding } from '@mui/system';

function Navbar(props) {
  let { user } = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <Link to="/loginmain">
        <img className={styles.navbar_logo} src={logo} alt="" />
      </Link>
      {user && (
        <div className={styles.navbar_search}>
          {/* <input className={styles.navbar_searchInput} type="text" />
        <SearchIcon className={styles.navbar_searchIcon} fontSize="large" />  */}
          <a href="/searchpage">
            <p>Search</p>
          </a>
          <a href="/modeling">
            <p>3DInterior</p>
          </a>
          <a href="/ai">
            <p>Style AI(beta)</p>
          </a>
        </div>
      )}

      <nav className={styles.nav}>
        <ul>
          {user ? (
            <li>
              <Navbutton />
              {/* <button><b>Hello, {user.user_nickname}</b></button> */}
              {/* <button onClick={logoutUser}>Logout</button> */}
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
