import React, {useContext} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

import logo from '../../assets/Logo.png';
import styles from './Navbar.module.css';
import AuthContext from '../../context/AuthContext';

function Navbar(props) {
  let { user , logoutUser } = useContext(AuthContext)
  return (
    <div className={styles.navbar}>
      <img className={styles.navbar_logo} src={logo} alt="" />
      <div className={styles.navbar_search}>
        <input className={styles.navbar_searchInput} type="text" />
        <SearchIcon className={styles.navbar_searchIcon} fontSize="large" />
      </div>
      <nav className={styles.nav}>
        <ul>          
          
          {user ? (           
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          ): (
          <li>
            <Link to = '/login'><button>
                  Sign In
            </button>
              </Link>
          </li>
          )}        
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
