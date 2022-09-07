import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import logo from './Logo.png';
import styles from './Navbar.module.css';

function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <img className={styles.navbar_logo} src={logo} alt="" />
      <div className={styles.navbar_search}>
        <input className={styles.navbar_searchInput} type="text" />
        <SearchIcon className={styles.navbar_searchIcon} />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">Sign In</a>
          </li>
          <li>
            <a href="/">Sign Up</a>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;