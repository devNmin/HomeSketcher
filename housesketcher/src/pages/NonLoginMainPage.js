import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './NonLoginMainPage.module.css'
import MainCard from '../components/NonLoginMainPage/MainCard';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';


// import image1 from '../assets/image1.png'

function NonLoginMainPage(props) {
  return (
    <>
      <Navbar />
      <section className={styles.header_section}>
        <div className={styles.row}>
          <div>
            <div className={styles.title}>
              <h1 className={styles.title_h1}>
                Sketch
                <br /> Your Dream
              </h1>
              <h2 className={styles.title_h2}>select your furniture</h2>
                <Link to= '/login'>
                  <button type="button">                 
                    Sign In
                  </button>               
                </Link>               
                <Link to = '/register'>
                  <button type="button">                 
                      Sign Up
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

export default NonLoginMainPage;