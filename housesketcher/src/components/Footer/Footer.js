import React from 'react';
import styles from './Footer.module.css'
import logo from '../../assets/Logo.png'

const Footer = () => {
  // function onClickMusinsa() {
  //   window.open('https://www.ikea.com/us/en//', '_blank')
  // }
  return (
    <div className={styles.company}>
      <div className={styles.wrapper_company}>
        <div className={styles.logoCompany}>
          <img src={logo} alt="LD" title="LD Entertainment" />
          <div className={styles.textCompany}>
            <span>
              본 서비스는 IKEA의 제품 정보를 제공하고 있습니다.
            </span>
            <span>
              COPYRIGHT (C) IKEA ALL RIGHTS RESERVED.
            </span>
            <span>salix0228@gamil.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;