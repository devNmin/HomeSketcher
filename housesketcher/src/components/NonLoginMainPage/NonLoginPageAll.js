// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar/Navbar';
import styles from './NonLoginPageAll.module.css';
import MainCard from './MainCard';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


function NonLoginPageAll(props) {
  return (
    <>
      {/* <Navbar /> */}
      <section className={styles.header_section}>
        <div className={styles.row}>
          <div>
            <div className={styles.title}>
              <h1 className={styles.title_h1}>
                Sketch
              </h1>
              <h1 className={styles.title_h1_2}>
                Your Dream
              </h1>
              <h2 className={styles.title_h2}>Changing your space changes your life</h2>
                <Link to= '/login'>
                  <button type="button">                 
                    Sign In
                  </button>               
                </Link>             
            </div>
          </div>
        </div>
      </section>
      <MainCard />
      <Footer />
    </>
  );
}

export default NonLoginPageAll;
