import React, { useEffect, useState } from 'react';
import NonLoginPageAll from '../components/NonLoginMainPage/NonLoginPageAll';
import LoadingImage from '../components/NonLoginMainPage/LoadingImage';
// import logo from '../assets/Logo.png'
import styles from './NonLoginMainPage.module.css'
// import loadingImage from '../assets/loadingPage.gif'


// import image1 from '../assets/image1.png'

function NonLoginMainPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [])
  return (
    <>
      {/* <Navbar /> */}
      {isLoading ? (
        <LoadingImage className={styles.logo} />
      ) : (
      <NonLoginPageAll />)}
    </>
  );
}

export default NonLoginMainPage;
