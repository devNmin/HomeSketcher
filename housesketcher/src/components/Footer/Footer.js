import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
  function onClickMusinsa () {
    window.open('https://www.ikea.com/us/en//', '_blank')
  }
  return (
    <footer className={styles.Footer}>
      <div className={styles.left}>
        <p className={styles.bold}>Contact Us</p>
        <p>&ensp;salix0228@gamil.com<br/>&ensp;대전 삼성화재 유성연수원</p>
        <p className={styles.gray}>COPYRIGHT (C) IKEA ALL RIGHTS RESERVED.</p>
        <p className={styles.gray}>&ensp;본 서비스는 IKEA<span onClick={onClickMusinsa}>(www.ikea.com/us/en/)</span>의 제품 정보를 제공하고 있습니다.</p>
      </div>
    </footer>
  );
};

export default Footer;