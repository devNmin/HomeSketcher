import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

import logo from '../../assets/Logo.png';
import styles from './Navbar.module.css';

function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <img className={styles.navbar_logo} src={logo} alt="" />
      <div className={styles.navbar_search}>
        <input className={styles.navbar_searchInput} type="text" />
        <SearchIcon className={styles.navbar_searchIcon} fontSize="large" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to = '/login'>Sign In</Link>
          </li>
          <li>
            <Link to ="/register">Sign Up</Link>
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